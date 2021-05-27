import axios from 'axios'

export function request(config){

  const instance = axios.create({
    baseURL: 'http://1.117.177.124:3000',
    timeout: 5000
  })

  return instance(config)
}
