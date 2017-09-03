import React from 'react'

import {i18n} from '../../../common'
import {FormControl} from '../../../common/form'

export default class SignInForm extends React.Component{
  render(){
    let {model, onChange} = this.props

    return (
      <form name="signIn" key="signIn">

        <FormControl model={model}
                     name="email"
                     placeholder={i18n.t('personal-information.placeholder.email')}
                     onChange={onChange}
        />

        <FormControl model={model}
                     type="password"
                     name="password"
                     placeholder={i18n.t('personal-information.placeholder.password')}
                     onChange={onChange}
        />

        {this.renderForgot()}

      </form>
    )
  }

  renderForgot(){
    let {showForgotDialog} = this.props
    if(!showForgotDialog){
      return null
    }

    let onClick = (event)=>{
      event.preventDefault()
      showForgotDialog()
    }

    return (
      <div className="forgot">
        <a onClick={onClick}>{i18n.t('personal-information.forgot')}</a>
      </div>
    )

  }
}
