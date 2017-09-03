import Request from 'superagent'
//import router from 'react-router'
import Spree from './Spree.jsx'

/**
 *  Generic request creator
 *
 *  @param  {Object} config Request configuration
 *  @return {Object}        Superagent request object
 */
const request = config => {
  let options = {
    type: '',
    path: '',
    callback: function(){},
    data: {},
    callOnError: false
  }
  let prop
  let endCallback

  if (config !== 'undefined') {
    for (prop in config) {
      options[prop] = config[prop]
    }
  }

  endCallback = (err, res) => {
    if (err && (typeof err.status === 'undefined' || err.status === 0)) {

    } else if (err && err.status === 401) {
      // router.push('/login')
    } else if (err && err.status === 404) {
      //router.push('/not-found')
    } else if (err && err.status === 403) {

    }

    if (err && options.callOnError)
      return options.callback(err, res)

    if (err && options.errorCallback)
      return options.errorCallback(err, res)

    if (!err)
      return options.callback(null, res)
  }

  if (options.type === 'get') {
    return Request[options.type](options.path)
      .withCredentials()
      .set('Accept', 'application/json')
      .set('X-Spree-Token', Spree.getSpreeToken())
      .set('X-Spree-Order-Token', Spree.getOrderToken())
      .end((err, res) => {
        endCallback(err, res)
      })
  }

  return Request[options.type](options.path)
    .withCredentials()
    .set('Accept', 'application/json')
    .set('X-Spree-Token', Spree.getSpreeToken())
    .set('X-Spree-Order-Token', Spree.getOrderToken())
    .send(options.data)
    .end((err, res) => {
      endCallback(err, res)
    })
}

export default request
