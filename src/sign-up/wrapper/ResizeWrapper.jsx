import React from 'react'
import Helmet from 'react-helmet'

import Header from './Header.jsx'
import PageFooter from './PageFooter.jsx'
import { GlobalError, StaticPopup } from '../../common'
import RootStore from '../stores/RootStore'
import RootActions from '../actions/RootActions'

export default class ResizeWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = RootStore.getState()

    this.storeChanged = this.storeChanged.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  storeChanged(state) {
    this.setState(state)
  }

  handleResize() {
    RootActions.updateMobile(window.innerWidth <= 850)
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    RootStore.listen(this.storeChanged)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    RootStore.unlisten(this.storeChanged)
  }

  render(){
    return (
      <div>
        <Helmet title='Meet Grover. We’re reinventing consumption. Sign Up' />
        <Header />

        {this.props.children}

        <PageFooter />

        {this.renderError()}
        {this.renderPopup()}
      </div>
    )
  }

  renderError(){
    let { error } = this.state
    if(!error){
      return null
    }

    let onClose = () => RootActions.hideError('')

    return (
      <GlobalError onClose={onClose}>
        {error}
      </GlobalError>
    )
  }

  renderPopup(){
    let {link} = this.state
    if(!link){
      return null
    }

    let closePopup = () => RootActions.hidePopup()

    return <StaticPopup link={link} closePopup={closePopup} />
  }

}
