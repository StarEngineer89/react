import React from 'react'

import './CheckoutSummaryPage.scss'
import CheckoutSummaryTable from './CheckoutSummaryTable.jsx'
import CheckoutSummaryTableMobile from './CheckoutSummaryTableMobile.jsx'
import { Button, ImgAsset, i18n, StepComponent, LoadingSpinner } from '../../common'
import { PageTitle, OrderFooter, OrderFooterMobile } from '../common'

import {getSubscriptionPlans, changeAmount, removeItem} from '../Actions'

export default class CheckoutSummaryPage extends StepComponent {

  constructor(props){
    super(props)

    this.state = {
      buttonClicked: false
    }
  }

  nextStep(){
    this.setState({
      buttonClicked: true
    })

    let { plans } = this.props
    if(plans.length){
      this.finishStep(plans)
      return
    }
    getSubscriptionPlans(this.finishStep.bind(this), this.ajaxError.bind(this))
  }

  prevStep(){
    location.href = '/'
  }

  ajaxError(err){
    this.setState({
      buttonClicked: false
    })
    this.props.ajaxError(err)
  }

  finishStep(plans){
    var data = {
        plans,
        checkoutPlan: undefined
    }

    this.saveAndGo(data, '/checkout/plan')
  }

  changeAmount(lineId, amount){
    let params = {
      order: this.props.order,
      lineId,
      amount
    }

    changeAmount(
      params,
      data => this.props.updateState(data)
    )

  }

  removeItem(lineId){
    let params = {
      order: this.props.order,
      lineId
    }
    removeItem(
      params,
      data => this.props.updateState(data)
    )
  }

  componentDidMount(){
    if(this.props.external){
      this.nextStep();
    }
  }

  render(){
    const buttonText = i18n.t('checkout-summary.button')
    const backButtonText = i18n.t('checkout-summary.button.back')
    let {isMobile, order, external} = this.props
    let SummaryTable = isMobile ? CheckoutSummaryTableMobile : CheckoutSummaryTable
    let Buttons = isMobile ? OrderFooterMobile : OrderFooter
    let {buttonClicked} = this.state
    let nextStep = this.nextStep.bind(this)
    let prevStep = this.prevStep.bind(this)

    if(external){
      return <LoadingSpinner />
    }

    let buttonDisabled = !order.items.length

    return (
      <div className="checkout-summary">
        <PageTitle title={i18n.t('checkout-summary.title')} />
        {!isMobile
          ? <div className="top-button">
              <Button className="btn red" onClick={this.nextStep.bind(this)} buttonClicked={buttonClicked} disabled={buttonDisabled}>
                <ImgAsset src="/forward-red.svg" />
                {buttonText}
              </Button>
            </div>
          : null
        }

        <SummaryTable
          order={order}
          changeAmount={this.changeAmount.bind(this)}
          removeItem={this.removeItem.bind(this)}
        />


        <Buttons nextStep={nextStep}
                 prevStep={prevStep}
                 backButtonText={backButtonText}
                 buttonText={buttonText}
                 buttonClicked={buttonClicked}
                 buttonDisabled={buttonDisabled}
        />

      </div>
    )
  }
}

CheckoutSummaryPage.propTypes = {
  isMobile: React.PropTypes.bool,
  order: React.PropTypes.object,
  plans: React.PropTypes.array,
  updateState: React.PropTypes.func
}
