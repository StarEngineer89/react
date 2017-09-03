import React from 'react';

import './Button.scss'
import { i18n, LoadingSpinner } from './index.js'

export default class Button extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      text: ''
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.state.text !== nextState.text ||
        this.props.disabled !== nextProps.disabled ||
        this.props.buttonClicked !== nextProps.buttonClicked
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  onClick(){
    let {buttonClicked, onClick} = this.props
    if(buttonClicked){
      return
    }
    onClick();
  }

  updateText(){
    let { text } = this.state
    text += '.'
    if(text.length > 3){
      text = ''
    }
    this.setState({text})
  }

  render(){
    let {buttonClicked, children, disabled} = this.props
    let loader = buttonClicked ?  <LoadingSpinner white={true} small={true} /> : children;
    let className = this.props.className || "btn green";

    if(buttonClicked){
      className += ' loading'
      this.timer = setTimeout(
        () => this.updateText(),
        470
      )
    }

    return (
      <button className={className} onClick={this.onClick.bind(this)} disabled={disabled}
              tabIndex={0}
      >
        {loader}
      </button>
    )
  }
}

Button.propTypes = {
  buttonClicked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}
