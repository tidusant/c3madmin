// We don't actually do any validation here because
// that's not the point of this demo.
import {GetData, Log} from "../../components/data";
import {encDat2} from "../../components/crypto";
export default (req, res) => {
  console.log('create sex');
  debugger;
  if (req.headers.cookie && req.headers.cookie.includes('sex')) {
    res.status(200);
  } else {
    //create session for current session
    console.log('create sex');
    GetData("CreateSex","",appstate,function(data){
        if(data.status==="1"){
          res.setHeader(
            'Set-Cookie',
            'sex='+encDat2(data.data)+'; Max-Age=1800; SameSite=Strict; HttpOnly; Path=/'
          );
        }else{
          toast.error(data.error, {
            "autoDismiss": false,
            "positionClass": "toast-top-center",
            "type": "error",
          })            
        }
    });
    res.status(401);
  }
  res.end();
};
