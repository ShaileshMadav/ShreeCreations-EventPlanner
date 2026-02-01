import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos allowed"), false);
  }
};

export const upload = multer({
  storage: multer.memoryStorage(), // ✅ IMPORTANT
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB safety limit
  },
});
