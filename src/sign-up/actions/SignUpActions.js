import React from 'react'
import alt from '../alt.js'
import { browserHistory } from 'react-router'
import * as Requests from '../../common/utils/Requests.jsx'
import { i18n, Spree } from '../../common'

class SignUpActions {
  showSignUp(show){
    browserHistory.push('/sign-up')
    return show
  }

  updateFormValue(event, name){
    return {event, name}
  }

  updateSubscription(value){
    return {
      subscription: value
    }
  }

  onSignIn() {
    let shopName = Spree.getShopName()
    location.href = `/${shopName}/categories`
  }

  onNextError(err, res) {
     return res && res.body && res.body.error || i18n.t('ajax.error')
  }

  signIn(user){
    return (dispatch) => {
      dispatch()
      Requests.signInRequest(user, this.onSignIn, this.onNextError)
    }
  }

  updateForgot(value){
    return {
      showForgot: value
    }
  }

  forgot(model){
    return (dispatch) => {
      dispatch()
      Requests.forgotRequest(model.email, this.onForgot, this.onNextError)
    }
  }

  onForgot(){
    return {
      buttonClicked: false,
      forgotSuccess: true
    }
  }

  redirect(url){
    return () => {
      Requests.countriesRequest(this.countriesResponse, this.onNextError)
      browserHistory.push(url)
    }
  }

  countriesResponse(err, res){
    return {
      countries: res.body
    }
  }

  locationChange(location) {
    return location
  }

  onSignUp() {
    let shopName = Spree.getShopName()
    location.href = `/${shopName}/howorks`
  }

  createAccount(data){
    let signUp = data.signUp
    let shippingAddress = data.location || {}

    let user = {
      "birthdate": signUp.birthDay + '-' + signUp.birthMonth + '-' + signUp.birthYear,
      "gender": signUp.gender,
      "email": signUp.email,
      "password": signUp.password,
      "ship_address_attributes": {
        "phone": data.phone.phoneCode + data.phone.phoneNumber,
        "address1": shippingAddress.street,
        "address2": shippingAddress.house,
        "company": shippingAddress.additional,
        "firstname": signUp.firstName,
        "lastname": signUp.lastName,
        "zipcode": shippingAddress.postalCode,
        "city": shippingAddress.city,
        "country_id": shippingAddress.country
      },
      "accept_newsletter": data.subscription 
    }

    return (dispatch) => {
      dispatch()
      Requests.signUpRequest(user, this.onSignUp, this.onNextError)
    }
  }
}

export default alt.createActions(SignUpActions)
