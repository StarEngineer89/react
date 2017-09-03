import React from 'react'

import './PersonalInformationPage.scss'
import {DesktopHeader, MobileHeader, CheckoutItems, BackLine} from '../common'
import { i18n, StepComponent } from '../../common'
import { Section } from '../../common/section'
import SignInBlock from './SignInBlock.jsx'
import SignUpBlock from './SignUpBlock.jsx'
import NextButton from './NextButton.jsx'
import { orderSignIn, savePersonalInfo, getCountries } from '../Actions'
import BBPayItem from '../bb-pay/BBPayItem.jsx'

export default class PersonalInformationPage extends StepComponent {

  constructor(props){
    super(props)

    this.state = props.personalInfo || this.calculateState(props)

    this.state.buttonClicked = false

    if(!props.countries.length){
        getCountries(countries => props.updateState({ countries }))
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.user.loggedIn && !this.state.loggedIn){
      this.setState(this.calculateState(newProps))
    }
  }

  calculateState(props){
    let userData = props.userData
    let loggedIn = props.user.loggedIn

    return {
      loggedIn,
      isSignIn: false,
      signIn: {
        email: '',
        password: ''
      },
      signUp: userData.signUp,
      location: userData.location || null,
      locationText: loggedIn ? this.calculateString(userData.location).trim() : '',
      locationVerified: userData.locationVerified,
      shippingSame: true,
      shippingInfo: userData.shippingInfo,
      phone: userData.phone,
      subscription: false
    }
  }

  calculateString(shippingInfo){
    return shippingInfo.additional + ' ' + shippingInfo.house + ' ' + shippingInfo.street + ', ' + shippingInfo.city + ' ' +
       shippingInfo.postalCode + ', ' + shippingInfo.countryName
  }

  nextStep(){
    this.setState({ buttonClicked: true })

    let personalInfo = this.state

    if(personalInfo.isSignIn){

      orderSignIn(
        personalInfo,
        (data) => {
          this.setState({ buttonClicked: false })
          this.props.updateState(data)
        },
        (err, res) => {
          this.setState({ buttonClicked: false })
          this.props.ajaxError(err, res)
        }
      )

      return
    }
    savePersonalInfo(
      personalInfo,
      (serverData) => {
        this.props.updateState(serverData)
        this.saveAndGo(
          {
            personalInfo,
            paymentInfo: undefined
          },
          '/checkout/payment'
        )
      },
      (err, res) => {
        this.setState({ buttonClicked: false })
        this.props.ajaxError(err, res)
      }
    )
  }

  prevStep(){
    this.redirect('/checkout/plan')
  }

  renderHeader(){
    let data = {
      activeTab : 1,
      pageName: i18n.t('personal-information.title'),
      price: this.props.order.subtotal,
      user: this.props.user
    }
    return this.props.isMobile ? <MobileHeader {...data} /> : <DesktopHeader {...data} />
  }

  renderLeftColumn(){
    let { isMobile, external, order } = this.props
    if(isMobile){
      return null
    }
    if(external){
      return <BBPayItem order={order} />
    }
    return <CheckoutItems order={order} />
  }

  render(){

    let { isMobile, showForgotDialog, countries, user, showPopup} = this.props
    let state = this.state
    let className = 'content' + (isMobile ? ' mobile' : '')

    let RenderBlock = state.isSignIn ? SignInBlock : SignUpBlock
    let updateState = data => this.setState(data)

    return (
      <div>
        {this.renderHeader()}

        <div className={className}>
          {this.renderLeftColumn()}
          <div className="personal-information">

            <RenderBlock model={state}
                         updateState={updateState}
                         showForgotDialog={showForgotDialog}
                         showPopup={showPopup}
                         countries={countries}
                         user={user}
                         isMobile={isMobile}
            />

            <Section long={true}>
              {this.renderButton()}
            </Section>
          </div>
        </div>
        {isMobile ? null :
          <BackLine prevStep={this.prevStep.bind(this)}
                    buttonText={i18n.t('personal-information.back-button')}
          />
        }
      </div>
    )
  }
  renderButton() {
    let {isMobile} = this.props
    let state = this.state

    let buttonText = i18n.t('personal-information.button-mobile')
    if(!isMobile){
      buttonText = state.isSignIn ? i18n.t('personal-information.button-sign-in') :
        i18n.t('personal-information.button-sign-up')
    }

    return (
      <NextButton model={state} onClick={this.nextStep.bind(this)} className="btn red">
        {buttonText}
      </NextButton>
    )
  }
}

PersonalInformationPage.propTypes = {
  order: React.PropTypes.object,
  isMobile: React.PropTypes.bool,
  showForgotDialog: React.PropTypes.func,
  showPopup: React.PropTypes.func
}
