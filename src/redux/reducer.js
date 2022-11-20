import actions from './actions/index'
import { defaultState } from './defaultState'

let currentState = defaultState
let actionsFuncData = {}
let reducersFuncData = {}

export const reducer = (state, action) => {
    if (reducersFuncData[action.type]) {
        const data = reducersFuncData[action.type](state, action)
        currentState = data
        return currentState
    }
    currentState = state 
    return currentState  
}
export default reducer 

export const buildActions = (dispatch) => {
    Object.keys(actions).forEach((key) => {
        const filterActionsFunc = {}
        const actionsFunc = actions[key].actions
        const reducersFunc = actions[key].reducers
        const _dispatch = (result) => {
            if (typeof result === 'function') {
                const func = result(_dispatch, currentState)
                if (func && func.then) {
                    return func
                }
            } else if (result && result.then) {
                result.then((res) => {
                    if (typeof res === 'function') {
                        res(dispatch, currentState)
                    } else {
                        dispatch(res)
                    }
                })
            } else if (result && result.type) {
                dispatch(result)
            }
        }
        Object.keys(actionsFunc).forEach((fkey) => {
            filterActionsFunc[fkey] = (...args) => {
                const result = actionsFunc[fkey].apply(null, args)
                return _dispatch(result)
            }
        })
        actionsFuncData = { ...actionsFuncData, [key]: filterActionsFunc }
        reducersFuncData = { ...reducersFuncData, ...reducersFunc }
    })
    return actionsFuncData
}
