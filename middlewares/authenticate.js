import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = req.header("authorization");
    if (!token) return res.status(401).send("Access denied. No token provided.");

    // const bearerToken = token.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "my_temporary_secret");
        req.data = decoded.data;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
}