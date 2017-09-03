import React from 'react'

import './GlobalError.scss'
import RemoveIcon from './RemoveIcon.jsx'
export default class GlobalError extends React.Component{
  errorBody(){
    const children = this.props.children
    if (typeof(children) === 'string') {
      return <span key="error" dangerouslySetInnerHTML={{ __html: this.props.children }} />
    }

    return children
  }

  render(){
    return (
      <div className="global-error">
        {this.errorBody()}
        <RemoveIcon onClick={this.props.onClose} />
      </div>
    )
  }
}

GlobalError.propTypes = {
  onClose: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}
