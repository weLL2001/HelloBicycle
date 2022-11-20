import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import menuReducer from './menuSlice'
import orderReducer from './orderSlice'

// 配置
const persistConfig = {
    // localstorage中的key
    key: 'jdbike',
    // 存储位置
    storage
}
// 持久化reducer
const Reducer = persistReducer(persistConfig, menuReducer)

const store = configureStore({
    reducer:{
        menu: Reducer,
        order:orderReducer
    },
     // redux存储的时候，将数据序列化之后存储起来的，reduxjs/toolkit会默认检查是否序列化
     middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: false
        })
     
})
const persistor = persistStore(store)
export {persistor,store}

