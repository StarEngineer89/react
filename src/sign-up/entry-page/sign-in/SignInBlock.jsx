import React from 'react'

import NextButton from './NextButton.jsx'
import {i18n} from '../../../common'
import {FormControl} from '../../../common/form'
import './SignInBlock.scss'
import SignUpActions from '../../actions/SignUpActions.js'

export default class SignInBlock extends React.Component{

  render(){
    let {model} = this.props
    let showSignUp = () => SignUpActions.showSignUp(false)
    let onChange = SignUpActions.updateFormValue
    let onNextClicked =  () => SignUpActions.signIn(model.signIn)
    let showForgot = () => SignUpActions.updateForgot(true)

    return (
      <div className="sign-in-block">
        <div className="head">
          {i18n.t('sign-in-block.head')}
        </div>
        <div className="change-action">
          {i18n.t('sign-in-block.link.before')} <a onClick={showSignUp}>{i18n.t('sign-in-block.link')}</a>
        </div>

        <form name="signIn" key="signIn">

          <FormControl model={model.signIn}
                       name="email"
                       placeholder={i18n.t('personal-information.placeholder.email')}
                       onChange={onChange}
          />

          <FormControl model={model.signIn}
                       type="password"
                       name="password"
                       placeholder={i18n.t('personal-information.placeholder.password')}
                       onChange={onChange}
          />

        </form>

        <div className="forgot">
          <a onClick={showForgot}>{i18n.t('sign-in-block.forgot.link')}</a>
        </div>

        <NextButton onClick={onNextClicked} model={model} className="btn purple">
          {i18n.t('sign-in-block.button')}
        </NextButton>
      </div>
    )
  }
}

SignInBlock.propTypes = {
  model: React.PropTypes.object
}
