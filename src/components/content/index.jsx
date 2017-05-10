import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/actions/retrievals'
import SearchBar from '../search-bar'
import { getNodeByRoute } from '../../helpers/api'
import { isEmpty } from '../../helpers/check-object-is-empty'

// Import Local Pieces
import { DataView } from './data-view'
import { getPropsHasChanged } from './component-will-receive-props'

// Import Styles
import './index.css'

class Content extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      app: {
        loaded: false
      },
      show: {
        loading: false,
      },
      endpoint: 'getComics',
      engine: {
        init: false,
        node: {},
        offsets: {
          data: 0,
          search: 0
        },
        params: '',
        search: false,
        detail: false,
        action: '',
      },
      data: {
        count: 0,
        offset: 0,
        limit: 0,
        total: 0,
        page: 0,
        pages: 0,
        encyclopedia: [],
      },
      error: {
        confirmed: false,
        id: '',
        error_code: 0,
        message: ''
      }
    }

    this.clearSearch = this.clearSearch.bind(this)
    this.startSearch = this.startSearch.bind(this)
    this.goBack = this.goBack.bind(this)
    this.getData = this.getData.bind(this)
    this.getPage = this.getPage.bind(this)
  }

  componentWillMount () {
    const { app } = this.state

    if (app.loaded === false) {
      this.props.loadedAppAsync()
      this.setState(
        {
          ...this.state,
          app: {
            ...this.state.app,
            loaded: true
          }
        }
      )
    }
  }

  componentDidMount () {
    const { engine } = this.state

    let oEngine = {}

    if (isEmpty(this.props.engine.node)) {
      oEngine = {
        ...engine,
        init: true,
        node: getNodeByRoute(window.location.pathname),
        search: false,
        detail: false
      }
    } else {
      oEngine = {
        ...this.props.engine,
        node: getNodeByRoute(window.location.pathname),
        init: true
      }
    }

    this.props.retrieveDataAsync(oEngine)
  }

  componentWillReceiveProps (nextProps) {
    const answer = getPropsHasChanged(nextProps, this.props, this.state),
          shouldStateUpdate = answer.update,
          stateUpdate = { ...answer.newState }

    if (shouldStateUpdate === true) { this.setState(stateUpdate) }
  }

  getOffset () {
    const { engine } = this.state
    let value = engine.offsets.data

    if (engine.search === true) {
      value = engine.offsets.search
    }

    if (value === 0) {
      return ''
    } else {
      return `&offset=${value}`
    }
  }

  clearSearch(e, button) {
    e.preventDefault()
    e.stopPropagation()

    const { engine } = this.state,
          oEngine = {
            ...engine,
            search: false,
            action: 'clear_search'
          }

    this.props.retrieveDataAsync(oEngine)
  }

  startSearch(e, button) {
    e.preventDefault()
    e.stopPropagation()

    const { engine } = this.state,
          oEngine = {
            ...engine,
            search: true
          }
    let   bSearch = false,
          sInput = ''

    if (engine.node.hasOwnProperty('search')) {
      if (engine.node.search.hasOwnProperty('param')) {
        if (button.search !== '') {
          bSearch = true
        }
      }
    }

    if (bSearch === true) {
      sInput = encodeURIComponent(button.search)
      oEngine.params = `&${engine.node.search.param}=${sInput}`

      this.props.retrieveDataAsync(oEngine)
    } else {
      // TODO handle with a special component or die quietly...
    }
  }

  goBack (e, button) {
    e.preventDefault()
    e.stopPropagation()

    const { engine } = this.state,
          oEngine = {
            ...engine,
            detail: false,
            action: 'clear_detail'
          }

    this.props.retrieveDataAsync(oEngine)
  }

  getData (e, button) {
    e.preventDefault()
    e.stopPropagation()

    const { engine } = this.state,
          sDetail = button.endpoint.replace('{id}', button.ref),
          oEngine = {
            ...engine,
            detail: true,
            page: sDetail
          }

    this.props.retrieveDataAsync(oEngine)
  }

  calculatePage (data, engine) {
    let value = engine.offsets.data

    if (engine.search === true) {
      value = engine.offsets.search
    }

    value += data.limit

    return value / data.limit
  }

  getPage (e, sType) {
    /*
      sType:
      oneLeft, fullLeft, oneRight, fullRight
    */
    const { data, engine } = this.state,
          page = this.calculatePage(data, engine),
          oEngine = {
            ...engine
          }
    let nOffset = 0

    e.preventDefault()
    e.stopPropagation()

    if (sType === 'fullLeft') {
      // adding {data.limit} here means the final equation requires no alteration.
      nOffset = data.limit
      if (page === 1) {
        return false
      }
    }
    if (sType === 'oneLeft') {
      if(page > 1) {
        nOffset = (page - 1) * data.limit
      } else {
        nOffset = page * data.limit
      }
      if (page === 1) {
        return false
      }
    }
    if (sType === 'oneRight') {
      if(page < data.pages) {
        nOffset = (page + 1) * data.limit
      } else {
        nOffset = page * data.limit
        if (page === data.pages) {
          return false
        }
      }
    }
    if (sType === 'fullRight') {
      nOffset = data.pages * data.limit
      if (data.page === data.pages) {
        return false
      }
    }
    // remove the data.limit to ensure we cater to the fact that original offset is 0
    nOffset -= data.limit
    if (oEngine.search === false) {
      oEngine.offsets.data = nOffset
    } else {
      oEngine.offsets.search = nOffset
    }
    this.props.retrieveDataAsync(oEngine)
  }

  render () {
    const { error, show, data, engine } = this.state

    return (
      <div className="content">
        <div className="content-spacer"></div>
        <div className="content-main">
          <SearchBar
            engine={engine}
            startSearch={this.startSearch.bind(this)}
            clearSearch={this.clearSearch.bind(this)}
          />
          <DataView
            data={data}
            show={show}
            error={error}
            engine={engine}
            getPage={this.getPage.bind(this)}
            getData={this.getData.bind(this)}
            goBack={this.goBack.bind(this)}
          />
        </div>
        <div className="content-spacer"></div>
      </div>
    )
  }
}

export default connect(state => {
  const newProps = {
    app: {
      loaded: state.data.app.loaded
    },
    loading: state.show.loading,
    count: state.data.count,
    offset: state.data.offset,
    limit: state.data.limit,
    total: state.data.total,
    page: state.data.page,
    pages: state.data.pages,
    data: [...state.data.data],
    engine: {
      init: state.engine.init,
      node: { ...state.engine.node },
      offsets: {
        ...state.engine.offsets
      },
      params: state.engine.params,
      search: state.engine.search,
      detail: state.engine.detail,
      action: state.engine.action
    },
    errorConfirmed: state.error.confirmed,
    errorID: state.error.id,
    errorCode: state.error.error_code,
    errorText: state.error.message
  }

  return newProps
}, { ...actionCreators })(Content)
