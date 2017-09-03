import React from 'react'


import './InputControl.scss'
import './LocationControl.scss'
import FormError from './FormError.jsx'
import { ImgAsset, i18n, Spree } from '../'

export default class LocationControl extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      error: ''
    }
  }
  componentDidMount(){
    if(window.google){
      this.initAutoComplete()
    } else {
      window.initAutocomplete = () => this.initAutoComplete()

      let googleKey = 'AIzaSyDLL2FUb9Mw3oaXdFUXgCs_97YwDJRhnzU'
      let script = document.createElement('script')
      script.src = `//maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places&callback=initAutocomplete&language=en`
      window.document.head.appendChild(script)
    }
  }
  componentWillUnmount(){
    window.google.maps.event.trigger(this.autocomplete, 'remove', true)
  }
  initAutoComplete(){
    this.autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('location-auto-complete'),
      {types: ['geocode']}
    )

    this.autocomplete.addListener('place_changed', this.fillInAddress.bind(this))
  }
  fillInAddress(){
    let isUsa = Spree.getShopName() === 'usa'
    let isUK = Spree.getShopName() === 'uk'
    const place = this.autocomplete.getPlace();

    let componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    let result = {
      street_number: '',
      route: '',
      locality: '',
      country: '',
      postal_code: ''
    }

    place.address_components.forEach(comp => {
      let name = comp.types[0]
      if(componentForm[name]){
        result[name] = comp[componentForm[name]]
      }
    })

    let empty = Object.keys(result).filter(key => !result[key]).length
    if(empty){
      this.setState({
        error: 'server'
      })
      return
    }

    if (!empty && isUsa) {
      if (result.locality !== 'New York') {
        this.setState({
          error: 'server.usa'
        })
        return
      }
    } else if (!empty && isUK) {
      if (result.locality !== 'London') {
        this.setState({
          error: 'server.uk'
        })
        return
      }
    }

    this.setState({
      error: ''
    })

    let result2 = {
      street: result.route,
      house: result.street_number,
      city: result.locality,
      additional: '',
      country: result.country,
      postalCode: result.postal_code
    }

    this.props.onChange({
      locationText: place.formatted_address,
      locationVerified: true,
      location: result2
    })
  }
  renderErrorText(){
    let {error} = this.state

    if(!error){
      return
    }

    if (error === 'server') {
      return i18n.t('location-control.error')
    } else if (error === 'server.usa') {
      return i18n.t('location-control.error.usa')
    } else if (error === 'server.uk') {
      return i18n.t('location-control.error.uk')
    }

    return i18n.t('location-control.error.ui')
  }
  render(){
    let {model, onChange} = this.props

    let resetState = (event)=>{
      this.setState({
        error: ''
      })
      onChange({
        location: null,
        locationText: event.target.value,
        locationVerified: false
      })
    }

    let resetStateAdditional = (event)=>{
      onChange({
        locationTextAdditional: event.target.value
      })
    }

    let showImg = model.locationVerified

    return (
      <div className="location-control">

        <FormError text={this.renderErrorText()} />

        <div className="row">
          <input className="input-control"
                 defaultValue={model.locationText}
                 id="location-auto-complete"
                 onChange={resetState}
                 placeholder={i18n.t('location-block.placeholder')}
          />
        </div>

        <div className="row">
          <input className="input-control"
                 defaultValue={model.locationTextAdditional || model.shippingInfo.additionalInfo}
                 id="location-additional"
                 onChange={resetStateAdditional}
                 placeholder={i18n.t('location-block.placeholder.additional')}
          />
        </div>

        <ImgAsset src="/correct.svg" when={showImg} />

        {this.renderNote()}
      </div>
    )
  }
  renderNote(){
    let {address} = this.props

    return (
      <div className="location-note">
        <span className="bold">{i18n.t('location-block.example')}</span> {address ? address : i18n.t('location-block.address')}
      </div>
    )
  }
}
