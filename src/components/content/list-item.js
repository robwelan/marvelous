import React from 'react'
import { truncateString } from '../../helpers/truncate-string'

const ListItem = (props) => {

  const Buttons = () => {
    if (props.engine.detail === true) {
      return (
        <a className="button" href="#" onClick={(event) => props.goBack(event, {id: 'back'})}>Back</a>
      )
    } else {
      return (
        <div>
          { !props.engine.node.hasOwnProperty('buttons') ? null :
              props.engine.node.buttons.hasOwnProperty('two') ?
                <a className="button" href="#" onClick={(event) => props.getData(event, {id: 'two', ref: props.id, endpoint: props.engine.node[props.engine.node.buttons.two].endpoint})}>{props.engine.node[props.engine.node.buttons.two].label}</a>
              : null
          }
          { !props.engine.node.hasOwnProperty('buttons') ? null :
              props.engine.node.buttons.hasOwnProperty('one') ?
                <a className="button" href="#" onClick={(event) => props.getData(event, {id: 'one', ref: props.id, endpoint: props.engine.node[props.engine.node.buttons.one].endpoint})}>{props.engine.node[props.engine.node.buttons.one].label}</a>
              : null
          }
        </div>
      )
    }
  }

  return (
    <li>
      <span className="volume-image"><img alt={`Cover: ${props.title}`} src={`${props.path}.${props.extension}`} /></span>
      <span className="volume-data">
        { props.numberLabel !== '' ? <span className="volume-title">{props.numberLabel} {props.number}: {props.title}</span> : <span className="volume-title">{props.title}</span> }
        { props.description !== null ?
          <span className="contain-volume-description">
            <span className="volume-description-title">{props.descriptionLabel}: </span>
            { props.engine.detail ?
              <span className="volume-description-body">{props.description}</span>
              : <span className="volume-description-body">{truncateString(props.description, 200, true)}</span>
            }
          </span>
          : null
        }
      </span>
      <span className="volume-contain-buttons">
        <Buttons />

      </span>
    </li>
  )
}

export { ListItem }
