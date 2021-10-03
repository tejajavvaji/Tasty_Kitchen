import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

// let toggle = false

// const authToken = async () => {
//   const token = Cookies.get('jwt_token')
//   const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
//   const options = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method: 'GET',
//   }
//   const response = await fetch(apiUrl, options)
//   const data = response.json()
//   if (response.ok) {
//     toggle = true
//   }
//   if (data.status_code === 401) {
//     Cookies.remove('jwt_token')
//   }
//   return <Redirect to="/login" />
// }

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  //   authToken()
  //   if (toggle) {
  //     return <Route {...props} />
  //   }
  return <Route {...props} />
}

export default ProtectedRoute
