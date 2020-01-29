const fs = require('fs');


const PORT = process.env.PORT || 5000;
let secret = null;
let session_secret = null;
let isProduction = (process.env.DATABASE_URL) ? true: false;

if (isProduction){
    session_secret = process.env.SECRET_SESSION;
}else{
    try{
        secret = JSON.parse(fs.readFileSync('secret.json'));
        session_secret = secret.session.secret;
    }catch(err){
        console.log(err)
        console.log("Unable to connect to db");
    }
  
}


module.exports = {session_secret, PORT, isProduction};