import React from 'react'

import {NextButton as NextButtonCommon} from '../../common'

export default class NextButton extends NextButtonCommon{
  isDisabled(){
    return !this.props.model.selectedPlan
  }
}

NextButton.propTypes = {
  model: React.PropTypes.object
}
