import React from 'react'

import './FormError.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class FormError extends React.Component{

  renderErrorNode(){
    let {text} = this.props
    if(!text){
      return null
    }

    return <span key="error" dangerouslySetInnerHTML={{ __html: text }} />
  }

  render(){
    return (
      <ReactCSSTransitionGroup component="div"
                               className="form-error"
                               transitionName="validation"
                               transitionEnterTimeout={500}
                               transitionLeaveTimeout={300}
      >
        {this.renderErrorNode()}
      </ReactCSSTransitionGroup>
    )
  }
}

FormError.propTypes = {
  text: React.PropTypes.string
}
