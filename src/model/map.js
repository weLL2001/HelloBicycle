import * as url from './url'
import request from './request'

export const queryMap = () => {
    return request.get(`${url.queryMap}`)
}

export const bikeMap = (params) => {
    return request.post(`${url.bikeMap}`,params)
}