import React from 'react'

import './PageFooter.scss'
import { i18n, Spree } from '../../common'
import RootActions from '../actions/RootActions'

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
    let showPopup = event => {
      event.preventDefault()
      RootActions.showPopup(event.target.href)
    }

    return (
      <div className="page-footer">

        {links.map(page =>
          <a key={page.key}
             target="_blank"
             href={page.link}
             onClick={showPopup}
          >
            {page.label}
          </a>
        )}
      </div>
    )
  }
}
