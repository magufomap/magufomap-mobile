import axios from 'axios'

import Auth from './auth'
import POIMsResource from './poims'
import TagsResource from './tags'

import config from '../../config'

const client = axios.create({
  baseURL: config.API_SERVER_URL
})

client.defaults.headers.common['Content-Type'] = 'application/json'
client.defaults.headers.common['Accept'] = 'application/json'

const setAuthorization = token => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `JWT ${token}`
  } else {
    delete client.defaults.headers.common['Authorization']
  }
}

export default {
  setAuthorization: setAuthorization,
  auth: Auth(client),
  poims: POIMsResource(client),
  tags: TagsResource(client)
}
