import project from '../models/project.model.js';
import contributor from "../models/contributor.model.js"


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


// Delete project

export function deleteProject(req,res) {

     project.findOneAndDelete({_id :project.params._id})
}



