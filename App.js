import './App.css';
import axios from 'axios';

async function yahooLogin(code) {
  console.log(`authing with yahoo using code: ${code}`)

  try {
    const proxyurl = 'https://corsproxy.io/?'
    const token = await axios.post(proxyurl + 'https://api.login.yahoo.com/oauth2/get_token', 
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://kmcnerney.github.io/fantasy-football',
        client_id: 'dj0yJmk9NGVBekNWbUplUndJJmQ9WVdrOWNYTldWakZUWlhRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTJk',
        client_secret: '67ff91fb2b422cd6fe3a947fe4dadb4ace874b2b'
      },
      {headers: {'content-type': 'application/x-www-form-urlencoded'}}
    )

    console.log(`yahoo auth succeeded and got token`, token)
    return token
  } catch (e) {
    console.error('Failed Yahoo login', e)
  }

}

function App() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const yahoo_code = params.get('code');

  if (yahoo_code) {
    yahooLogin(yahoo_code);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://i.insider.com/651146b1e2c0220019ef3ba5?width=500'} alt='TayTay' />
        <p>
          Welcome to the Guillotine League
        </p>
        <h1>
          <a href={'https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9NGVBekNWbUplUndJJmQ9WVdrOWNYTldWakZUWlhRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTJk&redirect_uri=https://guillotine.football&response_type=code'}>
            Login here
          </a>
        </h1>
      </header>
    </div>
  );
}

export default App;
