import React from 'react'
import './index.css'

const MarvelAttribution = _ => {
  const d = new Date(),
        n = d.getFullYear()

  return (
    <p className="marvel-attribution">
      Data provided by Marvel. © 2014-{n} Marvel
    </p>
  )
}

export { MarvelAttribution }
