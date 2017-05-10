import React from 'react'
import { DataList } from './data-list'
import { PageNav } from '../page-nav'
import { MarvelAttribution } from '../marvel-attribution'

const DataView = (props) => {
  if (props.show.loading === true) {
    return (
      <div className="loading">
        <img src="/images/spiderman-knitting.gif" alt="Spiderman Knitting" className="loading-image" />
      </div>
    )
  }
  if (props.error.id === '104' && props.error.status_code === 104) {
    return (
      <div className="server-not-found">
        <div className="well">
          <h2>Hulk Smash!</h2>
          <p>The server is offline!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contain-page-navigation">
      <div className="contain-volumes">
        { <DataList
            encyclopedia={props.data.encyclopedia}
            getData={props.getData.bind(this)}
            goBack={props.goBack.bind(this)}
            engine={props.engine}
          />
        }
      </div>
      <MarvelAttribution />
      <PageNav
        page={props.data.page}
        pages={props.data.pages}
        getPage={props.getPage.bind(this)}
      />
    </div>
  )
}

export { DataView }
