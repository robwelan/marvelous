import { SHOW_LOADING_SCREEN, HIDE_LOADING_SCREEN } from '../actions/retrievals.js'

const
initialState = {
  loading: false
},

show = (state = initialState, action) => {

  switch (action.type) {
  case SHOW_LOADING_SCREEN:
    return (
      {
        ...state,
        loading: true
      }
    )
  case HIDE_LOADING_SCREEN:
    return (
      {
        ...state,
        loading: false
      }
    )
  default:
    // eliminate console error
  }

  return state
}

export { show }
