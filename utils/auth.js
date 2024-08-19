const jwt = require('jsonwebtoken');
const userModel = require('../model/model')
const authorization = async(req,res,next) => 
{
    try{
    const getToken = req.headers.token;
    
const verification = jwt.verify(getToken,process.env.JWT_KEY);
if(verification)
{
    const checkEmail = await userModel.findOne({Email : verification.Email})
    if(checkEmail)
    {
        req.user = checkEmail;
        return next();
    }
    return res.send({message : 'tokem invalid!!!!!!!!'})
}

return res.send({message : 'token not found please login!!!!!!!'})

    }
    catch(err)
    {
        res.send({message : 'enter a token please or give a token in object form by giving key as (token) '})
    }
}

module.exports = authorization;