import user from '../modals/user.js';
import project from  '../modals/projet.js'
import contributor from '../modals/contributor.js';
export async function addContributorToProject(req, res){

// Find the user to be added as a contributor

const {Project} = req.params;
const pp = await project.findOne({ Project});

const { email,role} = req.body;
const userToAdd = await user.findOne({ email});

// Check if the user is already a contributor to the project
const existingContributor = await contributor.findOne({
  user: userToAdd._id,
  projects: { $in: [pp._id] },
});

if (existingContributor) {
  console.log('User is already a contributor to the project');
} else {
  // Create a new contributor for the user and add them to the project's list of contributors
  const newContributor = new contributor({
    role: role,
    user: userToAdd._id,
    projects: [pp._id],
  });
  await newContributor.save();
  pp.contributors.push(newContributor._id);
  await pp.save();

  console.log('User added as a contributor to the project');
}
}

//////////////////////////////////////////////////////////


export async function addProject(req, res) {

    try {
         let pro = new project({
              user: req.body.userId,
              name: req.body.name,
              releaseType: req.body.releaseType,
              opSystem: req.body.opSystem,
              platform: req.body.platform,
              contributors : req.body.userId,
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


//////////////////////////////////////////////////////////

export async function DeleteContributor(req,res) {
  const projectId = req.params._id1; 
  const contributorId = req.params._id2;
   const deleterContributorId = req.params._id3;
  // Get the project
  const Project = await project.findById(projectId);

  // Get the contributor who is deleting and check if they are a maintainer
  const deleterContributor = await contributor.findById(deleterContributorId);
  const isDeleterMaintainer = deleterContributor.role === 'Maintainer';

  // If the deleter is not a maintainer, throw an error
  if (!isDeleterMaintainer) {
    throw new Error('Only Maintainers can remove contributors from a project');
  }

  // Get the contributor to be deleted
  const Contributor = await contributor.findById(contributorId);

  // Remove the contributor from the project
  await contributor.findByIdAndDelete(contributorId);

  // Remove the project reference from the contributor
  await contributor.findByIdAndUpdate(contributorId, {
    $pull: { projects: projectId },
  });

  // Remove the contributor reference from the project
  await project.findByIdAndUpdate(projectId, {
    $pull: { contributors: contributorId },
  });
};