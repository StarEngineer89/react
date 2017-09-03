import React from 'react'
import BrainTree from 'braintree-web'

import './BrainTreeBlock.scss'
import PaymentShadow from './PaymentShadow.jsx'
import {Section} from '../../common/section'
import {FormControl} from '../../common/form'
import { ImgAsset, i18n } from '../../common'

let myIntegration

export default class BrainTreeBlock extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      showShadow: true,
      fullName: ''
    }
  }
  componentDidMount(){
    let {onChange} = this.props

    BrainTree.setup(this.props.brainTreeToken, "custom", {
      onReady: function (integration) {
        myIntegration = integration;
      },
      id: "brain-tree-form",
      hostedFields: {
        styles: {
          // Style all elements
          'input': {
            'font-size': '16px',
            color: 'rgba(51, 51,51, 0.7)'
          },

          // Styling element state
          ':focus': {
            color: 'rgba(51, 51,51, 0.8)'
          },
          '.invalid': {
            'color': 'red'
          }
        },
        number: {
          selector: "#brain-number",
          placeholder: i18n.t('payment-info.placeholder.card-number')
        },
        cvv: {
          selector: "#brain-cvv",
          placeholder: i18n.t('payment-info.placeholder.csc')
        },
        expirationDate: {
          selector: "#brain-expiry",
          placeholder: i18n.t('payment-info.placeholder.expires')
        }
        //onFieldEvent: this.onFieldChange.bind(this)
      },
      onPaymentMethodReceived: (event) => {
        onChange({
          paymentDetails: event,
          err: ''
        })
      },
      onError: (event) => {
        onChange({
          paymentDetails: null,
          err: event.message
        })
      }
    });

    setTimeout(
      () => this.setState({ showShadow: false }),
      3000
    )
  }
  componentWillUnmount(){
    myIntegration && myIntegration.teardown()
  }
  render(){
    let model = this.state
    let onChange = event => this.setState({ fullName: event.target.value })

    return (
      <Section className="brain-tree-form">

        <div className="text">
          {i18n.t('payment-info.label.we-accept')}
          <ImgAsset src="/cards.png" dir="checkout" />
        </div>

        <FormControl model={model}
                     name="fullName"
                     placeholder={i18n.t('payment-info.placeholder.fullName')}
                     onChange={onChange}
        />

        <form id="brain-tree-form" className="card-block" onSubmit={event => event.preventDefault()}>

          <div className="control" id="brain-number">
            <ImgAsset src="/correct.svg" />
          </div>

          <div className="row">
            <div className="control" id="brain-expiry">
              <ImgAsset src="/correct.svg" />
            </div>

            <div className="control" id="brain-cvv">
              <ImgAsset src="/correct.svg" />
            </div>
          </div>

          <input type="submit" />
          <PaymentShadow when={this.state.showShadow} />
        </form>

        <div className="text mandatory">
          {i18n.t('personal-information.mandatory')}
        </div>
      </Section>
    )
  }
}

BrainTreeBlock.propTypes = {
  onChange: React.PropTypes.func,
  brainTreeToken: React.PropTypes.string
}
