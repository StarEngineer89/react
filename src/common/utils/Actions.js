import * as Requests from './Requests.jsx'

export function forgotPassword(email, callback){
  Requests.forgotRequest(email, function (err, res) {
    if(err){
      callback(true)
    } else{
      callback(null, true)
    }
  });
}

export function getCountries(callback){
  Requests.countriesRequest(function (err, res) {
    if(!err){
      callback(res.body)
    }
  })
}

export function sendSmsToUser(model, callback, errCallback){
  let data = {
    country_code: model.phoneCode,
    phone_number: model.phoneNumber,
    order_number: model.orderNumber
  }
  Requests.sendSmsRequest(data, callback, errCallback)
}

export function resendSms(model, callback, errCallback){
  let data = {
    country_code: model.phoneCode,
    phone_number: model.phoneNumber,
    order_number: model.orderNumber
  }
  Requests.resendSmsRequest(data, callback, errCallback)
}

export function confirmSms(model, callback, errCallback){
  let data = {
    country_code: model.phoneCode,
    phone_number: model.phoneNumber,
    verification_code: model.verificationCode,
    order_number: model.orderNumber
  }

  Requests.verifySmsRequest(data, callback, errCallback)
}

export function checkAddress(data, callback){

  let location = data.location
  let userData = data.userInfo

  let address = {
    "address1": location.street,
    "address2": location.house,
    "company": location.additional,
    "zipcode": location.postalCode,
    "city": location.city,
    "country_id": location.country
  }

  let user = {
    birthdate: userData.birthDay + '-' + userData.birthMonth + '-' + userData.birthYear,
    firstname: userData.firstName,
    lastname: userData.lastName
  }

  Requests.verifyAddressRequest({user, address}, callback)
}
