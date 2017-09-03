import React from 'react'

import { NextButton as NextButtonCommon, Validation } from '../../../common'

export default class NextButton extends NextButtonCommon{
  isDisabled(){
    let { model } = this.props

    return !Validation.checkModel(model.forgot)
  }
}

NextButton.propTypes = {
  model: React.PropTypes.object
}
