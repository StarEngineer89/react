import React from 'react'

import './ForgotDialog.scss'

import {FormControl, FormError} from '../../../common/form'
import { Button, i18n, Validation, RemoveIcon } from '../../../common'
import {forgotPassword} from '../../Actions'

export default class ForgotDialog extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      email: '',
      err: '',
      buttonClicked: false,
      success: false
    }

  }
  doForgot(){
    this.setState({
      buttonClicked: true
    })

    forgotPassword(
      this.state.email,
      () => this.setState({ success: true }),
      (err, res) => this.setState({ err: res.body.error, buttonClicked: false })
    )
  }
  render(){
    let { hideForgot } = this.props
    let model = this.state
    let { err } = this.state

    let updateModel = (event) => {
      this.setState({
        email: event.target.value
      })
    }

    return (
      <div className="sbb-dialog forgot-dialog">
        <div className="sbb-dialog-body">
          <RemoveIcon onClick={hideForgot} />

          <div className="header">
            {i18n.t('forgot-dialog.title')}
          </div>

          <form onSubmit={event => event.preventDefault()}>
            <div className="note">
              {i18n.t('forgot-dialog.note')}
            </div>

            <FormControl model={model} name="email" placeholder={i18n.t('forgot-dialog.email')}
                         onChange={updateModel}
            />
            
            <FormError text={err} />

            {this.renderButton()}

          </form>
        </div>
      </div>
    )
  }

  renderButton(){
    if(!this.state.success){
      let submitDisabled = !Validation.checkFieldBool('email', this.state.email)
      let buttonClicked = this.state.buttonClicked

      return (
        <Button key="btn" onClick={this.doForgot.bind(this)} disabled={submitDisabled} buttonClicked={buttonClicked} className="btn purple">
          {i18n.t('forgot-dialog.submit.button')}
        </Button>
      )
    }

    return (
      <div className="success">
        {i18n.t('forgot-dialog.confirmation')}
      </div>
    )
  }
}

ForgotDialog.propTypes = {
  hideForgot: React.PropTypes.func
}
