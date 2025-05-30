import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp"); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.originalname); // Specify the file name format
    },
})

export const upload = multer({
    storage,
}) // Specify the field name for the file in the form data