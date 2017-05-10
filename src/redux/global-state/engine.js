/*
  NOTES ABOUT retrieveDataAsync (engine)
  When calling retrieveDataAsync, send one argument which is this state object.
  The object shall be made up of the following:
    { engine: {
        init: {true} when you want to set the node.
              {false} reset to where you were prior to search...
        node: the part of the API that you want to use.
              (see helpers/api.js)
        offsets: {
          data: {0} set this value whenever you change pages (with no search)
                in place. Revert to this when search is over.
          search: {0} use this value when search is in place. Set this to {0}
                when no longer searching.
        }
        offset: {0} (number) use as `&Offset=${offset}` if the value is greater than zero)
        params: {''} Search paramaters. Set to {''} when {engine.search} is {false}
        search: {true} and search is current
        detail: {true} and we are on a detail page. {false} and we go back to
                {offsets.data} (or {offsets.search} if true)
        action: set to values to control specific actions. As follows:
                {'clear_search'} clear search specifically
                {'clear_detail'} clear detail specifically
      }
    }
*/

import { SET_NODE, SET_COMPLETE, DETAIL_PAGE, SET_OFFSETS, SET_SEARCH, CLEAR_SEARCH, CLEAR_DETAIL } from '../actions/retrievals.js'

const
      initialState = {
        init: false,
        node: {},
        offsets: {
          data: 0,
          search: 0
        },
        params: '',
        search: false,
        detail: false,
        action: ''
      },

      engine = (state = initialState, action) => {
        switch (action.type) {
        case DETAIL_PAGE:
          return (
            {
              ...state,
              detail: true
            }
          )
        case SET_OFFSETS:
          return (
            {
              ...state,
              offsets: {
                ...state.offsets,
                data: action.data,
                search: action.search
              }
            }
          )
        case SET_SEARCH:
          return(
            {
              ...state,
              params: action.params,
              search: true
            }
          )
        case SET_NODE:
        // and set everything else (back?) to default...
          return (
            {
              ...state,
              node: { ...action.node },
              init: true,
              offsets: {
                data: 0,
                search: 0
              },
              params: '',
              search: false,
              detail: false,
              action: ''
            }
          )
        case SET_COMPLETE:
          return (
            {
              ...state,
              init: false
            }
          )
        case CLEAR_SEARCH:
          return (
            {
              ...state,
              search: false,
              action: '',
              offsets: {
                ...state.offsets,
                search: 0,
              }
            }
          )
        case CLEAR_DETAIL:
          return (
            {
              ...state,
              action: '',
              detail: false
            }
          )
        default:
          // eliminate console error
        } // end switch

        return state
      }

  export { engine }
