import React from 'react'

import FormError from './FormError.jsx' 

import './RowControl.scss'
import Validation from '../utils/validation.jsx'

export default class RowControl extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  onChange(event, name){
    this.props.onChange(event, name)
    var obj = {}
    obj[name] = this.state[name] && !!this.getErrorText(name, event.target.value)
    this.setState(obj)
  }
  onBlur(event, name){
    var obj = {}
    obj[name] = !!this.getErrorText(name, event.target.value)
    this.setState(obj)
  }
  getErrorText(name, value){
    if(name){
      return Validation.checkField(name, value)
    }
    let {model} = this.props
    let form = {}
    this.props.children.forEach(item => {
      let name = item.props.name
      if(this.state[name]) {
        form[name] = model[name]
      }
    })

    return Validation.checkModelList(form)
  }
  render(){
    let children = this.props.children.map(element => {
      return React.cloneElement(element, {
        onChange: this.onChange.bind(this),
        onBlur: this.onBlur.bind(this),
        insideGroup: true
      })
    })
    return (
      <div className="row-control">
        
        <FormError text={this.getErrorText()} />

        <div className="row">
          {children}
        </div>
      </div>
    )
  }
}
