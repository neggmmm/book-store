const { verifyToken } = require("../utils/generateToken");

const requiredAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Missing or invalid access token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;  // now contains { userId, username, email, role }
    next();
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

module.exports = { requiredAuth };