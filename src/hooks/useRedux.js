import { Store } from '../components/Provider'
import { useContext } from 'react'


export const useRedux = () => {
    const { state, actions, dispatch, context } = useContext(Store)
    return {
        state,
        actions,
        dispatch,
        context,
    }
}