import React from 'react'

import './PageFooter.scss'
import { i18n, Spree } from '../../common'

export default class PageFooter extends React.Component {
  render(){
    let lang = Spree.getShopName() === 'usa' ? 'usa' : i18n.t('pages.lang')
    let links = ['privacy', 'terms'].map(name => {
      return {
        key: name,
        link: `/common/pages/${name}-${lang}.html`,
        label: i18n.t(`page-footer.${name}`)
      }
    })
    return (
      <div className="page-footer">
        {this.renderLoginLink()}

        {links.map(page =>
          <a key={page.key}
             target="_blank"
             href={page.link}
             onClick={this.props.showPopup}
          >
            {page.label}
          </a>
        )}
      </div>
    )
  }

  renderLoginLink(){
    let { isMobile, showLogin, user } = this.props
    if(!isMobile || user.loggedIn){
      return null
    }

    const openLoginDialog = (event)=>{
      event.preventDefault()
      showLogin()
    }
    return <a onClick={openLoginDialog}>{i18n.t('page-footer.login')}</a>
  }
}

PageFooter.propTypes = {
  isMobile: React.PropTypes.bool,
  user: React.PropTypes.object,
  showLogin: React.PropTypes.func,
  showPopup: React.PropTypes.func
}
