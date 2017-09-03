import React from 'react'

export default class PaymentShadow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '.'
    }
  }
  updateText(){
    let text = this.state.text
    text += '.'
    if(text.length > 3){
      text = '.'
    }
    this.setState({ text })
  }
  render(){
    if(!this.props.when){
      return null
    }

    setTimeout(
      () => this.updateText(),
      420
    )

    return (
      <div className="payment-shadow">
        {`Loading${this.state.text}`}
      </div>
    )
  }
}
