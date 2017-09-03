import React from 'react'

import './ConfirmationPage.scss'
import {ImgAsset, i18n} from '../../common'

export default class ConfirmationPage extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      time: 10
    }
  }
  componentWillMount(){
    document.getElementById('app').className = 'empty'  
  }
  redirect(){
    location.href = this.props.externalBack
  }

  updateCountdown(){
    let time = this.state.time - 1;
    this.setState({time})
    if(time){
      setTimeout(this.updateCountdown.bind(this), 1000)
    } else {
      this.redirect()
    }
  }

  componentDidMount(){
    setTimeout(this.updateCountdown.bind(this), 1000)
  }
  render(){
    let {externalBack, externalName} = this.props

    let buttonText = i18n.t('external.button.next').replace(/\*\*\*/g, externalName)
    let message = {
      __html: i18n.t('external.message').replace(/\*\*\*/g, externalName)
    }
    let info = {
      __html: i18n.t('external.button.info').replace('***', this.state.time)
    }

    return (
      <div className="confirmation-page">
        <div className="white">

          <div className="head">
            <ImgAsset src="/success-circle.svg" dir="checkout" />
            {i18n.t('external.title')}
          </div>

          <div className="next-text" dangerouslySetInnerHTML={message}></div>

          <div className="store-button">
            <a href={externalBack}>{buttonText}</a>

            <div className="text" dangerouslySetInnerHTML={info}></div>
          </div>

        </div>
      </div>
    )
  }
}

ConfirmationPage.propTypes = {
  externalBack: React.PropTypes.string,
  externalLogo: React.PropTypes.string
}
