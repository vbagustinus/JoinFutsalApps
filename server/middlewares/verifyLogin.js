var jwt = require('jsonwebtoken');
const short = require('../middlewares/shortUrl')
let isLogin = (req, res, next) =>{
  console.log('masuk');
short('www.google.com')
  console.log('INI VALIDASI',req)
  // let token = req.headers.token
  // // verify a token symmetric
  // console.log(token)
  // jwt.verify(token, 'estehpurun', function(err, decoded) {
  //   if(!err){
  //     req.decoded = decoded
  //     next()
  //   } else {
  //     console.log(err)
  //   }
  // });
}

module.exports = {
  isLogin
}
