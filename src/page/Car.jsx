import React, {
    Component
} from 'react';
import {connect} from "react-redux";

import {
    NewComer,
    SelectAll,
    CellItem,
    AttributePoper
} from '../component/car';

import {ToastEle} from "../component/global";

import {
    TabBarContainer,
    Header,
    ScrollContainer
} from "../component/public";


import {
    requestCarInfo,
    requestUpdateCarInfo,
    requestGoodAttribute,
    requestDeleteCarInfo
} from '../api';
import apiConfig from "../api/config";

class Car extends Component {
    constructor() {
        super();
        this.state = {
            isEdit: false,
            data: [],
            selectTitle: '',
            attribute: [],
            good: {}
        };

        this.renderCells = this.renderCells.bind(this);
    }

    componentWillMount() {
        requestCarInfo().then(
            data => {
                if (data.code === '2') {
                    this.props.history.push('/login');
                } else {
                    data.list.forEach(member => {
                        member.select = false;
                        member.fengmianSrc = `http://${location.hostname}:${apiConfig.serverPort}/zhe800/goodDetail/${member.goodId}/0.jpg`
                    });
                    this.setState({data: data.list});
                }
            }
        ).catch(error => ToastEle.showToast(error.message))
    }

    renderCells() {
        return this.state.data.map(json => (
            <CellItem key={json._id}
                      good={json}
                      edit={this.state.isEdit}
                      addAmount={() => {
                          let clone = JSON.parse(JSON.stringify(json));
                          clone.buyAmount = String(Number(clone.buyAmount) + 1);
                          requestUpdateCarInfo(clone).then(() => {
                              json.buyAmount = String(Number(json.buyAmount) + 1);
                              this.setState({data: [].concat(this.state.data)});
                          });
                      }}
                      minusAmount={() => {
                          let clone = JSON.parse(JSON.stringify(json));
                          if (clone.buyAmount === '1') return;
                          clone.buyAmount = String(Math.max(1, Number(clone.buyAmount) - 1));
                          requestUpdateCarInfo(clone).then(() => {
                              json.buyAmount = String(Math.max(1, Number(json.buyAmount) - 1));
                              this.setState({data: [].concat(this.state.data)});
                          });
                      }}
                      selectGood={() => {
                          json.select = !json.select;
                          this.setState({data: [].concat(this.state.data)});
                      }}
                      selectAttribute={() => {
                          requestGoodAttribute({goodId: json.goodId}).then(data => {
                              //数据选择处理
                              let selectList = json.attribute.split('|');
                              data.list.forEach(item => {
                                  item.select = selectList.includes(item._id);
                              });
                              let selectTitle = data.list.filter(item => item.select).map(item => item.attributeName).join('、');

                              this.setState({
                                  good: json,
                                  attribute: data.list,
                                  selectTitle: selectTitle
                              });
                              this.refs.poper.showPoper();
                          })
                      }}/>
        ));
    }

    render() {
        return (
            <TabBarContainer tabId={'car'}
                             tabs={this.props.tabs}
                             selectTab={(item) => this.props.history.push(item.id)}>
                <Header title={'购物车'}
                        rightConfig={[{title: this.state.isEdit ? '完成' : '编辑'}]}
                        clickHeaderButton={() => this.setState({
                            isEdit: !this.state.isEdit
                        })}/>
                <NewComer/>
                <div style={{flex: '1'}}>
                    <ScrollContainer needScrollToTop={true}>
                        {this.renderCells()}
                    </ScrollContainer>
                </div>
                <SelectAll edit={this.state.isEdit}
                           select={this.state.data.every(json => json.select) && this.state.data.length !== 0}
                           total={String(this.state.data.reduce((target, json) => {
                               if (json.select) {
                                   target += Number(json.price) * Number(json.buyAmount);
                               }
                               return target;
                           }, 0))}
                           discount={(() => {
                               let originPrice = this.state.data.reduce((target, json) => {
                                   json.select && (target += (Number(json.originPrice)) * Number(json.buyAmount));
                                   return target;
                               }, 0);
                               let discount = this.state.data.reduce((target, json) => {
                                   json.select && (target += (Number(json.originPrice) - Number(json.price)) * Number(json.buyAmount));
                                   return target;
                               }, 0);

                               let result = originPrice - discount;
                               if (result === 0) {
                                   return '不含运费、平台卷';
                               } else {
                                   return `${originPrice} - ${discount} = ¥${originPrice - discount}`;
                               }
                           })()}
                           selectAll={() => {
                               let isSelectAll = this.state.data.every(json => json.select);
                               this.state.data.forEach(json => json.select = !isSelectAll);
                               this.setState({data: [].concat(this.state.data)});
                           }}
                           delete={() => {
                               let list = this.state.data
                                   .filter(item => item.select)
                                   .map(item => ({_id: item._id}));
                               if (list.length !== 0) {
                                   requestDeleteCarInfo({list}).then(() => this.setState({
                                       data: this.state.data.filter(item => !item.select),
                                       isEdit: false
                                   }));
                               }
                           }}/>
                <AttributePoper ref={'poper'}
                                goodTitle={`已选择 ${this.state.selectTitle}`}
                                attribute={this.state.attribute}
                                good={this.state.good}
                                buyAmount={this.state.good.buyAmount}
                                addAmount={() => {
                                    let {good} = this.state;
                                    good.buyAmount = String(1 + Number(good.buyAmount));
                                    this.setState({good});
                                }}
                                minusAmount={() => {
                                    let {good} = this.state;
                                    good.buyAmount = String(Math.max(1, Number(good.buyAmount) - 1));
                                    this.setState({good});
                                }}
                                selectAttribute={item => {
                                    let attribute = this.state.attribute;
                                    attribute
                                        .filter(member => member.kindId === item.kindId)
                                        .forEach(item => item.select = false);

                                    attribute
                                        .filter(member => member._id === item._id)
                                        .forEach(item => item.select = true);

                                    let selectTitle = attribute
                                        .filter(item => item.select)
                                        .map(item => item.attributeName)
                                        .join('、');

                                    let good = this.state.good;

                                    good.attribute = attribute
                                        .filter(member => member.select)
                                        .sort((first, second) => first._id - second._id)
                                        .map(item => item._id)
                                        .join('|');

                                    good.attributeName = attribute
                                        .filter(member => member.select)
                                        .map(item => `${item.name}：${item.attributeName}`)
                                        .join(' ');

                                    this.setState({
                                        good, selectTitle, attribute
                                    });
                                }}
                                confirm={() => {
                                    let clone = JSON.parse(JSON.stringify(this.state.good));
                                    requestUpdateCarInfo(clone).then(() => {
                                        Object.assign(this.state.data.find(item => item._id === clone._id), clone);
                                        this.setState({data: [].concat(this.state.data)});
                                    });
                                }}/>
            </TabBarContainer>
        );
    }
}

Car = connect(state => state.car)(Car);

export default Car;
