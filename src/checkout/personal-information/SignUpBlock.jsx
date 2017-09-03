import React from 'react'

import { i18n, Spree } from '../../common'
import { Section } from '../../common/section'
import PersonalBlock from './sign-up/PersonalBlock.jsx'
import LocationBlock from './sign-up/LocationBlock.jsx'
import ShippingBlock from './sign-up/ShippingBlock.jsx'
import PhoneBlock from './sign-up/PhoneBlock.jsx'

export default class SignUpBlock extends React.Component{

  updateFormValue(event, name){
    let isManual = !!event.formName
    let formName = isManual ? event.formName : event.target.form.name
    let model = Object.assign({}, this.props.model[formName])
    model[name] = isManual ? event.value: event.target.value

    let obj = {}
    obj[formName] = model
    this.props.updateState(obj)
  }

  renderHeader(){
    let { user, updateState } = this.props
    if(user.loggedIn){
      return (
        <div className="account-type">
          {i18n.t('personal-information.sign-up.logged-in')}
        </div>
      )
    }

    let showSignIn = (event)=>{
      event.preventDefault()
      updateState({ isSignIn: true })
    }

    return (
      <div className="account-type">
        {i18n.t('personal-information.sign-up.before')} &nbsp;
        <a onClick={showSignIn}>{i18n.t('personal-information.sign-up.link')}</a>
      </div>
    )
  }

  render(){
    let {countries, user, model, updateState, showPopup, isMobile} = this.props
    let userVerified = user.loggedIn && user.verified
    let lang = Spree.getShopName() === 'usa' ? 'usa' : i18n.t('pages.lang')

    let url = `/common/pages/terms-${lang}.html`
    let url2 = `/common/pages/privacy-${lang}.html`
    let updateSubscription = event => updateState({ subscription: event.target.checked })

    return (
      <div>
        <Section long={true}>
          {this.renderHeader()}
        </Section>

        <PersonalBlock onChange={this.updateFormValue.bind(this)} model={model.signUp}
                       userLoggedIn={user.loggedIn}
                       isMobile={isMobile}
        />

        <LocationBlock onChange={updateState} model={model}
                       userVerified={userVerified}
        />

        <ShippingBlock model={model}
                       userVerified={userVerified}
                       onChange={this.updateFormValue.bind(this)}
                       onChangeCheckbox={updateState}
                       countries={countries}
        />

        <PhoneBlock model={model.phone}
                    countries={countries}
                    onChange={this.updateFormValue.bind(this)}
        />

        <Section long={true}>
          <div className="terms">
            <div className="text">
              {i18n.t('personal-information.mandatory')}
            </div>
            <div className="text">
              {i18n.t('personal-information.correct-info')}
            </div>
            <div className="text">
              {i18n.t('personal-information.agree')}
              <a href={url} onClick={showPopup}>{i18n.t('personal-information.terms')}</a>
              {i18n.t('personal-information.agree2')}
              <a href={url2} onClick={showPopup}>{i18n.t('personal-information.privacy')}</a>
              {i18n.t('personal-information.agree3')}
            </div>
            <label className="text">
              <input type="checkbox" checked={model.subscription} onChange={updateSubscription} />
              {i18n.t('personal-information.subscription')}
            </label>
          </div>

        </Section>

      </div>
    )
  }
}

SignUpBlock.propTypes = {
  model: React.PropTypes.object,
  user: React.PropTypes.object,
  isMobile: React.PropTypes.bool,
  countries: React.PropTypes.array,
  updateState: React.PropTypes.func,
  showPopup: React.PropTypes.func
}
