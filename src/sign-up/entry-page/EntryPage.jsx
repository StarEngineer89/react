import React from 'react'

import SignUpBlock from './sign-up/SignUpBlock.jsx'
import SignInBlock from './sign-in/SignInBlock.jsx'
import ForgotBlock from './forgot/ForgotBlock.jsx'
import SecureBlock from './SecureBlock.jsx'
import './EntryPage.scss'
import SignUpStore from '../stores/SignUpStore.js'

export default class EntryPage extends React.Component{
  constructor(props){
    super(props)

    this.state = SignUpStore.getState()

    this.storeChanged = this.storeChanged.bind(this)
  }

  componentDidMount(){
    SignUpStore.listen(this.storeChanged)
  }

  componentWillUnmount(){
    SignUpStore.unlisten(this.storeChanged)
  }

  storeChanged(state) {
    this.setState(state)
  }

  render(){
    
    let model = this.state
    
    let RenderBlock = model.showForgot ? ForgotBlock : (model.isSignIn ? SignInBlock : SignUpBlock)

    return (
      <div className='container entry-page'>
        <SecureBlock />
        <RenderBlock model={model} />
      </div>
    )
  }
}
