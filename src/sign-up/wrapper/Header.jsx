import React from 'react'
import { ImgAsset, i18n } from '../../common'
import './Header.scss'
import SignUpStore from '../stores/SignUpStore.js'
import SignUpActions from '../actions/SignUpActions.js'

export default class Header extends React.Component{
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

  storeChanged({isSignIn}) {
    this.setState({isSignIn})
  }

  render(){

    return (
      <div className="sign-up-header">
        <div className="container">
          <div>
            <a href="/">
              <ImgAsset src="/logo.svg" />
            </a>
          </div>
          <div className="menu">
            {this.renderLink()}
          </div>
        </div>
      </div>
    )
  }

  renderLink(){
    let {isSignIn} = this.state
    let text = isSignIn ? i18n.t('sign-up-header.sign-up') : i18n.t('sign-up-header.sign-in')

    let onClick = () => SignUpActions.showSignUp(!isSignIn)

    return (
      <a onClick={onClick}>{text}</a>
    )
  }
}
