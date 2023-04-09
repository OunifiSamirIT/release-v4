import { addProject, deleteProject, getUserPojects, getUserRole} from "../controllers/project.controller.js";
import  express  from "express";
import multer from '../middlewares/multer-config.js';
import { body } from 'express-validator';



const router = express.Router();



router
.route('/addProject')
    .post(
        body('name'),
        body('releaseType'),
        body('opSystem'),
        body('platform'),
        addProject);





 router.route('/myProjects/:user')
        .get(getUserPojects)


 router.route('/myRole/:project/:user')
        .get(getUserRole)


 router.route('/deleteProject/:_id')
        .delete(deleteProject)        

export default router