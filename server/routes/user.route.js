import  express  from "express";
import { body } from "express-validator";
import {   register,logIn,updateUserRole} from "../controllers/user.js";
import Users from "../modals/user.js";
import user from "../modals/user.js";
import {sendemail} from "../middlewares/emailinvitation.js";
import { addProject,addContributorToProject,DeleteContributor} from "../controllers/contributor.js";

import multer from 'multer';
import { deleteProject, getUserPojects, getUserRole,afficherDetailsProjet, updateProject } from "../controllers/projet.js";

const router = express.Router();


/////////////////////////////////User
 router.route('/register').post(
    body('username').isLength({ min: 3}),
    body('email').isEmail(),
    body('password').isLength({ min: 3}),
    register); 

    router.route('/login').post(logIn);
        
 ////////////////////////////////////////////
    router.route('/project/addProject/').post(
        body('user'),
        body('name'),
        body('releaseType'),
        body('opSystem'),
        body('platform'),
        body('contributors'),addProject); 

       router.route('/addcontributortoproject/:Project').post(
        body('email'),
        body('role'),
        addContributorToProject)

  router.route('/emailinvitation/:Project').post(sendemail);
  router.route('/updateuserrole').put(updateUserRole);

  ////////////////////////////////////

router.route('/project/myProjects/:user')
        .get(getUserPojects)


router.route('/project/myRole/:project/:user')
        .get(getUserRole)


 router.route('/project/deleteProject/:_id')
        .delete(deleteProject)  

router.route('/project/updateProject/:_id')
        .put(updateProject)  

router.route('/afficherDetailsProjet/:_id')
        .get(afficherDetailsProjet)   

router.route('/DeleteContributor/:_id1/:_id2/:_id3')
        .delete(DeleteContributor)    
export default router;
