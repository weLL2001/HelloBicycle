import * as url from './url'
import request from './request'

//订单列表
export const getOrderList = () => {
    return request.get(`${url.getOrderList}`)
}

//订单筛选
export const getOrderFilter = (params) => {
    return request.get(`${url.getOrderFilter}`,params)
}

//订单结束
export const OrderClose = (params) => {
    return request.get(`${url.OrderClose}`,params)
}

//订单信息
export const getOrderDetailById = (params) => {
    return request.get(`${url.getOrderDetailById}`,params)
}

//订单详情
export const getMoreDetail = (id) => {
    return request.get(`${url.getOrderList}/${id}`)
}