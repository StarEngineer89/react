import React from 'react'

import './BackLine.scss'
import { Button, ImgAsset } from '../../common'

export default class BackLine extends React.Component {
  render (){
    let buttonText = this.props.buttonText || "Back"
    return (
      <div className="back-line">
        <Button onClick={this.props.prevStep} className="btn white no-bg">
          {buttonText}
        </Button>
      </div>
    )
  }
}
BackLine.propTypes = {
  buttonText: React.PropTypes.string,
  prevStep : React.PropTypes.func.isRequired
}
