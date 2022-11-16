const DEVLELOPMENT  =  'https://www.fastmock.site/mock/2728fdedd7e9063e308598df4c68fe46/_api'
const PRODUCTION = 'https://www.xxx.com/api'

const BASE_URL =  process.env.NODE_ENV === 'development' ? DEVLELOPMENT : PRODUCTION

const TIMEOUT = 3000

export { BASE_URL, TIMEOUT }