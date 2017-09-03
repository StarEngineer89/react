import React from 'react'

import '../../common/form/InputControl.scss'
import {Section, SectionTitle} from '../../common/section'
import {checkCoupon} from '../Actions'
import { ImgAsset, LoadingButton, Validation, i18n } from '../../common'
import { FormError } from '../../common/form'
import './CouponBlock.scss'

export default class CouponBlock extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      request: false,
      err: ''
    }
  }
  verifyClicked(){
    if(this.state.request){
      return
    }
    this.setState({
      request: true,
      err: ''
    })
    checkCoupon(this.props.model, this.verifyAnswer.bind(this), this.showError.bind(this))
  }
  showError(err, res){
    this.setState({
      request: false,
      err: res.body.error || i18n.t('ajax.error')
    })
  }
  verifyAnswer(){
    this.setState({
      request: false
    })
    this.props.updateState({
      couponVerified: true
    })
  }
  render(){
    let {model, updateState} = this.props
    let err = this.state.err

    let updateCoupon = (event)=>{
      updateState({
        coupon: event.target.value,
        couponVerified: false
      })
    }

    return (
      <div>
        <SectionTitle>{i18n.t('payment-info.label.coupon')}</SectionTitle>

        <Section>
          <div className="coupon-block">

            <FormError text={err} />

            <input className="input-control"
                   value={model.coupon}
                   placeholder={i18n.t('payment-info.placeholder.coupon')}
                   onChange={updateCoupon}
            />

            {this.renderMark()}

            {this.renderButton()}
            
            {this.renderCouponText()}
          </div>
        </Section>
      </div>
    )
  }

  renderCouponText(){
    let {model} = this.props
    if(!model.couponVerified){
      return null
    }
    
    return (
      <div className="coupon-text">
        {i18n.t('payment-info.coupon.success')}
      </div>
    )
  }

  renderButton(){
    let {model} = this.props
    let {request} = this.state
    if(model.couponVerified){
      return null
    }

    let disabled = !Validation.checkFieldBool('coupon', model.coupon)

    return <LoadingButton className="button" key="submit"
                          disabled={disabled}
                          request={request}
                          onClick={this.verifyClicked.bind(this)}
    >
      {i18n.t('payment-info.button.verify')}
    </LoadingButton>
  }

  renderMark(){
    if(!this.props.model.couponVerified){
      return null
    }
    return <ImgAsset src="/correct.svg" />
  }
}

CouponBlock.propTypes = {
  model: React.PropTypes.object,
  updateState: React.PropTypes.func
}
