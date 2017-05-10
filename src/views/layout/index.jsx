import React from 'react'
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'

import SideBar from '../../components/side-bar'
import Content from '../../components/content'
import { Page404 } from '../../components/404'

import { supportedRoutes } from '../../helpers/api'
import { isInArray } from '../../helpers/in-array'
import './index.css'

const menuTransition = 700 // milliseconds

class Layout extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        sidebar: {
          action: 'hide', // or 'open' or 'close'
          orientation: 'portrait'
        },
        mounted: false
      }

    this.navOpen = this.navOpen.bind(this)
    this.navClose = this.navClose.bind(this)
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      mounted: true
    })
  }

  componentWillUnmount() {
    this.setState({
      ...this.state,
      mounted: false
    })
  }

  navOpen (e) {
    e.stopPropagation()

    this.setState({
      ...this.state,
      sidebar: {
        action: 'open'
      }
    })
  }

  navClose (e) {
    e.stopPropagation()

    this.setState({
      ...this.state,
      sidebar: {
        action: 'close'
      }
    })

    setTimeout(() => {
      this.setState({
        ...this.state,
        sidebar: {
          action: 'hide'
        }
      })
    }, menuTransition)
  }

  // { window.location.pathname === '/' ? <Route path='/' component={Content}/> : null }
  // { window.location.pathname === '/comics' ? <Route path='/comics' component={Content}/> : null }
  // { window.location.pathname === '/characters' ? <Route path='/characters' component={Content}/> : null }
  //

  render () {
    let { sidebar: { action } } = this.state,
        supportedRoute = true
    const aSR = [...supportedRoutes()],
          pathName = window.location.pathname

    supportedRoute = isInArray(aSR, window.location.pathname)
    
    return (
      <div className="wrapper">

        <header>
          <i className="drawer-menu-open ion-navicon-round" onClick={(event) => this.navOpen(event)}></i>
        </header>

        <SideBar
            action={action}
            menuTransition={menuTransition}
            navClose={this.navClose.bind(this)}
          />

          { pathName === '/marvelous/' ? <Route path='/' component={Content}/> : null }
          { pathName === '/marvelous/comics' ? <Route path='/comics' component={Content}/> : null }
          { pathName === '/marvelous/characters' ? <Route path='/characters' component={Content}/> : null }
          { supportedRoute === false ? <Route path='/*' component={Page404}/> : null }


        <footer>
          <span className="footer-text">&copy; Copyright - 2017 | Rob Welan. All Rights Reserved.</span>
          <span className="footer-text portrait-only">This App is best viewed in portrait mode.</span>
        </footer>

      </div>
    )
  }
}

Layout.propTypes = {
  // State
  // Actions:
  navClose: PropTypes.func
}

export { Layout }
