
import Head from 'next/head'
import Layout from '../components/layout'
import Loading from '../components/loading'
import { checkAuth } from '../components/data'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { GetData, Log } from "../components/data";
import { toast } from "react-toastify";
import titleize from "titleize"
import humanizeString from "humanize-string"
export default function Pages() {
  const userstate = useSelector((state) => state)
  const [state, setState] = useState({
    isRender: false,
    isLoading: false,
    nextAction: "get", 
    
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
          GetData("page", `la`, userstate).then(rs => {
            if (rs.status === 1) {
              try {
                const data = JSON.parse(rs.data)
                setState({ ...state, isLoading: false, nextAction: "", Pages:data })
              } catch (e) {
                toast.error(e.message)
              }
            } else {
              toast.error(rs.error)
              setState({ ...state, isLoading: false, nextAction: "" })
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
                setState({ ...state, isLoading: false, nextAction: "" })
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
      {state.Pages &&
        <div className="row">
          
          <div className="col-md-12 col-sm-12">
            <div className="panel with-scroll animated zoomIn">
              <div className="panel-heading clearfix">
                <h3 className="panel-title">Select Page</h3>
              </div>
              <div className="panel-body text-center">
                <div className="ng-scope">
                  {state.Pages.length > 0 && state.Pages.map((item) =>
                  <span key={item.ID}>
                  {item.ID==state.selectedPageId&&
                    <button  type="button" className="btn btn-info btn-lg disabled">{titleize(humanizeString(item.Code))}</button>
                  }
                  {item.ID!=state.selectedPageId&&
                    <button  type="button" onClick={() => setState({ ...state, nextAction: "change", isLoading: true, payload: { shopid: item.ID } })} className="btn btn-default btn-lg margin-left margin-right">
                      {titleize(humanizeString(item.Code))}
                    </button>
                  }
                  </span>
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

