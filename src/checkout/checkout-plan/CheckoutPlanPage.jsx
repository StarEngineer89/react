import React from 'react'

import {DesktopHeader, MobileHeader, CheckoutItems, BackLine} from '../common'
import CheckoutPlan from './CheckoutPlan.jsx'
import NextButton from './NextButton.jsx'
import {setSubscriptionPlan} from '../Actions'
import {i18n, StepComponent} from '../../common'
import BBPayItem from '../bb-pay/BBPayItem.jsx'

export default class CheckoutPlanPage extends StepComponent {

  constructor(props){
    super(props)

    this.state = props.checkoutPlan || {
        selectedPlan: ''
    }

    this.state.err = ''
    this.state.buttonClicked = false
  }

  nextStep(){
    this.setState({
      buttonClicked: true
    })

    let data = {
      checkoutPlan: this.state,
      paymentInfo: undefined,
      personalInfo: undefined
    }

    setSubscriptionPlan(
      this.state,
      (serverData) => {
        this.props.updateState(serverData)
        this.saveAndGo(data, '/checkout/personal-information')
      },
      (err, res) => {
        this.setState({ buttonClicked: false })
        this.props.ajaxError(err, res)
      }
    )
  }

  prevStep(){
    if(this.props.external){
      location.href = this.props.externalBack
      return;
    }
    this.redirect('/checkout')
  }

  changePlan(id){
    this.setState({
      selectedPlan: id
    })
  }
  renderHeader(){
    let data = {
      activeTab : 0,
      pageName: i18n.t('checkout-plan.title'),
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

    let { isMobile, plans, external } = this.props
    let model = this.state
    let className = 'content' + (isMobile ? ' mobile' : '')
    let buttonText = isMobile ? i18n.t('checkout-plan.button-mobile') : i18n.t('checkout-plan.button')
    
    let backButtonText = external ? i18n.t('checkout-plan.back-button-external') : i18n.t('checkout-plan.back-button')

    return (
      <div>
        {this.renderHeader()}
        <div className={className}>

          {this.renderLeftColumn()}

          <div className="checkout-plan">
            <CheckoutPlan plans={plans}
                          selectedPlan={this.state.selectedPlan}
                          changePlan={this.changePlan.bind(this)}
            />

            <NextButton onClick={this.nextStep.bind(this)} model={model} className="btn red">
              {buttonText}
            </NextButton>

          </div>
        </div>
        <BackLine prevStep={this.prevStep.bind(this)}
                  buttonText={backButtonText}
        />
      </div>
    )
  }
}

CheckoutPlanPage.propTypes = {
  order: React.PropTypes.object,
  user: React.PropTypes.object,
  plans: React.PropTypes.array,
  checkoutPlan: React.PropTypes.object,
  isMobile: React.PropTypes.bool
}
