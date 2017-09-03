import * as Requests from '../common/utils/Requests.jsx'
import Spree from '../common/utils/Spree.jsx'

function responseToOrder(body, callback){
  let ship_address = body.ship_address || {}
  let user = body.user || {}
  let location = user.ship_address || {}
  let birthDate = user.birthdate ? user.birthdate.split('-') : []
  let userVerified = user.verified || false

  let hostName = Spree.getHost()

  callback({
    order: {
      items: body.grouped_line_items.map(item => {
        let image = hostName + (item.images_url || [])[0]

        return {
          id: item.id,
          img: image,
          name: item.name,
          price: item.single_display_amount,
          total: item.display_amount,
          amount: item.quantity,
          artikul: item.artikel,
          variant_id: item.variant_id
        }
      }),
      subtotal: body.display_item_total,
      adjustment: body.display_adjustment_total,
      shipping: body.display_ship_total,
      total: body.display_total,
      usSalesTax: body.display_us_sales_tax
    },
    user: {
      loggedIn: !!body.user_id,
      name: location.firstname || "",
      verified: userVerified
    },
    userData: {
      signUp: {
        firstName: location.firstname || "",
        lastName: location.lastname || "",
        email: body.email || "",
        password: body.user_id ? 'hide password' : '',
        birthMonth: parseInt(birthDate[1], 10) || "",
        birthYear: parseInt(birthDate[0], 10) || "",
        birthDay: parseInt(birthDate[2], 10) || "",
        gender: user.gender || ""
      },
      location: {
        country: location.country_id || "",
        countryName: location.country_name || "",
        postalCode: location.zipcode || "",
        street: location.address1 || "",
        house: location.address2 || "",
        additional: location.company || "",
        city: location.city || ""
      },
      locationVerified: userVerified,
      shippingInfo: {
        country: ship_address.country_id || "",
        countryName: ship_address.country_name || "",
        postalCode: ship_address.zipcode || "",
        street: ship_address.address1 || "",
        house: ship_address.address2 || "",
        additional: ship_address.company || "",
        additionalInfo: ship_address.additional_info || "",
        city: ship_address.city || ""
      },
      phone:{
        phoneCode: '',
        phoneNumber: ship_address.phone || "",
        phoneSms: userVerified,
        verificationCode: '',
        phoneVerified: userVerified
      }
    },
    paymentTypes: body.payment_methods_for_order.map(function (engine) {
      return {
        id: engine.id,
        name: engine.name,
        type: engine.type
      }
    }),
    currentPage: body.state,
    external: body.external,
    externalBack: body.external_url || "",
    externalLogo: hostName + (body.store_logo || ''),
    externalName: body.store_name || "",
    removedProducts: body.removed_products
  })
}

export function getOrderDetails(isReset, callback, errCallback){
  if(!errCallback){
    errCallback = callback
    callback = isReset
    isReset = false
  }
  Requests.orderDetailsRequest(isReset, function(err, res){
    responseToOrder(res.body, callback)
  }, errCallback)
}

export function removeItem({order, lineId}, callback){
  let item = order.items.filter(item => item.id === lineId)[0]
  order.items.splice(order.items.indexOf(item), 1)

  callback({ order })

  Requests.removeLineRequest(item.variant_id, (err, res) => {

    responseToOrder(res.body, callback)
  })
}

export function changeAmount({order, lineId, amount}, callback){
  let line = order.items.filter(item => item.id === lineId)[0]
  line.amount = amount

  callback({ order })

  let params = {
    quantity: amount,
    variant_id: line.variant_id
  }

  Requests.changeAmountRequest(params, (err, res) => {
    responseToOrder(res.body, callback)
  })

}

export function checkoutSignIn(user, callback, errCallback){
  Requests.orderSignInRequest(user, function (err, res) {
    responseToOrder(res.body, callback)
  }, errCallback)
}

export function forgotPassword(email, callback, errCallback){
  Requests.forgotRequest(email, callback, errCallback);
}

export function getSubscriptionPlans(callback, errorCallback){

  Requests.getPlansRequest(function (err, res) {
    if(!err){
      callback(res.body.map(item => {
        return {
          id: '' + item.id,
          title: item.title,
          price: item.amount_per_month,
          firstMonthPrice: item.amount_per_first_month,
          isDiscounted: item.is_first_month_discount,
          comments: item.features_description || []
        }
      }))
    }
  }, errorCallback)
}

export function getCountries(callback){
  Requests.countriesRequest(function (err, res) {
    if(!err){
      callback(res.body)
    }
  })
}

export function orderSignIn(data, callback, errCallback){
  Requests.orderSignInRequest(data.signIn, function(err, res){
    responseToOrder(res.body, callback)
  }, errCallback)
}

export function savePersonalInfo(data, callback, errCallback){

  let signUp = data.signUp
  let shippingAddress = data.location || {}
  let locationTextAdditional = data.locationTextAdditional

  let user = {
    "birthdate": signUp.birthDay + '-' + signUp.birthMonth + '-' + signUp.birthYear,
    "gender": signUp.gender,
    "ship_address_attributes": {
      "phone": data.phone.phoneCode + data.phone.phoneNumber,
      "address1": shippingAddress.street,
      "address2": shippingAddress.house,
      "additional_info": locationTextAdditional,
      "company": shippingAddress.additional,
      "firstname": signUp.firstName,
      "lastname": signUp.lastName,
      "zipcode": shippingAddress.postalCode,
      "city": shippingAddress.city,
      "country_id": shippingAddress.country
    },
    "accept_newsletter": data.subscription
  }

  if(signUp.password !== 'hide password'){
    user.email = signUp.email
    user.password = signUp.password
  }

  let order = {}

  if(!data.shippingSame){
    shippingAddress = data.shippingSame ? data.location : data.shippingInfo

    order.ship_address_attributes = {
      "phone": data.phone.phoneCode + data.phone.phoneNumber,
      "address1": shippingAddress.street,
      "address2": shippingAddress.house,
      "company": shippingAddress.additional,
      "firstname": signUp.firstName,
      "lastname": signUp.lastName,
      "zipcode": shippingAddress.postalCode,
      "city": shippingAddress.city,
      "country_id": shippingAddress.country
    }
  }

  Requests.updateUserRequest({order, user}, function(err, res){
    responseToOrder(res.body, callback)
  }, errCallback)
}

export function payWithCard(formData, callback, errCallback){

  let paymentArr = formData.paymentType.split('-')

  let data = {
    payments_attributes:[
      {
        payment_method_id: paymentArr[1]
      }
    ],
    payment_method_nonce: formData.paymentDetails.nonce
  }

  //data.coupon_code = formData.coupon

  Requests.savePaymentRequest(data, function (err, res) {
    callback(res.body.url)
  }, errCallback)
}

export function sendSmsToUser(model, callback){

  let data = {
    country_code: model.phoneCode,
    phone_number: model.phoneNumber
  }
  Requests.sendSmsRequest(data, callback)

  //setTimeout(callback, 1000)
}

export function resendSms(model, callback){
  let data = {
    country_code: model.phoneCode,
    phone_number: model.phoneNumber
  }
  Requests.resendSmsRequest(data, callback)

  //setTimeout(callback, 1000)
}

export function confirmSms(model, callback){
  let data = {
    country_code: model.phoneCode,
    phone_number: model.phoneNumber,
    verification_code: model.verificationCode
  }

  Requests.verifySmsRequest(data, callback)
  //setTimeout(callback, 1000)
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

export function setSubscriptionPlan(data, callback, errCallback){
  Requests.setPlanRequest(data.selectedPlan, function(err, res){
    responseToOrder(res.body, callback)
  }, errCallback);
}

export function checkCoupon(model, callback, errCallback){
  Requests.applyCouponRequest(model.coupon, callback, errCallback)
}

export function getBrainTreeToken(callback){
  Requests.getBrainTreeTokenRequest(function(err, res){
    callback(res.body.token)
  })
}

export function redirectToPaypal(paymentType, errCallback){
  let id = paymentType.split('-')[1]
  Requests.getPaypalUrlRequest(id, function(err, res) {
    location.href = res.body.paypal_url
  }, errCallback)
}
