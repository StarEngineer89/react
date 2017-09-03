import React from 'react'

import './PersonalInfoPage.scss'
import Header from './Header.jsx'
import PersonalBlock from './PersonalBlock.jsx'
import LocationBlock from './LocationBlock.jsx'
import PhoneBlock from './PhoneBlock.jsx'
import NextButton from './NextButton.jsx'
import {i18n, Spree} from '../../common'
import {Section } from '../../common/section'
import SignUpStore from '../stores/SignUpStore.js'
import SignUpActions from '../actions/SignUpActions.js'
import RootActions from '../actions/RootActions.js'

export default class PersonalInfoPage extends React.Component{
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

  storeChanged(state) {
    this.setState(state)
  }

  render(){
    let model = this.state
    let onNextClicked = () => SignUpActions.createAccount(this.state)

    let lang = Spree.getShopName() === 'usa' ? 'usa' : i18n.t('pages.lang')
    let url = `/common/pages/terms-${lang}.html`
    let showPopup = event => {
      event.preventDefault()
      RootActions.showPopup(event.target.href)
    }

    let updateSubscription = event => SignUpActions.updateSubscription(event.target.checked)

    return (
      <div>
        <Header />
        <div className="container personal-info-page">

          <PersonalBlock model={model.signUp} />
          <LocationBlock model={model} />
          <PhoneBlock model={model.phone} />

          <Section className="sign-up">
            <div className="terms">
              <div className="text">
                {i18n.t('personal-information.mandatory')}
              </div>
              <div className="text">
                {i18n.t('personal-information.correct-info')}
              </div>
              <div className="text">
                {i18n.t('personal-information.agree')} <a href={url} onClick={showPopup}>{i18n.t('personal-information.terms')}</a>
              </div>
              <label className="text">
                <input type="checkbox" checked={model.subscription} onClick={updateSubscription} />
                {i18n.t('personal-information.subscription')}
              </label>
            </div>

            <NextButton model={model} onClick={onNextClicked} className="btn purple">
              {i18n.t('personal-information.create-button')}
            </NextButton>
          </Section>

        </div>
      </div>
    )
  }
}
