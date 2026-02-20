import User from "../model/userModel.js"

export const getCurrentUser = async(req,res)=>{
    try {
        let user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(404).json({message: "user is not found"})
        }
return res.status(200).json({
  success: true,
  user
});
    } catch (error) {
         {
    console.log( error );
    
    return res.status(500).json({ message: `Invalid or getCurrentUser error${error}` })
  }
    }
}

export const getAdmin = async (req, res)=>{
    try {
        let adminEmail = req.adminEmail
        if(!adminEmail){
              return res.status(401).json({message: "Admin is not found"})

        }
                return res.status(200).json({email: adminEmail, role:"admin"})

    } catch (error) {
            return res.status(500).json({ message: `Invalid or getAdmin error${error}` })

    }
}


