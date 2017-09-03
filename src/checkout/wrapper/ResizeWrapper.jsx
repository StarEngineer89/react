import React from 'react'
import Helmet from 'react-helmet'

import * as Actions from '../Actions'
import CheckoutHeader from './CheckoutHeader.jsx'
import PageFooter from './PageFooter.jsx'
import LoginDialog from './login/LoginDialog.jsx'
import ForgotDialog from './login/ForgotDialog.jsx'
import { i18n, Spree, GlobalError, StaticPopup, LoadingSpinner } from '../../common'

export default class ResizeWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobile: false,
      loaded: false,
      orderNumber: Spree.getOrderNumber(),
      order: undefined,
      //brainTreeToken: '',
      //signIn: undefined,
      //checkoutPlan: undefined,
      //signUp: undefined,
      //signType: 'up',
      //currentPage: 'checkout',
      //selectedPlan: 1,
      link: '',
      error: '',
      countries: [],
      plans: [],
      showLogin: false,
      showForgot: false,
      user: {
        verified: false,
        loggedIn: false
      }
    }

    this.handleResize = this.handleResize.bind(this)

    this.loadAppData()
  }

  loadAppData(){
    if(!this.state.orderNumber) {
      return
    }

    Actions.getOrderDetails(
      !this.state.loaded,
      data => {
        this.setData(data)
        this.checkRemovedProducts()
      },
      this.ajaxError.bind(this)
    )
  }

  checkRemovedProducts() {
    let { removedProducts } = this.state

    if (!removedProducts || !removedProducts.length) return

    let target = removedProducts.length === 1 ? '_self' : '_blank'

    this.setState({ error:
      <div className="removed-products">
        <p>{i18n.t('error.removed-products')}</p>
        {removedProducts.map(product => <p><a href={product.link} target={target}>{product.name}</a></p>)}
      </div>
    })
  }

  setData(data){
    this.setState(data)

    if(!this.state.loaded){
      this.setState({
        loaded: true
      })

      Actions.getBrainTreeToken(
        brainTreeToken => this.setState({ brainTreeToken })
      )
    }
  }

  ajaxError(err, res){
    let errorText = ''
    if(err.status === 422 || err.status === 403){
      errorText = res.body.error
    } else {
      errorText = i18n.t('ajax.error')
    }
    this.setState({
      error: errorText
    })
  }

  handleResize() {
    if (window.innerWidth <= 850)
      this.setState({ isMobile: true })
    else
      this.setState({ isMobile: false })
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render(){
    if(!this.state.orderNumber){
      return <div>Error: No order number</div>
    }

    let children = null
    if(!this.state.loaded){
      children = <LoadingSpinner />
    } else if(this.props.children){
      let props = {
        updateState: (data)=>this.setState(data),
        ajaxError: this.ajaxError.bind(this),
        showPopup: this.showPopup.bind(this),
        showForgotDialog : ()=>{
          this.setState({
            showForgot: true
          })
        }
      }
      children = React.cloneElement(this.props.children, Object.assign(props, this.state))
    }

    if(this.props.location.pathname.indexOf('confirmation') > 0){
     return (
       <div>
         {children}
       </div>
     )
    }

    return (
      <div>
        <Helmet title='Meet Grover. We’re reinventing consumption. Checkout' />
        {this.renderHeader()}
        {children}
        {this.renderFooter()}
        {this.renderLogin()}
        {this.renderForgot()}
        {this.renderError()}
        {this.renderPopup()}
      </div>
    )
  }

  renderLogin(){
    if(!this.state.showLogin){
      return null
    }

    let params = {
      hideLogin : ()=>{
        this.setState({
          showLogin: false
        })
      },
      showForgot : ()=>{
        this.setState({
          showLogin: false,
          showForgot: true
        })
      },
      loginCompleted: (data)=>{
        this.setState({
          ...data,
          showLogin: false
        })
      }
    }

    return <LoginDialog {...params} />
  }

  renderForgot(){
    if(!this.state.showForgot){
      return null
    }

    let params = {
      hideForgot : ()=>{
        this.setState({
          showForgot: false
        })
      }
    }
    return <ForgotDialog {...params} />
  }

  renderHeader(){
    let showLogin = this.showLogin.bind(this)
    return <CheckoutHeader {...this.state} showLogin={showLogin} />
  }

  showLogin(){
    this.setState({
      showLogin: true
    })
  }

  showPopup(event){
    event.preventDefault()
    this.setState({ link: event.target.href })
  }

  renderFooter(){
    let showLogin = this.showLogin.bind(this)
    let showPopup = this.showPopup.bind(this)

    return <PageFooter {...this.state} showLogin={showLogin} showPopup={showPopup} />
  }

  renderError(){
    let { error } = this.state
    if(!error){
      return null
    }

    let onClose = () => this.setState({ error: '' })

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

    let closePopup = () => this.setState({ link: '' })

    return <StaticPopup link={link} closePopup={closePopup} />
  }
}
