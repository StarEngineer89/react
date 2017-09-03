import React from 'react'

import './SignUpBlock.scss'
import NextButton from './NextButton.jsx'
import PersonalForm from '../../personal-info/PersonalForm.jsx'
import {i18n, Spree} from '../../../common'
import SignUpActions from '../../actions/SignUpActions.js'
import RootActions from '../../actions/RootActions.js'

export default class SignUpBlock extends React.Component{

  render(){
    let {model} = this.props
    let showSignIn = () => SignUpActions.showSignUp(true)
    let onChange = SignUpActions.updateFormValue
    let onNextClicked = () => SignUpActions.redirect('/sign-up/personal-info')

    let lang = Spree.getShopName() === 'usa' ? 'usa' : i18n.t('pages.lang')
    let url1 = `/common/pages/terms-${lang}.html`
    let url2 = `/common/pages/privacy-${lang}.html`
    let showPopup = event => {
      event.preventDefault()
      RootActions.showPopup(event.target.href)
    }

    return (
      <div className="sign-up-block">
        <div className="head">
          {i18n.t('sign-up-block.head')}
        </div>
        <div className="change-action">
          {i18n.t('sign-up-block.link.before')} <a onClick={showSignIn}>{i18n.t('sign-up-block.link')}</a>
        </div>

        <form name="signUp" key="signUp">
          <PersonalForm model={model.signUp} onChange={onChange} />
        </form>

        <div className="message mandatory">
          {i18n.t('personal-information.mandatory')} &nbsp;
        </div>

        <div className="message">
          {i18n.t('sign-up-block.message.before1')}
          <a href={url1} onClick={showPopup}>{i18n.t('sign-up-block.message.link1')}</a>
          {i18n.t('sign-up-block.message.before2')}
          <a href={url2} onClick={showPopup}>{i18n.t('sign-up-block.message.link2')}</a>
          {i18n.t('sign-up-block.message.after2')}
        </div>

        <NextButton onClick={onNextClicked} model={model} className="btn purple">
          {i18n.t('sign-up-block.button')}
        </NextButton>
      </div>
    )
  }
}

SignUpBlock.propTypes = {
  model: React.PropTypes.object
}
