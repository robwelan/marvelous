/*
 *  ScreenReaderOnlySpan accepts two Props:
 *    -> classes as Array
 *    -> label as String
 *
 *  You can add your own additional classes (if you want), but don't add
 *  anything that may affect the included 'sr-only' class.
 */
import React from 'react'
import './index.css'

const ScreenReaderOnlySpan = props => {
  let aClasses = [],
      sClasses = ''

    if(props.classes && props.classes.length){
      aClasses = [...props.classes]
    }

    aClasses.push('sr-only')
    sClasses = aClasses.join(' ').trim()

  return (
    <span className={sClasses}>{props.label}</span>
  )
}

export { ScreenReaderOnlySpan }
