import axios from 'axios';
import config from './config';

export default data => axios({
    method: 'post',
    url: `http://${location.hostname}:${config.serverPort}/zhe800/requestDiscountAd`,
    header: {'Content-Type': 'application/json'},
    data: data
});
