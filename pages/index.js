
import Head from 'next/head'
import Layout from '../components/layout'
import { isAuth } from '../components/data'
import useStore from '../store' 
export default function Home() {


  if (isAuth())
    return (
      <Layout>

        <Head>
          <title>C3M - Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="al-main">
          <div className="al-content">

            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="panel with-scroll animated zoomIn">
                  <div className="panel-heading clearfix">
                    <h3 className="panel-title ">Current Site</h3>
                  </div>
                  <div className="panel-body text-center">

                    <button type="button" className="btn btn-info btn-lg disabled">currentShop</button>


                  </div>
                </div>
              </div>

              <div className="col-md-12 col-sm-12">
                <div className="panel with-scroll animated zoomIn">
                  <div className="panel-heading clearfix">
                    <h3 className="panel-title">Select Site</h3>
                  </div>
                  <div className="panel-body text-center">
                    <div className="ng-scope">

                      <button type="button" className="btn btn-default btn-lg margin-left margin-right">
                        shop.Name
                                    </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </Layout>
    )

    
  return (<> </>)
}
export async function getInitialProps(context) {
  console.log(context);
  return {
    props: {}, // will be passed to the page component as props
  }
}
