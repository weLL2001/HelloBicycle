import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import request from '../utils/request'

// createAsyncThunk创建一个异步的action，这个方法被触发的时候会有三个状态
// pending(进行中) fulfilled(成功) rejected(失败)

export const orderListData = createAsyncThunk(
    'order/orderListData',
    async () => {
      try {
        const { data } = await request('/order/detail')
        // 添加唯一key
        data.item_list.map(item => {
          item.key = item.id
          return item
        })
        return data // 此处的返回结果会在 .fulfilled中作为payload的值
      } catch (error) {
        throw new Error(error)
      }
    }
  )

  export const orderListFilter = createAsyncThunk('/order_filter', async () => {
    try {
      const { data } = await request('/order_filter')
      data.item_list.map(item => {
        item.key = item.id
        return item
      })
      return data // 此处的返回结果会在 .fulfilled中作为payload的值
    } catch (error) {
      throw new Error(error)
    }
  })
  
export const orderSlice = createSlice({
    name: 'order',
    initialState: {
      orderList: []
    },
    /* 
    在创建切片的时候(createSlice)，可以传入配置 extraReducers ，
    extraReducers 选项是一个接收名为 builder 的参数的函数， builder 对象提供了一些方法，让我们可以定义额外的 case reducer，这些 reducer 将响应在 slice 之外定义的 action。
    extraReducers 也是配置 reducer 的，reducers 配置的是同步的 reducer ，
    extraReducers 配置的是异步的
    */
    extraReducers: builder => {
      // builder.addCase() 链式调用
      // 成功状态
      builder.addCase(orderListData.fulfilled, (state, { payload }) => {
        state.orderList = payload
      })
      
      builder.addCase(orderListFilter.fulfilled, (state, { payload }) => {
        state.orderList = payload
      })
    }
  })
  

  export default orderSlice.reducer