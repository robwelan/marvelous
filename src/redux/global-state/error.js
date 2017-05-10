import { ERROR_TOTAL_AND_COMPLETE } from '../actions/retrievals.js'

const
      ERROR_STATUS = '',
//      oE = errorHandle(),

      initialState = {
        confirmed: false,
        id: '',
        error_code: 0,
        message: ''
      },

      error = (state = initialState, action) => {
        switch (action.type) {
        case ERROR_TOTAL_AND_COMPLETE:
          return (
            {
              ...state,
              confirmed: true,
              id: '104',
              error_code: 104,
              message: 'https://en.wikipedia.org/wiki/Category:Marvel_Comics_supervillain_teams'
            }
          )
        case ERROR_STATUS:
          return (
            {
              ...state,
              confirmed: true,
              id: '',
              error_code: 0,
              message: ''
            }
          )

        default:
          // eliminate console error
        }

        return state
      }

export { error }
