import { encDat2, decDat } from "./crypto";
import Cookies from 'js-cookie'
import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
export async function GetData(requestUrl, params, userstate, fn) {
    console.log('getdata');
    let rs = { status: 0, error: "error in request", message: "", data: {} }
    let sex = Cookies.get("sex")

    if ((sex === undefined || sex === "") && requestUrl !== "CreateSex") {
        rs.status = "-2";
        rs.error = "No session, please login again"

    } else {
        Log("call: " + requestUrl + " data:" + params + " - " + sex)
        

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
            try {
                data = decDat(datatext, true);
            }
            catch (ex) {
                rs.error = ex.message;
                fn(rs)
            }
        }
        //parse to json object
        Log("data return:" + data);
        let rtdata = {};
        try {
            rtdata = JSON.parse(data)
            if (rtdata.status !== undefined) rs.status = rtdata.status;
            if (rtdata.error !== undefined) rs.error = rtdata.error;
            if (rtdata.message !== undefined) rs.message = rtdata.message;
            if (rtdata.data !== undefined) rs.data = rtdata.data;
        } catch (ex) {
            rs.error = ex.message;

        }

        //update session if request success
        if (rtdata.status === 1) {
            const statesex=useSelector((state) => state.token)
            if (statesex) Cookies.set("sex", encDat2(statesex), { expires: 1 / (24 * 2) });
        }
    }
    return Promise.resolve(rs);

}

export function Log(message) {
    if (process.env.NEXT_PUBLIC_DEBUG === "true") {
        console.log(message)
    }
}
export function isAuth() {
    const sex = Cookies.get('sex');
    //check login
    let isLogin = false;
    if (sex) {
        //call api to check session is loggedin

    }
    if ((!isLogin)) {
        typeof window !== 'undefined' && Router.push("/login");
        return false;
    }
    return true;

}