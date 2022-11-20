import * as url from './url'
import request from './request'

export const getWeather = () => {
    return request.get(`${url.getWeather}`)
}

export const getMenu = () => {
    return request.get(`${url.getMenu}`)
}

export const getTable = () => {
    return request.get(`${url.getTable}`)
}

export const getHighTable = () => {
    return request.get(`${url.getHighTable}`)
}