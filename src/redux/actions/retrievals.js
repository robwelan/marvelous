import md5 from 'blueimp-md5/js/md5.min.js'
import { marvelKey } from '../../secrets'

export const
      LOAD_APP = 'LOAD_APP',
      ERROR_TOTAL_AND_COMPLETE = 'ERROR_TOTAL_AND_COMPLETE',
      SHOW_LOADING_SCREEN = 'SHOW_LOADING_SCREEN',
      HIDE_LOADING_SCREEN = 'HIDE_LOADING_SCREEN',
      RETRIEVED_USEFUL_DATA = 'RETRIEVED_USEFUL_DATA',
      CLEAR_SEARCH = 'CLEAR_SEARCH',
      CLEAR_DETAIL = 'CLEAR_DETAIL',
      SET_NODE = 'SET_NODE',
      SET_COMPLETE = 'SET_COMPLETE',
      SET_SEARCH = 'SET_SEARCH',
      SET_OFFSETS = 'SET_OFFSETS',
      DETAIL_PAGE = 'DETAIL_PAGE',

      ts = Date.now(),
      hash = md5(`${ts}${marvelKey.private}${marvelKey.public}`),

      checkStatusCode = async response => {
        /*  Use this line when debugging if you wish:
         *    console.debug('checkStatusCode', response)
         */

        if (response.status !== 200) {
          // Create an error
          let error = Error('Received an error response.')

          error.response = response

          if (error.response) {
            try {
              let data = await error.response.json()
              error.data = data

            } catch (e){}
          }

          return window.Promise.reject(error)

        }
        // Data is good (if we got here)
        return response
      },

      setDetail = () => {
        return (
          {
            type: DETAIL_PAGE
          }
        )
      },

      setEngineNode = (engine) => {
        return (
          {
            type: SET_NODE,
            node: { ...engine.node }
          }
        )
      },

      setEngineNodeComplete = _ => {
        return (
          {
            type: SET_COMPLETE
          }
        )
      },

      setOffsets = (engine) => {
        return (
          {
            type: SET_OFFSETS,
            data: engine.offsets.data,
            search: engine.offsets.search
          }
        )
      },

      setEngineSearch = (engine) => {
        return (
          {
            type: SET_SEARCH,
            params: engine.params
          }
        )
      },

      clearEngineDetail = _ => {
        return (
          {
            type: CLEAR_DETAIL
          }
        )
      },

      clearEngineSearch = _ => {
        return (
          {
            type: CLEAR_SEARCH
          }
        )
      },

      useData = data => {
        return (
          {
            type: RETRIEVED_USEFUL_DATA,
            offset: data.offset,
            limit: data.limit,
            total: data.total,
            count: data.count,
            data: [...data.results]
          }
        )
      },

      loadApp = _ => {
        return { type: LOAD_APP }
      },

      startLoading = _ => {
        return { type: SHOW_LOADING_SCREEN }
      },
      endLoading = _ => {
        return { type: HIDE_LOADING_SCREEN }
      },
      showTheWorstError = _ => {
        return { type: ERROR_TOTAL_AND_COMPLETE }
      },
      unresolvableError = dispatch => {
        setTimeout(() => {
          dispatch(endLoading())
          dispatch(showTheWorstError())
        }, 1500)
      },

      // another way to handle, left for reference
      // unresolvableError = dispatch => (_ => {
      //   setTimeout(() => {
      //     dispatch(endLoading())
      //     dispatch(showTheWorstError())
      //   }, 1500)
      // }),

      fetchMe = (request) => {

        request.headers.set('Accept', 'application/json')
        request.headers.set('Content-Type', 'application/json')

        const handleSuccess = data => {
        /*  Use this line when debugging if you wish:
         *    console.debug('handleSuccess', data)
         */

                if (data.status.toUpperCase() === 'OK' && data.code === 200) {
                  return data
                } else {
                  return window.Promise.reject(data)
                }
              },

              handleFailure = err => {
                console.debug('handleFailure', err)

                return window.Promise.reject(err)
              }

        return window.fetch(request)
              .then(checkStatusCode)
              .then(response => response.json())
              .then(handleSuccess, handleFailure)
      },

      getOffset = engine => {
        let value = engine.offsets.data

        if (engine.search === true) {
          value = engine.offsets.search
        }

        if (value === 0) {
          return ''
        } else {
          return `&offset=${value}`
        }
      },

      loadedAppAsync = _ => {
        return (dispatch, getState) => {
          dispatch(loadApp())
        }
      },

      updateEngineAsync = engine => {
        return (dispatch, getState) => {
          dispatch(setEngineNode(engine))
          dispatch(setEngineNodeComplete())
        }
      },

      retrieveDataAsync = engine => {
        return (dispatch, getState) => {

          const onSuccess = data => {
            let usefulData = data.data

            if (engine.init === true) {
              dispatch(setEngineNode(engine))
              dispatch(setEngineNodeComplete())
            }

            if (engine.detail === true) {
              dispatch(setDetail())
            }
            if (engine.search === true) {
              dispatch(setEngineSearch(engine))
            }
            dispatch(setOffsets(engine))
            if (engine.action === 'clear_search') {
              dispatch(clearEngineSearch())
            }
            if (engine.action === 'clear_detail') {
              dispatch(clearEngineDetail())
            }
            setTimeout(() => {
              dispatch(useData(usefulData))
              dispatch(endLoading())
            }, 150)
          },

          onError = err => {
            console.debug('standard error', err)
            //  from here we can test what error was thrown, and handle accordingly
            unresolvableError(dispatch)
          },

          gateway_at_marvel = 'https://gateway.marvel.com',
          endpoint_at_marvel = '/v1/public/comics',
          sOffset = getOffset(engine)

          let url = '',
              method = ''

          if (engine.detail === false) {
            url = `${gateway_at_marvel}${engine.node.endpoint === '' ? endpoint_at_marvel : engine.node.endpoint}?ts=${ts}&apikey=${marvelKey.public}&hash=${hash}`
            url = `${url}${sOffset}`
            if (engine.search === true) {
              url = `${url}${engine.params}`
            }
          } else {
            url = `${gateway_at_marvel}${engine.page}?ts=${ts}&apikey=${marvelKey.public}&hash=${hash}`
          }

          const defaultMethod = 'GET'

          if (engine.node.hasOwnProperty('method')) {
            method = engine.node.method
          } else {
            method = defaultMethod
          }

          let request = new Request(url, {
            method,
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
      //    		'Content-Type': 'application/json', API doesn't like this line...
              'Accept-Encoding': 'gzip',
              'Accept': '*/*'
            })
          })

          dispatch(startLoading())

          return fetchMe(request).then(onSuccess, onError)
            .catch(e => {
              unresolvableError(dispatch)
              }
            )
        }
      }
