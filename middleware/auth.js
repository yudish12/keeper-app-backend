import jwt from 'jsonwebtoken';

const auth = (req,res,next)=>{
     const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1];
     if(token==null){
          return res.sendStatus(401);
     }
     jwt.verify(token,'secret123',(err,user)=>{
          if(err) return res.sendStatus(403);
          req.user = user.username;
          next();
     }) 
}
export default auth;