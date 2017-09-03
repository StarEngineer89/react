import React from 'react'

export default class LoadingSpan extends React.Component{
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
    let {text} = this.state

    this.timeout = setTimeout(this.updateText.bind(this), 200)

    return (
      <span className="loading-span">{text}</span>
    )
  }
}
