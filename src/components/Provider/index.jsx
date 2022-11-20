import React,{createContext,useReducer,useRef}from 'react'
import {reducer,buildActions} from '../../redux/reducer'
import { defaultState } from '../../redux/defaultState'

//创建context,让所有收包裹的组件都能得到state，dispatch
export const Store = createContext(defaultState)


export default function Provider({context,children}) {
    const [state,dispatch] =  useReducer(reducer,defaultState)
    const actionsRef = useRef(buildActions(dispatch))
    return <Store.Provider value ={{ state,dispatch,actions:actionsRef.current,context }}>{children}</Store.Provider>
}
