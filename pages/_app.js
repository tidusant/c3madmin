import '../styles/global.css'

import '../styles/vendor.css'
import '../styles/blurapp.css'
import { Provider } from "../context";
  
const App = ({ Component, pageProps }) => {
    return <div>
        <Provider>
            <Component {...pageProps} />
        </Provider>
    </div>
  };
  
  
  export default App;