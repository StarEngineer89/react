import request from './request.jsx'
import Spree from './Spree.jsx'

let getOrderId = Spree.getOrderNumber
let hostName = Spree.getHost()

export function orderDetailsRequest(isReset, callback, errCallback){
  request({
    type: 'get',
    path: `${hostName}/api/orders/${getOrderId()}` + (isReset ? '?reset=1' : ''),
    callback: callback,
    errorCallback: errCallback
  })
}

export function removeLineRequest(variant_id, callback, errCallback){
  request({
    type: 'delete',
    path: `${hostName}/api/orders/${getOrderId()}/remove_item?variant_id=${variant_id}`,
    callback: callback,
    errorCallback: errCallback
  })
}

export function changeAmountRequest(data, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/orders/${getOrderId()}/change_quantity`,
    data: data,
    callback: callback,
    errorCallback: errCallback
  })
}

export function signUpRequest(user, callback, errCallback){
  request({
    type: 'post',
    path: `${hostName}/api/sign_up`,
    data: {
      user
    },
    callback: callback,
    errorCallback: errCallback
  })
}

export function signInRequest(user, callback, errCallback){
  request({
    type: 'post',
    path: `${hostName}/api/sign_in`,
    data: {
      user
    },
    callback: callback,
    errorCallback: errCallback
  })
}

export function updateUserRequest(data, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/orders/${getOrderId()}/update_user`,
    data,
    callback: callback,
    errorCallback: errCallback
  })
}

export function orderSignInRequest(user, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/orders/${getOrderId()}/sign_in`,
    data: {
      user
    },
    callback: callback,
    errorCallback: errCallback
  })
}

export function getPlansRequest(callback, errCallback){
  request({
    type: 'get',
    path: `${hostName}/api/orders/${getOrderId()}/subscription_plans`,
    callback: callback,
    errorCallback: errCallback
  })
}

export function countriesRequest(callback, errCallback){
  request({
    type: 'get',
    path: `${hostName}/api/countries`,
    callback: callback,
    errorCallback: errCallback
  })
}

export function forgotRequest(email, callback, errCallback){
  request({
    type: 'post',
    path: `${hostName}/api/reset_password`,
    data: {
      email: email
    },
    callback: callback,
    errorCallback: errCallback
  })
}

export function setPlanRequest(plan, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/orders/${getOrderId()}/set_plan`,
    data: {
      plan
    },
    callback: callback,
    errorCallback: errCallback
  })
}

export function savePaymentRequest(data, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/orders/${getOrderId()}/save_payment_info`,
    data: data,
    callback: callback,
    errorCallback: errCallback
  })
}

export function getBrainTreeTokenRequest(callback, errCallback){
  request({
    type: 'get',
    path: `${hostName}/api/orders/${getOrderId()}/get_braintree_client_token`,
    callback: callback,
    errorCallback: errCallback
  })
}

export function verifyAddressRequest(data, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/verifications/verify_address`,
    data: data,
    callback: callback,
    errorCallback: errCallback
  })
}

export function sendSmsRequest(data, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/verifications/send_verification_code`,
    data: data,
    callback: callback,
    errorCallback: errCallback
  })
}

export function resendSmsRequest(data, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/verifications/send_verification_code`,
    data: data,
    callback: callback,
    errorCallback: errCallback
  })
}

export function verifySmsRequest(data, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/verifications/verify_phone_number`,
    data: data,
    callback: callback,
    errorCallback: errCallback
  })
}

export function getPaypalUrlRequest(paymentId, callback, errCallback){
  request({
    type: 'get',
    path: `${hostName}/api/orders/${getOrderId()}/get_paypal_url?payment_method_id=${paymentId}`,
    callback: callback,
    errorCallback: errCallback
  })
}

export function applyCouponRequest(coupon, callback, errCallback){
  request({
    type: 'put',
    path: `${hostName}/api/orders/${getOrderId()}/apply_coupon`,
    data: {
      coupon_code: coupon
    },
    callback: callback,
    errorCallback: errCallback
  })
}
