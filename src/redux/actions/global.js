export const actions = {
    setCurrent(data){
        return {type:'setCurrent',preload:data}
    }
}

export const reducers = {
    setCurrent(state,action){
        return{
            ...state,
            current:action.preload
        }
    }
}