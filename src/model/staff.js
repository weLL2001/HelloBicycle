import * as url from './url'
import request from './request'

//获取员工列表
export const getStaffList = () => {
    return request.get(`${url.getStaffList}`)
}

//获取所有员工状态
export const getStaffStatus = () => {
    return request.get(`${url.getStaffStatus}`)
}

//删除员工
export const deleteStaff = (params) => {
    return request.get(`${url.deleteStaff}`,params)
}

//添加员工
export const addStaff = (params) => {
    return request.post(`${url.addStaff}`,params)
}
