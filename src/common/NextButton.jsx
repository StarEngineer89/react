import React from 'react'

import { Button, ImgAsset } from './'
import FormError from './form/FormError.jsx'
import './NextButton.scss'

export default class NextButton extends React.Component{

  isDisabled(){
    return true
  }

  render(){
    let {children, model, ...other} = this.props
    let imgUrl = '/forward.svg';
    if(this.isDisabled()) {
      imgUrl = '/forward-disabled.svg';
    } else {
      if(this.props.hasOwnProperty('className')) {
        let className = this.props.className;
        if(className.indexOf('red') > -1) imgUrl = '/forward-red.svg';
        else if(className.indexOf('purple') > -1) imgUrl = '/forward-purple.svg';
      }
    }

    return (
      <div className="next-button">
        <FormError text={model.err} />
        <Button disabled={this.isDisabled()} buttonClicked={model.buttonClicked} {...other}>
          <ImgAsset src={imgUrl} />
          {children}
        </Button>
      </div>
    )
  }
}

NextButton.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  buttonClicked: React.PropTypes.bool,
  model: React.PropTypes.object
}

