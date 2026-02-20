import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next)=>{
        
        try {
            const  token  = req.cookies.token
        if(!token){
            return res.status(401).json({ message: "Unauthorized" })

        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            if(!verifyToken){
                     return res.status(400).json({message: "Not Authorized Login Again, Invalid token"})

            }
            req.adminEmail = process.env.ADMIN_EMAIL
        next();
    } catch (error) {
                return res.status(401).json({ message: "Invalid adminAuth or expired token" });

            }

}
export default adminAuth