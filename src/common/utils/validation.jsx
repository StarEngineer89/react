import React from 'react'
import i18n from './localization'

let defaultValidator = {
  check: function (value) {
    return (value || "").length > 0
  },
  message: 'validation.default'
}

let validators = {}

let validation = {
  setValidators(obj){
    validators = obj;
  },
  checkField(name, value){
    let result = this.checkFieldBool(name, value)
    if(result){
      return ''
    }

    let data = validators[name] || defaultValidator

    let message = typeof data.message === 'string' ? data.message : data.message(value)

    return i18n.t(message)
  },
  checkFieldBool(name, value){
    let data = validators[name] || defaultValidator
    if(typeof value === 'undefined' || value === null){
      console.warn(name)
    }

    return data.check(value)
  },
  checkModelList(model){
    let messages = Object.keys(model)
                         .map(key => this.checkField(key, model[key]))
                         .filter(message => message)
    return messages.length ? messages[0] : ''
  },
  checkModel(model){
    return Object.keys(model).every(key => this.checkFieldBool(key, model[key]))
  }
}

export default validation

