import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    const token = req.params.token

    if(!token) return res.status(401).json({
        message: 'no exist token, autorization denied'
    })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(403).json({
            message: 'invalid token '
        })

        req.user = user

        next()
    })
}