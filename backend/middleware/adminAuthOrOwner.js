const { verifyToken } = require("../utils/generateToken");
const BookModel = require("../model/book.model");

exports.adminAuthOrOwner = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "Missing or invalid access token" });
    }

    const token = authHeader.split(" ")[1];
    const result = await verifyToken(token);

    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }

    // Safely determine ownership/admin access without throwing if createdBy is missing
    const isOwner = book.createdBy && result.userId === String(book.createdBy);
    const isAdmin = result.role === "admin";

    if (isOwner || isAdmin) {
      req.currentUser = { id: result.userId, role: result.role };
      return next();
    } else {
      return res.status(403).send({ error: "Access denied!" });
    }
  } catch (err) {
    return res.status(401).send({ error: err.message });
  }
};
