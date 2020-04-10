import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';

import App from './components/app/app';

import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
