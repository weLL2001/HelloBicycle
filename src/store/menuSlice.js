import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        current: '首页'
    },
    reducers: {
        setCurrent(state, action) {
            state.current = action.payload
        }
    }
})

export const { setCurrent } = menuSlice.actions
export default menuSlice.reducer