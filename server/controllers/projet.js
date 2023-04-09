import project from '../modals/projet.js';
import contributor from "../modals/contributor.js";


export async function addProject(req, res) {

     try {
          let pro = new project({
               user: req.body.userId,
               name: req.body.name,
               releaseType: req.body.releaseType,
               opSystem: req.body.opSystem,
               platform: req.body.platform,
               contributors: req.body.userId,
          });
          await pro.save();

          const cont = new contributor({ user: pro.user, role: 'Maintainer', projects: pro._id });
          await cont.save();




          res.status(201).send({ message: 'Data saved successfully!' });
     } catch (error) {
          console.error(error);
          res.status(500).send({ message: 'Internal server error' });
     }
}



//Get Projects by User mongoose.Types.ObjectId(user)
export async function getUserPojects(req, res) {
     try {

          const projects = await project.find({ user: req.params.user });
          res.json(projects)
     } catch (err) {
          res.status(500).send(err);

     }

}


//Get User Role by project
export function getUserRole(req, res) {

     contributor.findOne({ project: req.params.project, user: req.params.user }, (err, contributor) => {
          if (err) {
               console.log(err);
               res.status(500).send('Internal server error');
               return;
          }

          if (!contributor) {
               res.status(404).send('Contributor not found');
               return;
          }

          res.send(contributor.role);
     });
}



//Get Project Details ById 
export async function afficherDetailsProjet(req,res) {
     
     try {
          const projectId = req.params._id;
         const Project = await project.findById(projectId)
             .populate('user') 
             .populate('contributors') 
             .populate('name') 
             .populate('releaseType') 
             .populate('opSystem') 
             .populate('platform') 
           
         console.log(Project);
     } catch (err) {
         console.error(err);
     }
 }


// Delete project

export function deleteProject(req, res) {
     const projectId = req.params._id;
     project.findOneAndDelete(projectId).then((docs) => {
          res.status(200).send("Project deleted");
     })
          .catch((err) => {
               res.status(500).json({ error: err });
          });
}

//Update Project

export function updateProject(req, res) {
     const projectId = req.params._id

     const updatedProject = {
          name: req.body.name,
          releaseType: req.body.releaseType,
     };
     project.updateOne({ _id: projectId }, updatedProject).then(
          () => {
               res.status(201).json({
                    message: 'Project updated successfully!'
               });
          }
     ).catch(
          (error) => {
               res.status(400).json({
                    error: error
               });
          }
     );
};






