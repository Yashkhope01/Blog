import multer from 'multer';
import path from 'path';


const storage = multer.memoryStorage();

// File Type Check 
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only! (jpeg, jpg, png, gif, webp)');
    }
};

// --- Multer Upload Config ---
export const upload = multer({
    storage: storage,     //  Memory storage instead of disk
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
