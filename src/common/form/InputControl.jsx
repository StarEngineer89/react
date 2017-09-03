import React from 'react'

import './InputControl.scss'

export default class InputControl extends React.Component{
  constructor(props){
    super(props)
  }
  onChange(event){
    let {onChange, name} = this.props
    onChange(event, name)
  }
  render(){
    let {model, name, ...other, className } = this.props
    className = 'input-control ' + (className ? className : '')
    return (
      <input {...other}
        value={model[name]}
        className={className}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}
