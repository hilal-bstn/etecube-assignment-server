const Jwt = require('jsonwebtoken');
const { request } = require('express');
const jwtKey = "process-management";

function verifyToken(req,resp,next){
  let token = req.headers['authorization'];
  if(token)
  { 
      token = token.split(' ')[1];
      Jwt.verify(token, jwtKey,(err,valid)=>{
              if(err)
              {
                  return resp.status(401).send({result:"please privade valid token"})
              }
              else
              {
                  next();
              }
      }); 
  }
  else
  {
      return resp.status(200).send({result:"please add token with header"})
  }
}

module.exports = verifyToken;