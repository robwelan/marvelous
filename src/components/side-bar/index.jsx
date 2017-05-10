import React from 'react';
import {connect} from 'react-redux'
import * as actionCreators from '../../redux/actions/retrievals'
import { NavLink } from 'react-router-dom'
// ReactCSSTransitionGroup is recently deprecated...
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// custom bits
import { getNode } from '../../helpers/api'
import { isEmpty } from '../../helpers/check-object-is-empty'

import './index.css'
import './animate.css'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      engine: {},
      router: {}
    }

    this.changeEndpoint = this.changeEndpoint.bind(this)
  }

  componentWillReceiveProps (nextProps)  {
    this.setState({
      engine: {...nextProps.engine},
      router: {...nextProps.router}
    })
  }

  changeEndpoint = (e, key) => {
    e.stopPropagation()

    const { engine } = this.state,
          oEngine = {
            ...engine,
            init: true,
            node: getNode(key),
            search: false,
            detail: false
          }

    if (!isEmpty(engine)) {
      if (engine.node.name === key) {
        return false
      }
    }

    return this.props.updateEngineAsync(oEngine)
  }


  render () {
    let typeOfSideBar = 'side-bar' // 'side-bar' or 'no-side-bar'
    let typeOfOverlay = 'content' // 'content' or 'no-content'

    if (this.props.action === 'close') {
      typeOfSideBar = 'no-side-bar'
      typeOfOverlay = 'no-content'
    }

    if(this.props.action === 'hide') {

      return (<div></div>)

    } else {

      return (
        <div>
          <div key={typeOfSideBar}>
            <CSSTransitionGroup
              transitionName={typeOfSideBar}
              transitionAppearTimeout={this.props.menuTransition}
              transitionAppear={true}
              transitionEnter={false}
              transitionLeave={false}
              >
              <div className="drawer-menu">
                <div className="drawer-menu-overlay">
                  <i className="drawer-menu-close ion-close-round" onClick={event => this.props.navClose(event)}></i>
                  <div className="drawer-menu-items">
                    <ul>
                      <li>
                        <NavLink to="/" exact activeClassName="active"
                          onClick={(event) => {
                            this.changeEndpoint(event, 'getComics')
                            this.props.navClose(event)}}>
                          <span>Comics</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/characters" activeClassName="active"
                          onClick={(event) => {
                            this.changeEndpoint(event, 'getCharacters')
                            this.props.navClose(event)
                            }
                          }>
                          <span>Characters</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CSSTransitionGroup>
          </div>
          <div key={typeOfOverlay}>
            <CSSTransitionGroup
              transitionName={typeOfOverlay}
              transitionAppearTimeout={this.props.menuTransition}
              transitionAppear={true}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="drawer-body" onClick={(event) => this.props.navClose(event)}></div>
            </CSSTransitionGroup>
          </div>
        </div>
      )

    }
  }
}

export default connect(state => {
  const newProps = {
    engine: { ...state.engine },
    router: { ...state.router }
  }

  return newProps
}, { ...actionCreators })(SideBar)
