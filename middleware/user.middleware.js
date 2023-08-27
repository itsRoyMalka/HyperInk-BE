import jwt from "jsonwebtoken";
import User from "../models/user/User.model.js";

export const verifyUser = async (req, res, next) => {
    try {

        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'JWT missing or invalid format' });
        }

        const token = authorizationHeader.slice(7);

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if (err) {
                throw err;
            }

            const user = await User.findById(data.id);

            if (!user) {
                return res.status(403).send({ message: 'Access Denied' });
            }

            req.user = user;

            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
