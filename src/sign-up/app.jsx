import React from 'react'
import {render} from 'react-dom'
import { Router, browserHistory, Route, IndexRoute, Redirect} from 'react-router'

import '../common/common.scss'
import './app.scss'

import ResizeWrapper from './wrapper/ResizeWrapper.jsx'
import EntryPage from './entry-page/EntryPage.jsx'
import PersonalInfoPage from './personal-info/PersonalInfoPage.jsx'

//configuration
import validators from '../common/config/checkout-validators'
import en from '../common/config/checkout-en'
import de from '../common/config/checkout-de'
import {Validation, i18n} from '../common'

Validation.setValidators(validators)
i18n.setBundles({
  en, de
})

i18n.readLangFromCookie()

let firstRoute = true;
function checkState({location}, replace) {

  if(firstRoute && location.pathname !== '/sign-up'){
    console.log('redirect to index')
    //on reload move to the first step
    replace({
      pathname: '/sign-up'
    })
  } else {
    window.scrollTo(0, 0)
  }

  firstRoute = false
}

render((
    <Router history={browserHistory}>
      <Route path="sign-up" component={ResizeWrapper}>
        <IndexRoute component={EntryPage} onEnter={checkState} />

        <Route path="personal-info" component={PersonalInfoPage} onEnter={checkState} />
      </Route>

      <Redirect from="*" to="sign-up" />

    </Router>
  ),
  document.getElementById('app')
)
