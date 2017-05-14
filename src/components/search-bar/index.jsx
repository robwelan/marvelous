import React from 'react'
import { ScreenReaderOnlySpan } from '../screen-reader-only-span'
import './index.css'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {
        search: ''
      }
    }

    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleChange = event => {
    this.setState({
      inputs: {
        search: event.target.value
      }
    })
  }

  handleClear = e => {
    this.state = {
      inputs: {
        search: ''
      }
    }
  }

  handleKeyPress = (e) => {
    const { inputs } = this.state

    if (e.key === 'Enter') {
      this.props.startSearch(e, {search: inputs.search})
    }
  }

  render () {
    let { inputs } = this.state,
        sClassSearchBar = ''

    if (this.props.engine.node.hasOwnProperty('search') && this.props.engine.detail === false) {

      if (this.props.engine.search === false) {
        sClassSearchBar = "search-wrapper"
      } else {
        sClassSearchBar = "search-wrapper with-clear"
      }
      return (
        <div className="search-bar-spacer">
          <p>
            <span className={sClassSearchBar}>
              <input
                type="search"
                name="search"
                value={this.state.inputs.search || ''}
                placeholder={this.props.engine.node.search.placeholder}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />

              </span>
              {
                this.props.engine.search === true ?
                <a onClick={event => {
                      this.props.clearSearch(event, {search: 'clear'})
                      this.handleClear(event)
                      }
                    }
                    className="btn-search"
                    href="#"
                    role="button"
                    aria-disabled="false">
                  <ScreenReaderOnlySpan classes={[]} label="clear search"/><span className="ion-ios-close-empty"></span>
                </a>
                : null
              }
              <a onClick={event => this.props.startSearch(event, {search: inputs.search})}
                 className="btn-search"
                 href="#"
                 role="button"
                 aria-disabled="false">
                <ScreenReaderOnlySpan classes={[]} label="activate search"/>
                <span className="ion-ios-search"></span>
              </a>
          </p>
        </div>
      )
    } else {
      return (
        <div className="search-bar-spacer"></div>
      )
    }
  }
}
