import jwt from 'jsonwebtoken';

export const generateJWT = (uid="",username='')=>{
    return new Promise((resolve, reject) => {
        const payload = { uid , username}
        jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
                expiresIn: '8h'
            },
            (err, token)=>{
                err ? (console.log(err),reject('we have a proble to generate the token')) : resolve(token)
            }
        )
    })
}