import React from 'react'
import { Validation, NextButton as NextButtonCommon } from '../../common'

export default class NextButton extends NextButtonCommon{

  isDisabled(){
    let { model } = this.props

    if(model.isSignIn){
      return !Validation.checkModel(model.signIn)
    }

    let isValid = true
    isValid = isValid && Validation.checkModel(model.signUp)
    isValid = isValid && model.locationVerified
    // if(!model.shippingSame){
    //   isValid = isValid && Validation.checkModel(model.shippingInfo)
    // }
    isValid = isValid && model.phone.phoneVerified

    return !isValid
  }
}

NextButton.propTypes = {
  model: React.PropTypes.object
}
