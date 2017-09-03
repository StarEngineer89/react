import cookie from 'tiny-cookie'

function isDev(){
  return window.location.hostname === 'localhost'
}

export default {
  getOrderToken(){
    if(isDev()){
      return 'h-Oo7Nv02HzFdtnWoWEx_Q'
    }
    return cookie.get('order_token')
  },
  getSpreeToken(){
    if(isDev()){
      return '0ac8c0154c7d462474d2b1595fe79c29a184e7f3ee53683a'
    }
    return cookie.get('spree_api_key')
  },
  getOrderNumber(){
    if(isDev()){
      return 'R807750808'
    }
    return cookie.get('order_number')
  },
  getHost(){
    if(isDev()){
      return 'http://byebuy.staging.devguru.co'
    }
    return ''
  },
  getLocale(){
    if(isDev()){
      return 'en'
    }
    return cookie.get('locale')
  },
  getShopName(){
    if(isDev()){
      return 'usa'
    }
    return cookie.get('shop_country_code')
  }
}
