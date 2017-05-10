import React from 'react'
import { ListItem } from './list-item'

const DataList = (props) => {
  const volumes = props.encyclopedia
  let number = '',
      numberLabel = ''

  const listItems = volumes.map((volume) => {
            if (props.engine.node.fields.hasOwnProperty('issue')) {
              number = volume[props.engine.node.fields.issue.name]
              numberLabel = props.engine.node.fields.issue.label
            }

            return (
              <ListItem key={volume.id.toString()}
                id={volume.id.toString()}
                title={volume[props.engine.node.fields.heading.name]}
                titleLabel={props.engine.node.fields.heading.label}
                path={volume.thumbnail.path}
                extension={volume.thumbnail.extension}
                number={number}
                numberLabel={numberLabel}
                description={volume[props.engine.node.fields.body.name]}
                descriptionLabel={props.engine.node.fields.body.label}
                getData={props.getData.bind(this)}
                goBack={props.goBack.bind(this)}
                engine={props.engine}
              />
            )
          }
        )

  if (volumes.length !== 0) {
    return (
      <ul className="volumes">
        {listItems}
      </ul>
    )
  } else {
    return (
      <div className="no-data-found">
        <div className="no-data-found-statement">
          <div className="no-data-found-title">There is no data here?</div>
          <div className="no-data-found-subtext">Sigh...
          <a className="button" href="#" onClick={(event) => props.goBack(event, {id: 'back'})}>Back</a></div>
        </div>
      </div>
    )
  }
}

export { DataList }
