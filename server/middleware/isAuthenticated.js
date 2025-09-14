import jwt from 'jsonwebtoken';

const isAthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message:'Unauthorized',
                success:false
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).json({
                message:'Unauthorized, Invalid Token',
                success:false
            })
        }
        req.id = decode.userId;
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Unauthorized, error!'})
    }
}

export default isAthenticated;