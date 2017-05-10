import React from 'react'
import './index.css'
import { relativePath } from '../../helpers/git-pages-relative-path-helper'

const Page404 = () =>
        <div className="page-not-found">
          <div className="page-not-found-info">
            <p>We are here to tell you:<br/>&nbsp;"The page you are looking for was not found."</p>
            <p><a href={`${relativePath()}/`}>Home</a></p>
          </div>
        </div>

export { Page404 }
