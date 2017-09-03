import React from 'react'
import strongPass from 'strong-pass'

import InputControl from './InputControl.jsx'
import FormControl from './FormControl.jsx'
import i18n from '../utils/localization'
import { ImgAsset } from '../../common'

export default class PasswordControl extends FormControl{
  constructor(props){
    super(props)

    this.state.focused = false
  }
  renderStrengthBlock(){
    let {model, name} = this.props
    let password = model[name]
    if(password.length < 2 || !this.state.focused){
      return null
    }
    let mark = strongPass(password)
    let className = "strength mark" + mark

    return (
      <div className={className}>
        <span className="line" />
        <span className="line" />
        <span className="line" />
        <div>
          {i18n.t('password-control.mark.' + mark)}
        </div>
      </div>
    )
  }
  renderImage(){
    let isOk = !this.getErrorText()
    if(this.state.focused || !isOk){
      return null
    }
    return <ImgAsset src="/correct.svg" />
  }
  render(){
    let onFocus = ()=>{
      this.setState({
        focused: true
      })
    }

    let onBlur = (event)=>{
      this.setState({
        focused: false
      })
      this.onBlur(event)
    }


    return (
      <div className="form-control">

        {this.renderErrorText()}

        {this.renderImage()}

        {this.renderStrengthBlock()}
        <InputControl {...this.props} type="password"
          onChange={this.onChange.bind(this)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    )
  }
}
