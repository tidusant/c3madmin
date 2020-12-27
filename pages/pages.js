
import Head from 'next/head'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { checkAuth } from '../components/data'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { GetData, Log } from "../components/data";
import { toast } from "react-toastify";
export default function Pages() {
  const userstate = useSelector((state) => state)
  const [state, setState] = useState({
    isRender: false,
    isLoading: false,
    nextAction: "get",
    currentPage: 1,
    allTotal: 0,
    selectedStatus: "all",
    payload: {}
  })
  //alway check auth before render
  checkAuth("/", JSON.parse(JSON.stringify(userstate)))

  //=========== event handler:



  //=========================


  if (userstate.name) {

    //====== all the run once logic code should go here
    if (!state.isRender) {
      setState({ ...state, isRender: true, isLoading: true })

    }
    //=============================

    //=============other normal function here
    //check the page action, this will loop until page action is empty or error return
    //and this is run only when isLoading=true
    console.log(state);

    if (state.isLoading) {
      switch (state.nextAction) {
        case "get":
          GetData("shop", `lsi`, userstate).then(rs => {
            if (rs.status === 1) {
              try {
                const data = JSON.parse(rs.data)
                setState({ ...state, isLoading: false, nextAction: "", ...data })
              } catch (e) {
                toast.error(e.message)
              }
            } else {
              toast.error(rs.error)
            }
          })
          break;
        case "change":
          GetData("shop", `cs|${state.payload.shopid}`, userstate)
            .then(rs => {
              if (rs.status === 1) {
                try {
                  const rsdata = JSON.parse(rs.data)
                  setState({ ...state, isLoading: false, nextAction: "", ...rsdata })
                } catch (e) {
                  toast.error(e.message)
                }
              } else {
                toast.error(rs.error)
              }

            });
          break;

        default: setState({ ...state, nextAction: "", isLoading: false });
      }
    }
  }
  //=============

  return (
    <Layout>

      <Head>
        <title>C3M - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state.isLoading && <Loading />}
      {state.Shop &&
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="panel with-scroll animated zoomIn">
              <div className="panel-heading clearfix">
                <h3 className="panel-title ">Current Site</h3>
              </div>
              <div className="panel-body text-center">

                <button type="button" className="btn btn-info btn-lg disabled">{state.Shop.Name}</button>


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
                  {state.Others.length > 0 && state.Others.map((shop) =>
                    <button key={shop.ID} type="button" onClick={() => setState({ ...state, nextAction: "change", isLoading: true, payload: { shopid: shop.ID } })} className="btn btn-default btn-lg margin-left margin-right">
                      {shop.Name}
                    </button>
                  )}


                </div>
              </div>
            </div>
          </div>
        </div>
      }
      
    </Layout>
  )


}

