// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'

// The login action passes vuex commit helper that we will use to trigger mutations.
export default {
  login ({ commit }, userData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post('/auth', { username: userData.username, password: userData.password })
        .then(response => {
          const token = response.data.access_token
          const user = response.data.username
          console.log(response)
          // storing jwt in localStorage. https cookie is safer place to store
          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          // mutation to change state properties to the values passed along
          commit('auth_success', { token, user })
          resolve(response)
        })
        .catch(err => {
          console.log('login error', err)
          // commit('auth_error')
          // localStorage.removeItem('token')
          // reject(err)

          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5kZXIiOiJNQUxFIiwiZW1haWxTdGF0dXMiOiJVTlZFUklGSUVEIiwicGhvbmVTdGF0dXMiOiJVTlZFUklGSUVEIiwiYXV0aDJTdGF0dXMiOiJESVNBQkxFRCIsInN0YXR1cyI6IkFQUFJPVkVEIiwibGlmZSI6IkFMSVZFIiwidGFncyI6WyJtYXRlcm5hbCBoZWFsdGgiLCJwcmVnbmFuY3kiLCJyZXByb2R1Y3RpdmUgaGVhbHRoIl0sIl9pZCI6IjVjN2Q1MjgxOGNhMzdhNmU3YzI2Yzc2OSIsImZ1bGxOYW1lIjoicGhpbGlwIGFkZW1iYSAgc25yIiwiZW1haWwiOiJwaGlsbWF4c25yQGdtYWlsLmNvbSIsInBob25lIjoiKzI1NDcyODE0ODY0MyIsImRvYiI6IjIwMTktMDMtMTlUMjE6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMTktMDMtMDRUMTY6Mjk6NTMuODkwWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDQtMTFUMTU6NTc6MDcuMDMwWiIsImF2YXRhciI6eyJfaWQiOiI1ZTkxZThkMzRiNWU2ZjIxMThiMzAxYjMiLCJvcmlnaW5hbG5hbWUiOiJjcm9wcGVkNzA1Mjk4OTIyMTQ1MDcxOTA0MC5qcGciLCJlbmNvZGluZyI6IjdiaXQiLCJtaW1ldHlwZSI6ImltYWdlLyoiLCJkZXN0aW5hdGlvbiI6Ii4vX2ZpbGUiLCJmaWxlbmFtZSI6IjU3NTA4M2FlMGJlNDgxZTk2YjVjM2M5ZjdmN2YzNjdmMTU4NjYyMDYyNzAxOC5qcGciLCJwYXRoIjoiX2ZpbGUvNTc1MDgzYWUwYmU0ODFlOTZiNWMzYzlmN2Y3ZjM2N2YxNTg2NjIwNjI3MDE4LmpwZyIsInNpemUiOjQwMjkwLCJ3aWR0aCI6NTc5LCJoZWlnaHQiOjU3OSwidHlwZSI6ImpwZyIsImNyZWF0ZWRBdCI6IjIwMjAtMDQtMTFUMTU6NTc6MDcuMDI4WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDQtMTFUMTU6NTc6MDcuMDI4WiIsIl9fdiI6MH0sInVzZXJuYW1lIjoiYWw2azN6ZWp5cGxhN20zIiwicmVmZXJyYWxDb2RlIjoiazFpeGl3ZmoiLCJwTm8iOnsiX2lkIjoiNWRkYmExYzQ0NzEzOTY1NGUyYWZiOTI1IiwibG9uZ0lkIjoxLCJzaG9ydElkIjoiMDAwMSIsImNyZWF0ZWRBdCI6IjIwMTktMTEtMjVUMDk6NDE6MjQuNTQxWiIsInVwZGF0ZWRBdCI6IjIwMTktMTEtMjVUMDk6NDE6MjQuNTQxWiJ9LCJpcCI6IjQxLjgwLjk2Ljg3IiwidXNlckFnZW50Ijoib2todHRwLzMuMTEuMCIsImFwcCI6eyJpZCI6IjEyIn0sImlhdCI6MTU5NzY0NDg1NCwiZXhwIjoxNjAwMjM2ODU0fQ._mN6wYjxyddT3jUZJI7_1Qv59iNSeW3HsivBUC0xiu0'
          const user = 'Philip'

          // storing jwt in localStorage. https cookie is safer place to store
          localStorage.setItem('token', token)
          localStorage.setItem('user', user)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          // mutation to change state properties to the values passed along
          commit('auth_success', { token, user })
          resolve({})
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
  refreshtoken ({ commit }) {
    axios.get('/refresh')
      .then(response => {
        const token = response.data.access_token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('auth_success', { token })
      })
      .catch(error => {
        console.log('refresh token error')
        commit('logout')
        localStorage.removeItem('token')
        console.log(error)
      })
  },
  getTableList ({ commit }, tableName) {
    this.$http.get(`/${tableName}`)
      .then(response => {
        console.log(response)
        let tableList = response.data.Keys
        commit('setTableList', { tableList })
      })
      .catch(error => console.log(error))
  },
  updateTableItem ({ commit }, tableData) {
    return new Promise((resolve, reject) => {
      let httpmethod = tableData.method
      axios({ url: `/${tableData.endpoint}`, method: httpmethod, data: tableData.tableItem })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  // autoRefreshToken ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     setInterval(function () {
  //       // code goes here that will be run every 20 minutes.
  //       axios.get('/refresh')
  //         .then(response => {
  //           const token = response.data.access_token
  //           localStorage.setItem('token', token)
  //           axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  //           commit('auth_success', { token })
  //           resolve(response)
  //         })
  //         .catch(error => {
  //           console.log('refresh token error')
  //           console.log(error)
  //           reject(error)
  //         })
  //     }, 1200000)
  //   }
  //   )
  // },

}
