import React from 'react'
import { ScreenReaderOnlySpan } from '../screen-reader-only-span'

import './index.css'

const sFullLeft = 'fullLeft',
      sOneLeft = 'oneLeft',
      sOneRight = 'oneRight',
      sFullRight = 'fullRight',

      PageNav = (props) => {
        let sClassL = 'button-pagenav left'
        let sClassR = 'button-pagenav right'
        let sLabelFL = 'go to page one'
        let sLabelFR = 'go to last page'
        let sLabelL = 'go back one page'
        let sLabelR = 'go forward one page'
        let sAriaDisabledL = 'false'
        let sAriaDisabledR = 'false'

        if (props.page === 1) {
          sClassL = `${sClassL} not-active`
          sAriaDisabledL = 'true'
        }
        if (props.page === props.pages) {
          sClassR = `${sClassR} not-active`
          sAriaDisabledR = 'true'
        }
        return (
          <div className="pagination">
            <p>
              <a className={sClassL} role="button" aria-disabled={sAriaDisabledL} href="#" onClick={(event) => props.getPage(event, sFullLeft)}>
                <ScreenReaderOnlySpan label={sLabelFL}/>
                <span className="ion-ios-arrow-left"></span>
                <span className="ion-ios-arrow-left"></span>
              </a>
              <a className={sClassL} role="button" aria-disabled={sAriaDisabledL} href="#" onClick={(event) => props.getPage(event, sOneLeft)}>
                <ScreenReaderOnlySpan label={sLabelL}/>
                <span className="ion-ios-arrow-left"></span>
              </a>
              <span className="pagination-statistics">Page {props.page}<br/>of {props.pages}</span>
              <a className={sClassR} role="button" aria-disabled={sAriaDisabledR} href="#" onClick={(event) => props.getPage(event, sOneRight)}>
                <ScreenReaderOnlySpan label={sLabelR}/>
                <span className="ion-ios-arrow-right"></span>
              </a>
              <a className={sClassR} role="button" aria-disabled={sAriaDisabledR} href="#" onClick={(event) => props.getPage(event, sFullRight)}>
                <ScreenReaderOnlySpan label={sLabelFR}/>
                <span className="ion-ios-arrow-right"></span>
                <span className="ion-ios-arrow-right"></span>
              </a>
            </p>
          </div>
        )
      }

export { PageNav }
