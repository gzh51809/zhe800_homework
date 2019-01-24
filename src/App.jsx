import React, {
    Component
} from 'react';
import style from './App.scss';

import router from './router';

class App extends Component {
    render() {
        return (
            <div className={style.App}>
                {router}
            </div>
        );
    }
}

export default App;
