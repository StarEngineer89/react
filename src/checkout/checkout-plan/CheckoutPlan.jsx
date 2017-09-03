import React from 'react'

import './CheckoutPlan.scss'
import {i18n} from '../../common'

export default class CheckoutPlan extends React.Component{
  onRadioChange(event){
    this.props.changePlan(event.target.value)
  }
  renderPrice(plan) {
    
    if (plan.isDiscounted) {
      return (
        <div className="price-discounted">
          <p><span className="price-title">First month</span> {plan.firstMonthPrice + i18n.t('month')}</p>
          <p className="price-thereafter"><span className="price-title">Thereafter</span> {plan.price + i18n.t('month')}</p>
        </div>
      )
    } else {
      return (
        <span>{plan.price+ i18n.t('month')}</span>
      )
    }
  }
  render(){
    const selectedPlan = this.props.selectedPlan

    return (
      <form>
        {this.props.plans.map(plan =>
          <label key={plan.id}>
            <div className="radio">
            <input type="radio" name="package" value={plan.id}
                   checked={plan.id === selectedPlan}
                   onChange={this.onRadioChange.bind(this)}
            />
            </div>
            <div className="name">
              <span className="title">{plan.title}</span>
              {plan.comments.map((comment,index) =>
                <span key={index}>{comment}</span>
              )}
            </div>
            <div className="price">
              {this.renderPrice(plan)}
            </div>
          </label>
        )}
      </form>
    )
  }
}

CheckoutPlan.propTypes = {
  plans: React.PropTypes.array,
  changePlan: React.PropTypes.func.isRequired,
  selectedPlan: React.PropTypes.string
}
