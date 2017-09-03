
import ShopAt from '../config/shop-at'
import ShopDe from '../config/shop-de'
import ShopUk from '../config/shop-uk'
import ShopNl from '../config/shop-nl'
import ShopUs from '../config/shop-us'
import Spree from './Spree.jsx'

let shops = {
  at: ShopAt,
  de: ShopDe,
  uk: ShopUk,
  nl: ShopNl,
  usa: ShopUs,
  experte: ShopDe
}

let langs = {}
let lang = 'en'
let shop = 'uk'
let currentBundle = null

export default {
  t,
  setLang(l, s){
    if(langs[l]) {
      lang = l;
      currentBundle = null
    }
    if(shops[s]){
      shop = s;
      currentBundle = null
    }
  },
  setBundles(obj){
    langs = obj
  },
  getLang(){
    return lang
  },
  readLangFromCookie(){
    this.setLang(Spree.getLocale(), Spree.getShopName())
  }
}

function getBundle(){
  if(!currentBundle){
    currentBundle = Object.assign({}, langs[lang], shops[shop])
  }

  return currentBundle
}

function t(label){
  let langFile = getBundle()

  if(!langFile){
    return 'Missing bundle'
  }

  let text = langFile[label]
  return text ? text : 'Not found'
}
