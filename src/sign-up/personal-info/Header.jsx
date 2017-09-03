import React from 'react'

import './Header.scss'
import { i18n } from '../../common'

export default class Header extends React.Component{
  render(){
    return (
      <div className="personal-header">
        <div className="container">
          <div className="page-name">
            {i18n.t('personal-header.main')}
          </div>
          <div className="message">
            {i18n.t('personal-header.second')}
          </div>
        </div>
      </div>
    )
  }
}
