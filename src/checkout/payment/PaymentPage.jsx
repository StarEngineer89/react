import React from 'react'

import './PaymentPage.scss'
import PaymentBlock from './PaymentBlock.jsx'
import CouponBlock from './CouponBlock.jsx'
import NextButton from './NextButton.jsx'
import { getOrderDetails } from '../Actions'
import {DesktopHeader, MobileHeader, CheckoutItems, BackLine} from '../common'
import {i18n, StepComponent} from '../../common'
import BBPayItem from '../bb-pay/BBPayItem.jsx'


export default class PaymentPage extends StepComponent {

  constructor(props){
    super(props)

    this.state = props.paymentInfo || {
      paymentType: '',
      paymentDetails: null,
      err: '',
      coupon: '',
      couponVerified: false
    }

    this.state.err = ''
    this.state.buttonClicked = false

  }

  nextStep(){
    this.setState({ buttonClicked: true })

    let paymentInfo = this.state

    getOrderDetails(
      (obj) => {
        this.props.updateState(obj)
        this.saveAndGo(
          {
            paymentInfo,
            paymentSummary: undefined
          },
          '/checkout/payment-summary'
        )
      },
      (err, res) => {
        this.setState({ buttonClicked: false })
        this.props.ajaxError(err, res)
      }
    )
  }

  nextClicked(){
    this.setState({ buttonClicked: true })
    this.refs.paymentBlock.nextClicked()
  }

  prevStep(){
    this.redirect('/checkout/personal-information')
  }

  renderHeader(){
    let data = {
      activeTab : 2,
      pageName: i18n.t('payment-info.title'),
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

    let { isMobile, paymentTypes, brainTreeToken } = this.props
    let className = 'content' + (isMobile ? ' mobile' : '')
    let backButton = i18n.t('payment-info.back-button')
    let model = this.state

    let updateState = data => this.setState(data)

    return (
      <div>
        {this.renderHeader()}

        <div className={className}>
          {this.renderLeftColumn()}
          <div className="checkout-payment">
            <PaymentBlock model={model}
                          paymentTypes={paymentTypes}
                          brainTreeToken={brainTreeToken}
                          updateState={updateState}
                          nextStep={this.nextStep.bind(this)}
                          ref="paymentBlock"
            />

            <CouponBlock model={model}
                         updateState={updateState}
            />


            <NextButton model={model} onClick={this.nextClicked.bind(this)} className="btn red">
              {i18n.t('payment-info.button')}
            </NextButton>
          </div>

        </div>
        {isMobile ? null:
          <BackLine prevStep={this.prevStep.bind(this)}
                    buttonText={backButton}
          />
        }
      </div>
    )
  }
}

PaymentPage.propTypes = {
  order: React.PropTypes.object,
  paymentInfo: React.PropTypes.object,
  paymentTypes: React.PropTypes.array,
  isMobile: React.PropTypes.bool,
  brainTreeToken: React.PropTypes.string,
  updateState: React.PropTypes.func
}
