import { areArraysEqual } from '../../helpers/arrays-are-equal'

const getPropsHasChanged = (nextProps, thisProps, thisState) => {
  let stateUpdate = { ...thisState },
      shouldStateUpdate = false

  if (nextProps.app.loaded === true) {
    stateUpdate = {
      ...stateUpdate,
      app: {
        loaded: true
      }
    }

    shouldStateUpdate = true
  }
  
  if (nextProps.engine.init !== thisProps.engine.offset) {
    if (nextProps.engine.init === true) {
      stateUpdate = {
        ...stateUpdate,
        engine: {
          ...stateUpdate.engine,
          init: nextProps.engine.init,
          node: { ...nextProps.engine.node }
        }
      }
    } else {
      stateUpdate = {
        ...stateUpdate,
        engine: {
          ...stateUpdate.engine,
          init: nextProps.engine.init
        }
      }
    }

    shouldStateUpdate = true
  }


  if ((nextProps.engine.offsets.data !== thisProps.engine.offsets.data) ||
      (nextProps.engine.offsets.search !== thisProps.engine.offsets.search) ||
      (nextProps.engine.params !== thisProps.engine.params) ||
      (nextProps.engine.search !== thisProps.engine.search) ||
      (nextProps.engine.detail !== thisProps.engine.detail) ||
      (nextProps.engine.action !== thisProps.engine.action)) {

        stateUpdate = {
          ...stateUpdate,
          engine: {
            ...nextProps.engine
          }
        }

        shouldStateUpdate = true
    }

  if (nextProps.loading !== thisProps.loading) {
    stateUpdate = {
      ...stateUpdate,
      show: {
        loading: nextProps.loading
      }
    }

    shouldStateUpdate = true
  }

  if ((nextProps.count !== thisProps.data.count) ||
      (nextProps.offset !== thisProps.data.offset) ||
      (nextProps.limit !== thisProps.data.limit) ||
      (nextProps.total !== thisProps.data.total) ||
      (nextProps.page !== thisProps.data.page) ||
      (nextProps.pages !== thisProps.data.pages)
    ) {
    stateUpdate = {
      ...stateUpdate,
      data: {
        ...stateUpdate.data,
        count: nextProps.count,
        offset: nextProps.offset,
        limit: nextProps.limit,
        total: nextProps.total,
        page: nextProps.page,
        pages: nextProps.pages
      }
    }

    shouldStateUpdate = true
  }

  if (areArraysEqual('', nextProps.data, thisProps.data.encyclopedia) === false) {
    stateUpdate = {
      ...stateUpdate,
      data: {
        ...stateUpdate.data,
        encyclopedia: [...nextProps.data]
      }
    }

    shouldStateUpdate = true
  }

  if (nextProps.errorConfirmed !== thisProps.errorConfirmed) {
    stateUpdate = {
      ...stateUpdate,
      error: {
        confirmed: nextProps.errorConfirmed,
        id: nextProps.errorID,
        status_code: nextProps.errorCode,
        message: nextProps.errorText
      }
    }

    shouldStateUpdate = true
  }

  return (
    {
      update: shouldStateUpdate,
      newState: {
        ...stateUpdate
      }
    }
  )
}

export { getPropsHasChanged }
