//**********verifica data_token
const jwt = require('jsonwebtoken')

let verificaToken = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        err
      })
    }
    req.id = decoded.id;
    req.nivel = decoded.nivel;
  })

  next();
}


module.exports = {
  verificaToken
}