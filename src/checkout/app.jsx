import React from 'react'
import {render} from 'react-dom'
import { Router, IndexRoute, Redirect, Route, browserHistory } from 'react-router'

import CheckoutSummary from './checkout-summary/CheckoutSummaryPage.jsx'
import CheckoutPlan from './checkout-plan/CheckoutPlanPage.jsx'
import CheckoutPersonalInformation from './personal-information/PersonalInformationPage.jsx'
import Payment from './payment/PaymentPage.jsx'
import PaymentSummary from './payment-summary/PaymentSummaryPage.jsx'
import Confirmation from './confirmation/ConfirmationPage.jsx'
import ResizeWrapper from './wrapper/ResizeWrapper.jsx'

import '../common/common.scss'
import './app.scss'

//configuration
import validators from '../common/config/checkout-validators'
import en from '../common/config/checkout-en'
import de from '../common/config/checkout-de'

import { Validation, i18n } from '../common'
Validation.setValidators(validators)
i18n.setBundles({
  en, de
})
i18n.readLangFromCookie()

//end configuration

function fixScroll() {
  window.scrollTo(0, 0)
}

let firstRoute = true;
function checkState({location}, replace) {

  if(firstRoute && location.pathname !== '/checkout'){
    //on reload move to the first step
    replace({
      pathname: '/checkout'
    })
  } else {
    fixScroll()
  }

  firstRoute = false
}


render((
  <Router history={browserHistory}>
    <Route path="checkout" component={ResizeWrapper}>
      <IndexRoute component={CheckoutSummary} onEnter={checkState} />

      <Route path="plan" component={CheckoutPlan} onEnter={checkState} />
      <Route path="personal-information" component={CheckoutPersonalInformation} onEnter={checkState} />
      <Route path="payment" component={Payment} onEnter={checkState} />
      <Route path="payment-summary" component={PaymentSummary} onEnter={checkState} />

      <Route path="confirmation" component={Confirmation} onEnter={fixScroll} />
    </Route>

    <Redirect from="*" to="checkout" />

  </Router>
  ),
  document.getElementById('app')
)
