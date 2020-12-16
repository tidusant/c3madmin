import Head from 'next/head'
import styles from '../components/auth.module.css'

import { GetData, Log } from "../components/data";
import { encDat2, decDat } from "../components/crypto";

import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
export default function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isRender, setRender] = React.useState(false);//flag to check page is already rendered

  //check render to make sure this code run only one
  if (!isRender) {
    setRender(true);
    
    //create sex
    GetData("CreateSex", "")
    .then(data=>{
      if (data.status === "1") {
        Cookies.set("sex", encDat2(data.data), { expires: 1 / (24 * 2) }); 
        dispatch({
          type: 'SEX',
          data: data.data
        })
        //dispatch(...appstate,{})    
      } else {        
        setErrorMessage(data.error);        
        //dispatch({ error: data.error, loading: false, pending: false })
      }
      setLoading(false);
    });
  }

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);
    GetData("aut", "")
    .then(data=>{
      if (data.status === "1") {
        Cookies.set("sex", encDat2(data.data), { expires: 1 / (24 * 2) });        
      } else {        
        setErrorMessage(data.error);        
        //dispatch({ error: data.error, loading: false, pending: false })
      }
      setLoading(false);
    });
  };
  if (isLoading) {
    return (
      <div id="preloader">
        <div></div>
      </div>
    )
  }
  return (
    <div className={styles.auth_main}>
      <Head>
        <title>C3M - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.auth_block + " align-middle"}>
        <h1>Colis Admin 2 </h1>


        <form className="form-horizontal" onSubmit={submitHandler}>
          <div className="form-group">
            <div className="col-sm-12">

              {errorMessage !== "" &&
                <div className="flex items-center m-1 font-medium py-1 px-2 rounded-md text-red-400 ">
                  <div slot="avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-octagon w-5 h-5 mx-2">
                      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div className="text-xl font-normal  max-w-full flex-initial">
                    {errorMessage}</div>

                </div>
              }

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

  )
}