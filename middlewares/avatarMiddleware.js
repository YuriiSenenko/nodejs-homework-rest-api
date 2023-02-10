const multer = require("multer");
const path = require("path");

const tmpPath = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, tmpPath);
  },
  filename: (req, file, cd) => {
    const [name, extention] = file.originalname.split(".");
    cd(null, `${name}.${extention}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
