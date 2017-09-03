import React from 'react'

import './PhoneControl.scss'
import FormError from './FormError.jsx'
import FormSelect from './FormSelect.jsx'
import InputControl from './InputControl.jsx'
import Validation from '../utils/validation.jsx'
import { sendSmsToUser, resendSms, confirmSms } from '../utils/Actions'
import LoadingButton from '../LoadingButton.jsx'
import i18n from '../utils/localization'
import ImgAsset from '../ImgAsset.jsx'
import LoadingSpan from '../LoadingSpan.jsx'
import { Spree } from '../../common'

let codes = [
  { id: '+49', name: '0049', country: 'DE'},
  { id: '+44', name: '0044', country: 'GB'},
  { id: '+31', name: '0031', country: 'NL'},
  { id: '+43', name: '0043', country: 'AT'},
  { id: '+1', name: '001', country: 'US'},
]

export default class PhoneControl extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      verifyRequest: false,
      resendRequest: false,
      confirmRequest: false,
      showError: false,
      err: ''
    }
  }
  onCodeChange(event, name){
    let value = event.target.value
    this.props.onChange(event, name)

    this.setState({
      showError: this.state.showError && !!this.getErrorText(name, value)
    })

    if(value){
      setTimeout(() => {
        this.refs.number.querySelector('input').focus()
      }, 0)
    }
  }
  onNumberChange(event, name){
    let value = event.target.value
    this.props.onChange(event, name)

    this.setState({
      showError: this.state.showError && !!this.getErrorText(name, value)
    })
  }
  onBlur(event){
    if(event.relatedTarget){
      if(['phoneCode', 'phoneNumber'].indexOf(event.relatedTarget.name)){
        return
      }
    }
    this.setState({
      showError: !!this.getErrorText()
    })
  }
  verifyClicked(){
    if(this.state.verifyRequest){
      return
    }
    if(window.localStorage.getItem('fakeButton')){
      this.updateModel('phoneSms', true)
      setTimeout(
        () => this.updateModel('phoneVerified', true),
        0
      )

      return
    }
    this.setState({
      verifyRequest: true,
      showError: false,
      err: ''
    })

    let model = {
      ...this.props.model,
      orderNumber: Spree.getOrderNumber()
    }

    sendSmsToUser(model, this.verifyAnswer.bind(this), this.onAjaxError.bind(this))
  }
  onAjaxError(err, res){
    this.setState({
      err: res && res.body && res.body.error || i18n.t('ajax.error'),
      verifyRequest: false,
      resendRequest: false,
      confirmRequest: false,
      showError: true
    })
  }
  verifyAnswer(){
    this.setState({
      verifyRequest: false,
      showError: false,
      err: ''
    })
    this.updateModel('phoneSms', true)
  }
  updateModel(name, value){
    this.props.onChange(
      {
        value,
        formName: 'phone'
      },
      name
    )
  }
  resendSms(){
    this.setState({
      resendRequest: true,
      showError: false,
      err: ''
    })

    let model = {
      ...this.props.model,
      orderNumber: Spree.getOrderNumber()
    }

    resendSms(model, this.resendAnswer.bind(this), this.onAjaxError.bind(this))
  }
  resendAnswer(){
    this.setState({
      resendRequest: false,
      showError: false,
      err: ''
    })
  }
  confirmClicked(){
    if(this.state.confirmRequest || this.props.model.verificationCode.length < 4){
      return
    }
    this.setState({
      confirmRequest: true,
      showError: false,
      err: ''
    })

    let model = {
      ...this.props.model,
      orderNumber: Spree.getOrderNumber()
    }

    confirmSms(model, this.confirmAnswer.bind(this), this.onAjaxError.bind(this))
  }
  confirmAnswer(){
    this.setState({
      confirmRequest: false,
      showError: false,
      err: ''
    })
    this.updateModel('phoneVerified', true)
  }

  getErrorText(name, value){
    let {model} = this.props

    let values = {
      phoneCode: model.phoneCode,
      phoneNumber: model.phoneNumber
    }

    if(name) {
      values[name] = value
    }

    return Validation.checkModelList(values)
  }

  renderErrorText(){
    if(!this.state.showError){
      return
    }

    return this.state.err || this.getErrorText()
  }
  getItems(){
    let {countries, isUsa} = this.props
    if(!countries || !countries.length){
      return codes
    }

    if (isUsa) {
      let code = codes.filter(item => item.country === 'US')[0]
      let countryName = countries.filter(country => country.iso === code.country)[0].name

      return [{
        id: code.id,
        name: `${countryName} (${code.id})`
      }]
    }

    return codes.map(function (code) {
      let countryName = countries.filter(country => country.iso === code.country)[0].name
      return {
        id: code.id,
        name: `${countryName} (${code.id})`
      }
    })
  }
  renderBase(){
    let {verifyRequest} = this.state
    let {model} = this.props
    let showButton = !this.getErrorText()

    return (
      <div className="phone-control base">

        <FormError text={this.renderErrorText()} />

        <div className="base-line">
          <div className="code">
            <FormSelect model={model}
                        name="phoneCode"
                        prompt={i18n.t('phone-control.placeholder.code')}
                        onChange={this.onCodeChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        items={this.getItems()}
            />
          </div>
          <div className="number" ref="number">
            <InputControl model={model}
                         name="phoneNumber"
                         placeholder={i18n.t('phone-control.placeholder.number')}
                         onBlur={this.onBlur.bind(this)}
                         onChange={this.onNumberChange.bind(this)}
            />
            {!showButton ? null :
              <LoadingButton className="button" key="verify"
                              request={verifyRequest}
                              onClick={this.verifyClicked.bind(this)}
              >
                {i18n.t('phone-control.button.verify')}
              </LoadingButton>
            }
          </div>
        </div>
      </div>
    )
  }

  renderSms(){
    let { model } = this.props
    let { resendRequest} = this.state
    let onEditClicked = (event) => {
      event.preventDefault()
      this.updateModel('phoneSms', false)
    }

    let onResendClicked = (event) => {
      event.preventDefault()
      this.resendSms()
    }

    let confirmed = model.phoneVerified
    let showLinks = !resendRequest && !confirmed
    let className = "phone-control " + (confirmed ? "base" : "verify")

    return (
      <div className={className}>

        <FormError text={this.renderErrorText()} />

        <div className="full">
          <div className="text">
            {model.phoneCode + model.phoneNumber}
            {confirmed? null :
              <span className="loading">{i18n.t('phone-control.verifying')}</span>
            }
          </div>
          {!showLinks ? null :
            <div className="link">
              <a onClick={onEditClicked}>{i18n.t('phone-control.edit')}</a>
            </div>
          }
          {!showLinks ? null :
            <div className="link">
              <a onClick={onResendClicked}>{i18n.t('phone-control.resend')}</a>
            </div>
          }
          {!resendRequest ? null :
            <div className="link loading">
              <LoadingSpan />
            </div>
          }
          <ImgAsset src="/correct.svg" when={confirmed} />
        </div>

        {confirmed ? null : this.renderSecondLine()}
      </div>
    )
  }

  renderSecondLine(){
    let {model, onChange} = this.props
    let { confirmRequest} = this.state

    let updateCode = (event) => onChange(event, 'verificationCode')

    return (
      <div className="verification">
        <input className="input-control"
               value={model.verificationCode}
               placeholder={i18n.t('phone-control.placeholder.sms-code')}
               onChange={updateCode}
        />
        <LoadingButton className="button" key="submit"
                       request={confirmRequest}
                       onClick={this.confirmClicked.bind(this)}
        >
          {i18n.t('phone-control.button.submit')}
        </LoadingButton>
        <div className="note">
          {i18n.t('phone-control.note')}
        </div>
      </div>
    )
  }

  render(){
    let {model} = this.props

    if(!model.phoneSms){
      return this.renderBase()
    }

    return this.renderSms()
  }
}

PhoneControl.propTypes = {
  onChange: React.PropTypes.func,
  countries: React.PropTypes.array,
  model: React.PropTypes.object
}
