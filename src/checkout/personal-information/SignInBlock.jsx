import React from 'react'

import { i18n } from '../../common'
import { Section } from '../../common/section'
import SignInForm from './sign-in/SignInForm.jsx'

export default class SignInBlock extends React.Component{
  updateFormValue(event, name){
    let isManual = !!event.formName
    let formName = isManual ? event.formName : event.target.form.name
    let model = Object.assign({}, this.props.model[formName])
    model[name] = isManual ? event.value: event.target.value

    let obj = {}
    obj[formName] = model
    this.props.updateState(obj)
  }

  render(){
    let {model, showForgotDialog, updateState} = this.props

    let showSignUp = (event) => {
      event.preventDefault()
      updateState({ isSignIn: false })
    }

    return (
      <Section className="long">
        <div className="account-type">
          {i18n.t('personal-information.sign-in.before')} &nbsp;
          <a onClick={showSignUp}>{i18n.t('personal-information.sign-in.link')}</a>
        </div>

        <SignInForm model={model.signIn}
                    onChange={this.updateFormValue.bind(this)}
                    showForgotDialog={showForgotDialog}
        />

      </Section>
    )
  }
}

SignInBlock.propTypes = {
  model: React.PropTypes.object,
  updateState: React.PropTypes.func
}
