/* global jest, describe, it, expect, beforeEach */
jest.unmock('../CheckoutSummaryTable.jsx')
jest.unmock('../../utils/localization.js')
jest.unmock('../../../common/index.js')
jest.unmock('../../common/ImgAsset.jsx')
jest.unmock('../../../common/Button.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import order from './mocks/order.js'
import CheckoutSummaryTable from '../CheckoutSummaryTable.jsx'

describe('CheckoutSummaryTable', function() {
  let removeItem,
      changeAmount

  beforeEach(function() {
    removeItem = () => {}
    changeAmount = () => {}
  })

  function renderCheckoutSummaryTable() {
    return TestUtils.renderIntoDocument(
      <CheckoutSummaryTable order={order}
                            changeAmount={changeAmount}
                            buttonText="prop text"
                            removeItem={removeItem}
                            nextStep={() => {}}/>
    )
  }

  it('should render CheckoutSummaryTable with correct className', function() {
    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let CheckoutSummaryTableNode = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)

    expect(CheckoutSummaryTableNode.classList.length).toEqual(1)
    expect(CheckoutSummaryTableNode.classList[0]).toEqual('bd-items')
  })

  it('should render correct text in table head', function() {
    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let CheckoutSummaryTableNode = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)

    let ColumnOne = CheckoutSummaryTableNode.querySelector('.column-one p'),
        ColumnTwo = CheckoutSummaryTableNode.querySelector('.column-two p'),
        ColumnThree = CheckoutSummaryTableNode.querySelector('.column-three p'),
        ColumnFour = CheckoutSummaryTableNode.querySelector('.column-four p')

    expect(ColumnOne.textContent).toEqual('ITEMS')
    expect(ColumnTwo.textContent).toEqual('Price')
    expect(ColumnThree.textContent).toEqual('No.')
    expect(ColumnFour.textContent).toEqual('Total price')
  })

  it('should render back to shop button', function() {
    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let CheckoutSummaryTableFooter = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                                             .querySelector('.items-footer')

    let BackButton = CheckoutSummaryTableFooter.querySelector('.left button')

    expect(BackButton.textContent).toEqual('Back to shop')
  })

  it('should render back to payment button', function() {
    removeItem = undefined

    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let CheckoutSummaryTableFooter = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                                             .querySelector('.items-footer')

    let BackButton = CheckoutSummaryTableFooter.querySelector('.left button')

    expect(BackButton.textContent).toEqual('Back to Payment information')
  })

  it('should render next step button with correct text', function() {
    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let CheckoutSummaryTableFooter = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                                             .querySelector('.items-footer')

    let BackButton = CheckoutSummaryTableFooter.querySelector('.right button')

    expect(BackButton.textContent).toEqual('prop text')
  })

  it('should render proper number of item rows', function() {
    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let ItemRow = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                          .querySelectorAll('.item-row')

    expect(ItemRow.length).toEqual(3) // 1 more for subtotal
  })

  it('should render proper text in item rows', function() {
    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let ItemRow = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                          .querySelector('.item-row')
    let ItemRowSecond = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                                .querySelectorAll('.item-row')[1]

    let ItemRowLabel = ItemRow.querySelector('.label'),
        ItemRowPrice = ItemRow.querySelector('.column-two'),
        ItemRowAmount = ItemRow.querySelector('.column-three input'),
        ItemRowTotal = ItemRow.querySelector('.column-four')

    let ItemRowSecondLabel = ItemRowSecond.querySelector('.label'),
        ItemRowSecondPrice = ItemRowSecond.querySelector('.column-two'),
        ItemRowSecondAmount = ItemRowSecond.querySelector('.column-three input'),
        ItemRowSecondTotal = ItemRowSecond.querySelector('.column-four')

    expect(ItemRowLabel.textContent).toEqual('Beats by Dr. Dre Solo² Wireless Black, As good as new')
    expect(ItemRowPrice.textContent).toEqual('29.90 €/Mo.')
    expect(ItemRowAmount.defaultValue).toEqual('1')
    expect(ItemRowTotal.textContent).toEqual('29.90 €/Mo.')

    expect(ItemRowSecondLabel.textContent).toEqual('Wii U As good as new')
    expect(ItemRowSecondPrice.textContent).toEqual('39.90 €/Mo.')
    expect(ItemRowSecondAmount.defaultValue).toEqual('1')
    expect(ItemRowSecondTotal.textContent).toEqual('39.90 €/Mo.')
  })

  it('should not show input for items amount field', function() {
    changeAmount = undefined

    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let ItemRow = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                          .querySelector('.item-row')
    let ItemRowAmount = ItemRow.querySelector('.column-three')

    expect(ItemRowAmount.textContent).toEqual('1')
  })

  it('should render table summary', function() {
    changeAmount = undefined

    let CheckoutSummaryTableContainer = renderCheckoutSummaryTable()

    let SummaryRow = ReactDOM.findDOMNode(CheckoutSummaryTableContainer)
                             .querySelector('.item-row.last-row')
    let SummaryRowText = SummaryRow.querySelectorAll('.column-total p')

    expect(SummaryRowText[0].textContent).toEqual('subtotal 698.30 €/Mo.')
    expect(SummaryRowText[1].textContent).toEqual('shipping 4.00 €')
    expect(SummaryRowText[2].textContent).toEqual('total 702.30 €')
  })

  // TODO: click emulation for actions
})
