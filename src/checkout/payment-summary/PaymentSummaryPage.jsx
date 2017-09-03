import React from 'react'

import CheckoutSummaryTable from '../checkout-summary/CheckoutSummaryTable.jsx'
import SummaryMobile from './SummaryMobile.jsx'
import {PageTitle, OrderFooter, OrderFooterMobile} from '../common'
import { ImgAsset, i18n, Button, StepComponent, Spree } from '../../common'
import { redirectToPaypal, payWithCard } from '../Actions'

import './PaymentSummaryPage.scss'

export default class PaymentSummaryPage extends StepComponent {
  constructor(props){
    super(props)

    this.state = {
      buttonClicked: false
    }
  }
  nextStep(){
    this.setState({ buttonClicked: true })

    let errCallback = (err, res) => {
      this.setState({ buttonClicked: false })
      this.props.ajaxError(err, res)
    }

    let paymentType = this.props.paymentInfo.paymentType.split('-')[0]

    if(paymentType === 'BraintreeGateway'){
      payWithCard(
        this.props.paymentInfo,
        (url) => this.redirect(url),
        errCallback
      )
    }
    if(paymentType === 'PayPalExpress' ){
      redirectToPaypal(
        this.props.paymentInfo.paymentType,
        errCallback
      )
    }
  }

  prevStep(){
    this.redirect('/checkout/payment')
  }
  renderMessage(){
    let className = "payment-summary-message" + (this.props.isMobile ? ' mobile' : '')
    let showPopup = this.props.showPopup
    let showLink4 = Spree.getLocale() === 'de'
    let lang = Spree.getShopName() === 'usa' ? 'usa' : i18n.t('pages.lang')
    let url1 = `/common/pages/terms-${lang}.html`
    let url2 = `/common/pages/privacy-${lang}.html`
    let url3 = `/common/pages/terms-${lang}.html#cancellation`
    let url4 = `/common/pages/terms-${lang}.html#rent-payment`

    return (
      <div className={className}>
        <strong>{i18n.t('payment-summary.message.head')}</strong>

        {i18n.t('payment-summary.message.body.before1')}
        <a href={url1} onClick={showPopup}>{i18n.t('payment-summary.message.body.link1')}</a>
        {i18n.t('payment-summary.message.body.before2')}
        <a href={url2} onClick={showPopup}>{i18n.t('payment-summary.message.body.link2')}</a>
        {i18n.t('payment-summary.message.body.before3')}
        <a href={url3} onClick={showPopup}>{i18n.t('payment-summary.message.body.link3')}</a>
        {i18n.t('payment-summary.message.body.after3')}
        {!showLink4 ? null: i18n.t('payment-summary.message.body.before4')}
        {!showLink4 ? null:
          <a href={url4} onClick={showPopup}>{i18n.t('payment-summary.message.body.link4')}</a>
        }
      </div>
    )
  }
  renderPaymentMethod(){
    let paymentInfo = this.props.paymentInfo
    let isBrainTree = paymentInfo.paymentType.split('-')[0] === 'BraintreeGateway'
    if(isBrainTree){
      return (
        <div className="text">
          <ImgAsset src="/visa.png" dir="checkout" />
          &nbsp; - {paymentInfo.paymentDetails.details.lastTwo}
        </div>
      )
    }

    return <div className="text">PayPal</div>
  }
  renderPaymentReview(){

    let signUp = this.props.userData.signUp
    let shippingInfo = this.props.userData.shippingInfo

    let planId = this.props.checkoutPlan.selectedPlan
    let plan = this.props.plans.filter(plan => plan.id === planId)[0]
    let isUsa = Spree.getShopName() === 'usa'

    return (
      <div className="payment-review">
        <div>
          <div className="title">{i18n.t('payment-summary.label.payment-method')}</div>
          {this.renderPaymentMethod()}
        </div>
        <div className="middle">
          <div className="title">{i18n.t('payment-summary.label.shipping-info')}</div>
          <div className="text">
            <span className="row">
              {signUp.firstName + ' ' + signUp.lastName}
            </span>
            <span className="row">
              {shippingInfo.street + ' ' + shippingInfo.house}
            </span>
            <span className="row">
              {shippingInfo.postalCode + ' ' + shippingInfo.city + ' ' + shippingInfo.countryName}
            </span>
          </div>
        </div>
        <div className="last">
          <div className="title">{i18n.t('payment-summary.label.payment-info')}</div>
          <ul>
            <li>
              <span className="top">{plan.price + i18n.t('month')}</span>
              {isUsa ? null : <span className="bottom">{i18n.t('payment-summary.inkl')}</span>}
            </li>
            <li>
              <span className="top">{plan.title}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  render(){

    const buttonText = i18n.t('payment-summary.button')
    const backButtonText = i18n.t('payment-summary.button.back')
    const isMobile = this.props.isMobile
    let Buttons = isMobile ? OrderFooterMobile : OrderFooter
    let {buttonClicked} = this.state

    let nextStep = this.nextStep.bind(this)
    let prevStep = this.prevStep.bind(this)

    return (
      <div className="payment-summary">

        <PageTitle title={i18n.t('payment-summary.title')} />

        {this.renderMessage()}

        {!isMobile ? null:
          <SummaryMobile order={this.props.order} />
        }

        <div className="top-button">
          <Button onClick={this.nextStep.bind(this)} buttonClicked={buttonClicked} className="btn red">
            <ImgAsset src="/forward-red.svg" />
            {buttonText}
          </Button>
        </div>

        {this.renderPaymentReview()}

        {isMobile ? null :
          <CheckoutSummaryTable order={this.props.order} paymentSummary={true} />
        }

        <Buttons nextStep={nextStep}
                 prevStep={prevStep}
                 backButtonText={backButtonText}
                 buttonText={buttonText}
                 buttonClicked={buttonClicked}
        />

      </div>
    )
  }
}

PaymentSummaryPage.propTypes = {
  order: React.PropTypes.object,
  isMobile: React.PropTypes.bool
}

PaymentSummaryPage.contextTypes = {
  router: React.PropTypes.object
}
