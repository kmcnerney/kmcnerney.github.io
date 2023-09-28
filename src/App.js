import './App.css'
import axios from 'axios'
import React from 'react'

const HOMEPAGE = 'https://guillotine.football'
const YAHOO_CLIENT_ID = 'dj0yJmk9NGVBekNWbUplUndJJmQ9WVdrOWNYTldWakZUWlhRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTJk'
const YAHOO_CLIENT_SECRET = '67ff91fb2b422cd6fe3a947fe4dadb4ace874b2b'
const CORS_PROXY_URL = 'https://corsproxy.io'
const YAHOO_API_HOST = 'https://api.login.yahoo.com'

async function yahooLogin(code) {
  console.log(`authing with yahoo using code: ${code}`)

  try {
    const token = await axios.post(`${CORS_PROXY_URL}?${YAHOO_API_HOST}/oauth2/get_token`, 
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: HOMEPAGE,
        client_id: YAHOO_CLIENT_ID,
        client_secret: YAHOO_CLIENT_SECRET
      },
      {headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })

    console.log(`yahoo auth succeeded and got token`, token)
    return token
  } catch (e) {
    console.error('Failed Yahoo login', e)
  }

}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yahooApiToken: window.sessionStorage.getItem('yahoo_api_token')
    };
  }

  async componentDidMount() {
    console.log('in App.componentDidMount', this.state)
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const yahooAuthRequestCode = params.get('code')
    if (this.state.yahooApiToken) {
      console.log('already logged into yahoo')
      return
    }
    if (yahooAuthRequestCode) {
      const authResponse = await yahooLogin(yahooAuthRequestCode)
      const token = authResponse?.data?.access_token 
      window.sessionStorage.setItem('yahoo_api_token', token)
      this.setState({
        yahooApiToken: token
      })
    }
  }

  render() {
    console.log('in App.render', this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={'https://i.insider.com/651146b1e2c0220019ef3ba5?width=500'} alt='TayTay' />
          <p>
            Welcome to the Guillotine League
          </p>
          <h1>
            <a href={`${YAHOO_API_HOST}/oauth2/request_auth?client_id=${YAHOO_CLIENT_ID}&redirect_uri=${HOMEPAGE}&response_type=code`}>
              Login here
            </a>
          </h1>
        </header>
      </div>
    )
  }
}