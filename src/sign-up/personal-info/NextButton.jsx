import React from 'react'

import {NextButton as NextButtonCommon, Validation} from '../../common'

export default class NextButton extends NextButtonCommon{
  isDisabled(){
    let {model} = this.props

    let isValid = Validation.checkModel(model.signUp)
    isValid = isValid && model.locationVerified
    isValid = isValid && model.phone.phoneVerified

    return !isValid
  }
}

NextButton.propTypes = {
  model: React.PropTypes.object
}
