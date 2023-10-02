import './App.css'
import axios from 'axios'
import React from 'react'

import DataTable from './DataTable'

const columns = [
  {
    Header: 'Team Name',
    accessor: 'teamName',
  },
  {
    Header: 'Projected Points',
    accessor: 'projectedPts',
  },
];

// const HOMEPAGE = 'https://guillotine.football'
// const YAHOO_CLIENT_ID = 'dj0yJmk9NGVBekNWbUplUndJJmQ9WVdrOWNYTldWakZUWlhRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTJk'
// const YAHOO_CLIENT_SECRET = '67ff91fb2b422cd6fe3a947fe4dadb4ace874b2b'
// const CORS_PROXY_URL = 'https://corsproxy.io'
// const YAHOO_API_HOST = 'https://api.login.yahoo.com'
const SCORES_ENDPOINT = 'https://guillotine-api-9268ebd959e7.herokuapp.com/live-projections'

// async function yahooLogin(code) {
//   console.log(`authing with yahoo using code: ${code}`)

//   try {
//     const token = await axios.post(`${CORS_PROXY_URL}?${YAHOO_API_HOST}/oauth2/get_token`, 
//       {
//         grant_type: 'authorization_code',
//         code,
//         redirect_uri: HOMEPAGE,
//         client_id: YAHOO_CLIENT_ID,
//         client_secret: YAHOO_CLIENT_SECRET
//       },
//       {headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//       }
//     })

//     console.log(`yahoo auth succeeded and got token`, token)
//     return token
//   } catch (e) {
//     console.error('Failed Yahoo login', e)
//   }
// }


async function getLiveScores(code) {
  const scores = await axios.get(SCORES_ENDPOINT)
  return scores.data
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      yahooApiToken: window.sessionStorage.getItem('yahoo_api_token')
    };
  }

  async componentDidMount() {
    console.log('in App.componentDidMount', this.state)


    // const search = window.location.search;
    // const params = new URLSearchParams(search);
    // const yahooAuthRequestCode = params.get('code')
    // if (this.state.yahooApiToken) {
    //   console.log('already logged into yahoo')
    //   return
    // }
    // if (yahooAuthRequestCode) {
    //   const authResponse = await yahooLogin(yahooAuthRequestCode)
    //   const token = authResponse?.data?.access_token 
    //   window.sessionStorage.setItem('yahoo_api_token', token)
    //   this.setState({
    //     yahooApiToken: token
    //   })
    // }

    const scores = await getLiveScores()
    this.setState({scores})
    
  }

  render() {
    console.log('in App.render', this.state)
    return (
      <div className="App">
        <DataTable columns={columns} data={this.state.scores || []} />
      </div>
    )
  }
}