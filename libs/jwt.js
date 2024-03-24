import jwt from 'jsonwebtoken'

export function createAccessToken(payload){
    return new Promise((resolve, reject) =>{

        const {id, uid} = payload;

        jwt.sign(
            {id, uid},
            process.env.TOKEN_SECRET,
        {
            expiresIn: "1d"
        }, 
            (err, token) =>{
                if(err) reject(err);
                resolve(token);
            }
        )

    })
}
