import multer, { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";


 export default multer({
    storage: diskStorage({
        destination:(req,file, callback) =>{
            const _dirname = dirname(fileURLToPath(import.meta.url));
            callback(null,join(_dirname),'public');
        },
    filename: (req,file, callback) => {
        callback(null, file.originalname);
    } ,   
    }),
 fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|JPG|PNG|JPEG)$/)) {
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
 }).single("image");