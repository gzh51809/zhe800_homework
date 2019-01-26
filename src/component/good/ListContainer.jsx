import React, {
    Component
} from 'react';
import style from './ListContainer.scss';

class ListContainer extends Component {
    render() {
        return (
            <div className={style.ListContainer}>
                {this.props.children}
            </div>
        )
    }
}

export default ListContainer;
