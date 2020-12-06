import {encDat2,decDat} from "./crypto";

export function GetData(requestUrl,data,userstate,fn){

    let rs={status:0,error:"error in request",message:"",data:{}}
    let sex= Cookies.get("sex")

    if((sex===undefined||sex==="")&&requestUrl!=="CreateSex"){
        rs.status="-2";
        rs.error="No session, please login again"
        fn(rs)
        return
    }
    Log("call: "+requestUrl+" data:"+data+" - "+sex)
    fetch(process.env.REACT_APP_API_URL+encDat2(requestUrl,7),{
        method: 'POST',
        body: "data="+encDat2(sex+"|"+data,9),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.text())
        .then((result) => {
                //get data and decode
                let data=""
                try{
                    data=decDat(result);
                }
                catch(ex){
                    try{
                        data=decDat(result,true);
                    }
                    catch(ex){
                        rs.error=ex
                        fn(rs)
                    }
                }
                //parse to json object
                Log("data return:"+data);
            let rtdata={};
            try{
                rtdata=JSON.parse(data)
                if (rtdata.status!==undefined)rs.status=rtdata;
                if (rtdata.error!==undefined)rs.error=rtdata.error;
                if (rtdata.message!==undefined)rs.message=rtdata.message;
                if (rtdata.data!==undefined)rs.data=rtdata.data;
            }catch(ex){
                rs.error=ex.message;
                fn(rs)
            }

                //update session if request success
                if(rtdata.status===1){
                    if(userstate.sex)Cookies.set("sex",encDat2(userstate.sex),{expires:1/(24*2)});
                }
                fn(rtdata)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                rs.error=error.message;
                fn(rs)
        });
    return rs
}

export function Log(message){
    if(process.env.REACT_APP_DEBUG==="true"){
        console.log(message)
    }
}