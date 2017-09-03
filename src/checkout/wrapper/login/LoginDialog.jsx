import React from 'react'

import './LoginDialog.scss'
import {FormControl, FormError} from '../../../common/form'
import { Button, i18n, Validation, RemoveIcon } from '../../../common'
import { checkoutSignIn } from '../../Actions'

export default class LoginDialog extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      model: {
        email: '',
        password: ''
      },
      submitDisabled: true,
      buttonClicked: false,
      err: ''
    }

  }

  doLogin(){
    this.setState({
      buttonClicked: true,
      err: ''
    })

    checkoutSignIn(
      this.state.model,
      this.props.loginCompleted,
      this.ajaxError.bind(this)
    )
  }

  ajaxError(err, res){
    this.setState({
      buttonClicked: false,
      err: res.body.error
    })
  }

  updateSubmitState(){
    var isValid = true
    isValid = isValid && Validation.checkModel(this.state.model)

    this.setState({
      submitDisabled: !isValid
    })
  }

  render(){
    const { hideLogin, showForgot } = this.props
    const { model, err, submitDisabled, buttonClicked } = this.state

    const updateModel = (event, name)=>{
      model[name] = event.target.value
      this.setState({
        model
      })
      setTimeout(()=>this.updateSubmitState(), 0)
    }

    const openForgotDialog = (event) => {
      event.preventDefault()
      showForgot()
    }

    const doLogin = this.doLogin.bind(this)

    return (
      <div className="sbb-dialog login-dialog">
        <div className="sbb-dialog-body">
          <RemoveIcon onClick={hideLogin} />
          <div className="title">{i18n.t('login-dialog.title')}</div>
          <form onSubmit={event => event.preventDefault()}>
            <FormControl model={model} name="email" placeholder={i18n.t('login-dialog.email')}
                         onChange={updateModel}
            />

            <FormControl model={model} name="password" placeholder={i18n.t('login-dialog.password')}
                         insideGroup={true}
                         onChange={updateModel}
                         onBlur={(event) => event}
                         type="password"
            />

            <div className="forgot">
              <a onClick={openForgotDialog}>{i18n.t('login-dialog.forgot')}</a>
            </div>

            <FormError text={err} />

            <Button onClick={doLogin} disabled={submitDisabled} buttonClicked={buttonClicked} className="btn purple">
              {i18n.t('login-dialog.submit.button')}
            </Button>
          </form>

        </div>

      </div>
    )
  }
}

LoginDialog.propTypes = {
  hideLogin: React.PropTypes.func,
  showForgot: React.PropTypes.func,
  loginCompleted: React.PropTypes.func
}
