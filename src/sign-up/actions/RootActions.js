import React from 'react'
import alt from '../alt.js'
import { browserHistory } from 'react-router'
import * as Requests from '../../common/utils/Requests.jsx'
import { i18n } from '../../common'

class RootActions {

  updateMobile(state) {
    return state
  }

  hideError(){
    return ''
  }

  hidePopup(){
    return ''
  }

  showPopup(url){
    return url
  }
}

export default alt.createActions(RootActions)
