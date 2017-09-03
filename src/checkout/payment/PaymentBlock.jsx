import React from 'react'

import BrainTreeBlock from './BrainTreeBlock.jsx'
import CouponBlock from './CouponBlock.jsx'
import { Section, SectionTitle } from '../../common/section'
import { ImgAsset, i18n } from '../../common'

const BRAIN_TREE_TYPE = 'BraintreeGateway'

export default class Payment extends React.Component {

  afterBrainTree(){
    let {model, updateState} = this.props

    if(model.err){
      updateState({ buttonClicked: false })
      setTimeout(
        () => updateState({ err: '' }),
        3500
      )
      return
    }
    this.props.nextStep()
  }

  nextClicked(){
    let { paymentType } = this.props.model
    if(paymentType.split('-')[0] === BRAIN_TREE_TYPE){
      document.querySelector('#brain-tree-form input').click()
    } else {
      this.props.nextStep()
    }
  }

  render(){
    let {paymentTypes} = this.props

    return (
      <div>

        <SectionTitle className="first">
          {i18n.t('payment-info.title.payment-option')}
        </SectionTitle>

        {paymentTypes.map((engine, index) =>
          <div key={engine.id}>
            {this.renderRadio(engine, index)}
            {this.renderBrainTreeBlock(engine)}
          </div>
        )}

      </div>
    )
  }

  renderBrainTreeBlock(engine){
    if(engine.type !== BRAIN_TREE_TYPE){
      return null
    }

    let {brainTreeToken, model, updateState} = this.props
    if(!model.paymentType || model.paymentType.split('-')[0] !== BRAIN_TREE_TYPE){
      return null
    }
    let onChange = obj => {
      updateState(obj)
      setTimeout(
        () => this.afterBrainTree(),
        0
      )
    }

    return (
        <BrainTreeBlock brainTreeToken={brainTreeToken} onChange={onChange} />
    )
  }

  renderRadio(engine, index){
    let {model, updateState} = this.props
    let checked = model.paymentType.indexOf(engine.id) > 0

    let showImg = engine.type === BRAIN_TREE_TYPE && !checked

    let value= engine.type + '-' + engine.id

    let className = 'payment-type' + (index === 0 ? ' first' : '')

    let onChange = event => updateState({ paymentType: event.target.value })

    return (
      <Section>
        <label className={className}>
          <input name="payment" type="radio" value={value} checked={checked} onChange={onChange} />
          {engine.name}

          <ImgAsset src="/cards.png" when={showImg} dir="checkout" />
        </label>
      </Section>
    )
  }
}

Payment.propTypes = {
  paymentTypes: React.PropTypes.array,
  formData: React.PropTypes.object,
  nextStep: React.PropTypes.func.isRequired,
  brainTreeToken: React.PropTypes.string
}
