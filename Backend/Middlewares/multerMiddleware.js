// middlewares/multerMiddleware.js
import multer from "multer";
const storage = multer.memoryStorage(); // keeps file in RAM

const upload = multer({ storage });
export default upload;
