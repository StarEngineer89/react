import React from 'react'

import NextButton from './NextButton.jsx'
import {i18n} from '../../../common'
import {FormControl} from '../../../common/form'
import './ForgotBlock.scss'
import SignUpActions from '../../actions/SignUpActions.js'

export default class ForgotBlock extends React.Component{

  render(){
    let {model} = this.props
    let onChange = SignUpActions.updateFormValue
    let hideForgot = () => SignUpActions.updateForgot(false)

    return (
      <div className="forgot-block">
        <div className="head">
          {i18n.t('forgot-block.head')}
        </div>
        <div className="change-action">
          {i18n.t('forgot-block.link.before')} <a onClick={hideForgot}>{i18n.t('forgot-block.link')}</a>
        </div>

        <div className="info">
          {i18n.t('forgot-block.note')}
        </div>

        <form name="forgot" key="forgot">

          <FormControl model={model.forgot}
                       name="email"
                       placeholder={i18n.t('personal-information.placeholder.email')}
                       onChange={onChange}
          />

        </form>

        {this.renderButton()}
      </div>
    )
  }

  renderButton(){
    let {model} = this.props
    if(model.forgotSuccess){
      return <div className="success">{i18n.t('forgot-block.message')}</div>
    }

    let onNextClicked =  () => SignUpActions.forgot(model.forgot)

    return (
      <NextButton onClick={onNextClicked} model={model} className="btn purple">
        {i18n.t('forgot-block.button')}
      </NextButton>
    )
  }
}

ForgotBlock.propTypes = {
  model: React.PropTypes.object
}
