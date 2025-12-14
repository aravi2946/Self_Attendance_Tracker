import jwt from "jsonwebtoken"


const authMiddleware = async (req, res, next) => {
    const token = req.headers.token
    if (!token) return res.json({ msg: "Please Login to Continue" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role
        }



        next();

    } catch (err) {
        console.log("Error in authMiddleware", err);
        res.status(500).json({ success: false, msg: "Internal server error" })

    }

}

export default authMiddleware;