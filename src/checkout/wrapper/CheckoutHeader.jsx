import React from 'react'

import './CheckoutHeader.scss'
import { ImgAsset, i18n, Spree } from '../../common'

export default class CheckoutHeader extends React.Component {
  renderDesktop() {
    let logoClassList = this.props.external ? "logo external" : "logo"

    return (
      <div className="checkout-header">
        <div className={logoClassList}>
            {this.renderLogo()}
        </div>
        <div className="right-header">
          {this.renderUserBlock()}
          <div className="trust">
            <div className="contact-hours">
              <ImgAsset src="/phone.svg" dir="checkout" />
              {i18n.t('page-header.phone-label')} <strong>{i18n.t('page-header.phone-number')}</strong>
              <span className="times">{i18n.t('page-header.time')}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLogo() {
    let {external, externalBack, externalLogo} = this.props
    if (external) {
      return (
        <a href={externalBack} target="_blank">
          <img src={externalLogo}/>
        </a>
      )
    }
    return (
      <a href="/">
        <ImgAsset src="/logo.svg"/>
      </a>
    )
  }

  renderUserBlock() {
    const { user, showLogin } = this.props

    if(user.loggedIn){
      return (
        <div className="sign">
          {i18n.t('page-header.hello')} {user.name}
        </div>
      )
    }

    const openLoginDialog = (event) => {
      event.preventDefault()
      showLogin()
    }

    return (
      <div className="sign">
        -> <a onClick={openLoginDialog}>{i18n.t('page-header.sign-in')}</a>
      </div>
    )
  }


  renderMobile() {
    return (
      <div className="checkout-header center">
        <div className="logo">
          {this.renderLogo()}
        </div>
      </div>
    )
  }

  render() {
    return this.props.isMobile ? this.renderMobile() : this.renderDesktop()
  }
}

CheckoutHeader.propTypes = {
  isMobile: React.PropTypes.bool,
  user: React.PropTypes.object,
  showLogin: React.PropTypes.func,
  external: React.PropTypes.bool,
  externalBack: React.PropTypes.string
}
