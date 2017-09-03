import React from 'react'

import { Validation, NextButton as NextButtonCommon } from '../../common'

export default class NextButton extends NextButtonCommon{

  isDisabled(){
    let { model } = this.props

    var isValid = true

    isValid = isValid && Validation.checkFieldBool('paymentType', model.paymentType)

    return !isValid
  }

}

NextButton.propTypes = {
  model: React.PropTypes.object
}

