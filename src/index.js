import React from 'react'
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.css';
import { history, updatePermissions } from './libs';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Router history={history}>
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
    </Router>,
    document.getElementById('root')
);

