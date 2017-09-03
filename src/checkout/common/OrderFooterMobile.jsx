import React from 'react'

import './OrderFooterMobile.scss'
import {Button, ImgAsset} from '../../common'

export default class OrderFooterMobile extends React.Component{
  render(){
    let {nextStep, prevStep, buttonClicked, buttonText, backButtonText, buttonDisabled} = this.props
    
    return (
      <div className="order-footer-mobile">
        <Button onClick={nextStep} buttonClicked={buttonClicked} disabled={buttonDisabled} className="btn red">
          <ImgAsset src="/forward-red.svg" />
          {buttonText}
        </Button>

        <Button onClick={prevStep} className="btn white no-bg">
          {backButtonText}
        </Button>
      </div>
    )
  }
}
