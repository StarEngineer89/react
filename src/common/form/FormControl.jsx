import React from 'react'

import FormError from './FormError.jsx'
import InputControl from './InputControl.jsx'
import './FormControl.scss'
import { ImgAsset, Validation } from '../../common'

export default class FormControl extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showError: false,
      showSuccess: false
    }
  }
  onChange(event){
    this.props.onChange(event, this.props.name)
    if(this.props.insideGroup){
      this.setState({
        showSuccess: false
      })
      return
    }
    this.setState({
      showError: this.state.showError && !!this.getErrorText(event.target.value),
      showSuccess: false
    })
  }
  onBlur(event){
    let isError = !!this.getErrorText();

    if(this.props.insideGroup){
      this.props.onBlur(event, this.props.name)
      this.setState({
        showSuccess: !isError
      })
      return
    }

    this.setState({
      showError: isError,
      showSuccess: !isError
    })
  }
  getErrorText(value){
    let {model, name} = this.props

    return Validation.checkField(name, value || model[name])
  }
  renderErrorText(){
    if(this.props.insideGroup){
      return
    }

    let text = this.state.showError ? this.getErrorText() : undefined

    return <FormError text={text} />
  }
  render(){
    let showSuccess = !this.getErrorText() && this.state.showSuccess
    let { className, ...other} = this.props
    className = "form-control " + (className ? className : '')

    return (
      <div className={className}>

        {this.renderErrorText()}

        <ImgAsset src="/correct.svg" when={showSuccess} />

        <InputControl {...other}
               onChange={this.onChange.bind(this)}
               onBlur={this.onBlur.bind(this)}
        />
      </div>
    )
  }
}

FormControl.propTypes = {
  model: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string
}

