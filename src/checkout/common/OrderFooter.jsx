import React from 'react'

import './OrderFooter.scss'
import {Button, ImgAsset} from '../../common'

export default class OrderFooter extends React.Component{

  render(){
    let {nextStep, prevStep, buttonText, backButtonText, buttonClicked, buttonDisabled} = this.props

    return (
      <div className="order-footer">
        <div className="left">
          <Button onClick={prevStep} className="btn white no-bg">
            {backButtonText}
          </Button>
        </div>
        <div className="right">
          <ImgAsset src="/ssl.png" />

          <Button onClick={nextStep} buttonClicked={buttonClicked} disabled={buttonDisabled} className="btn red">
            <ImgAsset src="/forward-red.svg" />
            {buttonText}
          </Button>
        </div>
      </div>
    )
  }
}

OrderFooter.propTypes = {
  buttonText: React.PropTypes.string.isRequired,
  backButtonText: React.PropTypes.string.isRequired,
  buttonClicked: React.PropTypes.bool.isRequired,
  buttonDisabled: React.PropTypes.bool,
  prevStep: React.PropTypes.func,
  nextStep: React.PropTypes.func
}
