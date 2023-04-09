import React from 'react';
import { NavLink } from 'react-router-dom';
import NewProjectModal from './NewProjectModal';
import ProjectsList from './ProjectsList';

const Dashboard = () => {
    return (
        <div>
            <div className="container-fluid mb-5">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                
                
               
                
                
                
              </ul>

              
              <ul className="nav flex-column mb-2">
                
               
                
               
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div className=""></div>
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div className=""></div>
              </div>
            </div>
           

            <h2>Projects Section</h2>
            <ProjectsList/>
            <NewProjectModal/>
          </main>
        </div>
      </div>
        </div>
    );
}

export default Dashboard;
