
import Head from 'next/head'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { checkAuth } from '../components/data'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { GetData, Log } from "../components/data";
import { toast } from "react-toastify";
export default function Home() {
  const userstate = useSelector((state) => state)
  const [isRender, setRender] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState({})
  //alway check auth before render
  checkAuth("/", JSON.parse(JSON.stringify(userstate)))

  //=========== event handler:
  const changeShop = async shopid => {
    
    setLoading(true);
    GetData("shop", "cs|" + shopid, userstate)
      .then(rs => {
        if (rs.status === 1) {
          try {
            const rsdata = JSON.parse(rs.data)
            setData(rsdata)
          } catch (e) {
            toast.error(e.message)
          }
        } else {
          toast.error(rs.error)
        }
        setLoading(false);
      });
  };


  //=========================


  if (userstate.name) {
    //====== all the run once logic code should go here
    if (!isRender) {
      setRender(true)
      //get list of shop
      setLoading(true)
      GetData("shop", "lsi", userstate).then(rs => {

        if (rs.status === 1) {
          try {
            const data = JSON.parse(rs.data)
            console.log(data)
            setData(data)
          } catch (e) {
            toast.error(e.message)
          }
        } else {
          toast.error(rs.error)
        }
        setLoading(false)

      })
    }
    //=============

    return (
      <Layout>

        <Head>
          <title>C3M - Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

            {!isLoading && data.Shop &&
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="panel with-scroll animated zoomIn">
                    <div className="panel-heading clearfix">
                      <h3 className="panel-title ">Current Site</h3>
                    </div>
                    <div className="panel-body text-center">

                      <button type="button" className="btn btn-info btn-lg disabled">{data.Shop.Name}</button>


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
                        {data.Others.length > 0 && data.Others.map((shop) =>
                          <button key={shop.ID} type="button" onClick={() => changeShop(shop.ID)} className="btn btn-default btn-lg margin-left margin-right">
                            {shop.Name}
                          </button>
                        )}


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {isLoading &&<Loading />}
      </Layout>
    )
  }
  return (<Loading />)
}

