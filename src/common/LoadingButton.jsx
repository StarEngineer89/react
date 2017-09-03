import React from 'react'

export default class LoadingButton extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      text: ''
    }
  }
  updateText(){
    let newText = this.state.text + '.'
    if(newText.length > 5){
      newText = '.'
    }
    this.setState({
      text: newText
    })
  }
  componentWillUnmount(){
    clearTimeout(this.timeout)
  }
  render(){
    let {children, request, ...other } = this.props
    let {text} = this.state

    if(request){
      this.timeout = setTimeout(this.updateText.bind(this), 200)
    }

    return (
      <button {...other}>
        {request ? text : children}
      </button>
    )
  }
}
