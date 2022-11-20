import React from 'react';
import ReactDOM from 'react-dom/client';
import Admin from './Admin';
import 'antd/dist/antd.less'
import './load.less'
// import { persistor, store } from './store'
// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
            <Admin />
            </PersistGate>
        </Provider>
    </BrowserRouter>    
); */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Provider from './components/Provider'
import {BrowserRouter as Router } from 'react-router-dom'
ConfigProvider.config({
    theme: {
      primaryColor: '#25b864',
    },
  })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Provider context={undefined}>
                <Admin />
            </Provider>
        </Router>
    </ConfigProvider>
);