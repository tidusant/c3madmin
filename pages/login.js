import Head from 'next/head'
import styles from '../components/auth.module.css'
import { Context } from "../context";
import {GetData, Log} from "../components/data";
import {encDat2} from "../components/crypto";   

import Cookies from 'js-cookie'
export default function Login() {
    const { appstate, dispatch } = React.useContext(Context);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(true);
  
    console.log(process.env.NEXT_PUBLIC_API_URL);
  //create sex
    GetData("CreateSex","",appstate,function(data){
        if(data.status==="1"){
            Cookies.set("sex",encDat2(data.data),{expires:1/(24*2)});
            dispatch(defaultState)
        }else{
            dispatch({ error: data.error, loading:false, pending: false })
        }
    });
  
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
        console.log(response);
      setAuthenticated(true);
    } else {
      console.error('Login error', response);
    }
  };
  if(isLoading){
      return (
        <div id="preloader">
            <div></div>
        </div>
      )
  }
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
}
export async function getStaticProps(context) {
    // const res = await fetch(`http://localhost:8081`)
    // const data = await res.json()
  
    // if (!data) {
    //   return {
    //     notFound: true,
    //   }
    // }
  
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  