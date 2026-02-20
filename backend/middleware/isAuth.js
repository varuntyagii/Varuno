import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" })
    }
    req.userId = decoded.userId
    next()

  } catch (error) {
    console.log("isAuth error");

    return res.status(500).json({ message: `Invalid or expired token ${error}` })
  }
}

export default isAuth
