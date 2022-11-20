import * as url from './url'
import request from './request'

export const getOpenCity = () => {
    return request.get(`${url.getOpenCity}`)
}