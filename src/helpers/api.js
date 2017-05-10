const
      marvelEndPoints = {

        getComics: {
          method: 'GET',
          endpoint: '/v1/public/comics',
          route: '/',
          fields: {
            heading: {
              label: 'Title',
              name: 'title'
            },
            body: {
              label: 'Description',
              name: 'description'
            },
            issue: {
              label: 'Issue',
              name: 'issueNumber'
            }
          },
          label: 'Comics',
          buttons: {
            one: 'getComic',
            two: 'getCharacters'
          },
          search: {
            param: 'titleStartsWith',
            placeholder: 'Search By Title...'
          },
          getCharacters: {
            method: 'GET',
            endpoint: '/v1/public/comics/{id}/characters',
            label: 'Characters'
          },
          getComic: {
            method: 'GET',
            endpoint: '/v1/public/comics/{id}',
            label: 'Details'
          }
        },

        getCharacters: {
          method: 'GET',
          endpoint: '/v1/public/characters',
          route: '/characters',
          fields: {
            heading: {
              label: 'Name',
              name: 'name'
            },
            body: {
              label: 'Description',
              name: 'description'
            }
          },
          label: 'Characters',
          buttons: {
            one: 'getCharacter',
            two: 'getComics'
          },
          search: {
            param: 'nameStartsWith',
            placeholder: 'Search By Name...'
          },
          getComics: {
            method: 'GET',
            endpoint: '/v1/public/characters/{id}/comics',
            label: 'Comics'
          },
          getCharacter: {
            method: 'GET',
            endpoint: '/v1/public/characters/{id}',
            label: 'Details'
          }
        }

      },

      getNode = key => {
        if (marvelEndPoints.hasOwnProperty(key) === true) {
          const oKey = {
            ...marvelEndPoints[key],
            name: key
          }
          return oKey
        } else {
          return false
        }
      },
      
      supportedRoutes = _ => {
        let oNode = {},
            aSR = []

        Object.keys(marvelEndPoints).forEach((key, index) => {
          oNode = getNode(key)
          if (oNode.hasOwnProperty('route')) {
            aSR.push(oNode.route)
            if (oNode.route === '/') {
              aSR.push('/comics')
            }
          }
        })

        return aSR
      },

      getNodeByRoute = route => {
        let oNode = {},
            oKey = {},
            isFound = false

        Object.keys(marvelEndPoints).forEach((key, index) => {

          oNode = getNode(key)

          if (oNode.hasOwnProperty('route')) {

            if (oNode.route === route) {
              isFound = true
              oKey = { ...oNode }
            }
          }
        })

        if (isFound) {
          return oKey
        } else {
          return false
        }
      }

export { getNode, getNodeByRoute, supportedRoutes }
