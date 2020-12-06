import Head from 'next/head'
import styles from '../components/auth.module.css'
import withoutAuth from '../hocs/withoutAuth';
import { useAuth } from '../providers/Auth';

export default withoutAuth(function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setAuthenticated } = useAuth();
  const submitHandler = async event => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({ username, password })
    });
    if (response.status === 200) {
      setAuthenticated(true);
    } else {
      console.error('Login error', response);
    }
  };
  return (
    <>
      <Head>
        <title>C3M - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.auth_main}>
        <div className={styles.auth_block+" align-middle"}>
            <h1>Colis Admin</h1>
            

            <form className="form-horizontal" onSubmit={submitHandler}>
                <div className="form-group">
                    <div className="col-sm-12">
                        <span className="help-block error-block basic-block text-center"></span>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="text" className="form-control" id="username" placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input type="password" className="form-control" id="password" placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="text-center">
                        <button type="submit" className="btn btn-default btn-auth">Sign in</button>                        
                    </div>
                </div>
            </form>

            
        </div>
        </div>
     </>
  )
})
