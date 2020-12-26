import { encDat2, decDat } from "./crypto";
import Cookies from 'js-cookie'
import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

export async function GetData(requestUrl, params, userstate) {
    //cannot use dispatch in this function
    let rs = { status: 0, error: "", message: "", data: {} }
    let sex = Cookies.get("sex")

    if ((sex === undefined || sex === "") && requestUrl !== "CreateSex") {
        rs.status = -1;
        rs.error = "No session, please reload page."
        if (Router.pathname != "/login") {
            Cookies.set("redirect_login", Router.pathname)
            Router.push("/login")
        }
    } else {
        Log("call: " + requestUrl + " data:" + params + " - " + sex)

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + encDat2(requestUrl, 7), {
                method: 'POST',
                body: "data=" + encDat2(sex + "|" + params, 9),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            const datatext = await res.text();
            
            //get data and decode
            let data = ""
            try {
                data = decDat(datatext);
            }
            catch (ex) {
                console.log("error in first dec:",ex.message)
                    data = decDat(datatext, true);
                
            }
            //parse to json object
            
            let rtdata = {};
            try {
                rtdata = JSON.parse(data)
                if (rtdata.Status !== undefined) rs.status = rtdata.Status;
                if (rtdata.Error !== undefined) rs.error = rtdata.Error;
                if (rtdata.Message !== undefined) rs.message = rtdata.Message;
                if (rtdata.Data !== undefined) rs.data = rtdata.Data;
            } catch (ex) {
                rs.error = ex.message;
            }
        

            //update session if request success

            if (rtdata.Status === 1) {
                if (userstate.token) Cookies.set("sex", encDat2(userstate.token), { expires: 1 / (24 * 2) });
            } else if (rtdata.Status === -1) {

                if (Router.pathname != "/login") {
                    Cookies.set("redirect_login", Router.pathname)
                    Router.push("/login")
                }

            }
        
        } catch (error) {
            rs.error = "Error:" + error.message;
        }
    }
    return Promise.resolve(rs);

}

export function Log(message) {
    if (process.env.NEXT_PUBLIC_DEBUG === "true") {
        console.log(message)
    }
}
export async function checkAuth(login_redirect, userstate) {
    //becarefull to use dispatch here, it's maybe become an fewer hook error
    const dispatch = useDispatch()
    let rs = { status: 0, error: "not auth", message: "", data: {} }
    const sex = Cookies.get('sex');
    var isLogin = false
    
    if (!userstate.name) {
        
        if (sex) {            
            //call request to check auth for this session
            const res = await GetData("aut", "t", userstate)

            //const datatext = await res.();
            console.log("data", res)

            // .then(data=>{                
            if (res.status === 1) {
                isLogin = true;
                rs = res
                try {
                    rs.data = JSON.parse(rs.data)
                    dispatch({
                        type: 'USER',
                        data: rs.data
                    })
                } catch (e) {
                    rs.status = 0;
                    rs.data = {};
                    rs.error = e.message
                }
            }
        }
        //     });
        //}
    }else{
        rs.status=1
        isLogin=true
    }
    if (!isLogin) {
        // dispatch({
        //     type: 'LOGIN_REDIRECT',
        //     data: login_redirect
        //   })
        
        Cookies.set("redirect_login",login_redirect)
        typeof window !== 'undefined' && Router.push("/login");

    }
    return Promise.resolve(rs);

}