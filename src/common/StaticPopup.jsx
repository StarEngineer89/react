import React from 'react'

import './StaticPopup.scss'
import RemoveIcon from './RemoveIcon.jsx'

export default class StaticPopup extends React.Component{
  componentWillMount(){
    document.body.className = 'popup-opened'
  }
  componentWillUnmount(){
    document.body.className = ''
  }
  render(){
    let {link, closePopup} = this.props

    return (
      <div className="static-popup">
        <iframe src={link}></iframe>
        <RemoveIcon onClick={closePopup} />
      </div>
    )
  }
}

StaticPopup.propTypes = {
  link: React.PropTypes.string,
  closePopup: React.PropTypes.func
}
