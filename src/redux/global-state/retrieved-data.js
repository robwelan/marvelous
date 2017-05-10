import { RETRIEVED_USEFUL_DATA, LOAD_APP } from '../actions/retrievals.js'

let
      cP = 0,
      cPs = 0

const
      initialState = {
          app: {
            loaded: false
          },
          offset: 0,
          limit: 0,
          total: 0,
          count: 0,
          page: 0,
          pages: 0,
          data: []
      },

      data = (state = initialState, action) => {

        switch (action.type) {
        case LOAD_APP:
          return (
            {
              ...state,
              app: {
                loaded: true
              }
            }
          )
        case RETRIEVED_USEFUL_DATA:
          if (action.limit > 0) {
            cP = (action.offset / action.limit ) + 1
            cPs = Math.ceil(action.total / action.limit)
          }
          if (cP > cPs) {
            cP = cPs
          }
          return (
            {
              ...state,
              offset: action.offset,
              limit: action.limit,
              total: action.total,
              count: action.count,
              page: cP,
              pages: cPs,
              data: [...action.data]
            }
          )
        default:
          // eliminate console error
        }

        return state
      }

export { data }
