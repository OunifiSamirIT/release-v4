import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import UpdateProjectModal from './UpdateProjectModal ';
import NewProjectModal from './NewProjectModal';

export default function ProjectsList() {
    // Fetch User projects
    const userId = localStorage.getItem("idfromtoken");
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);

    const handleDeleteChange = async (event3) => {
        event3.preventDefault();
        const response7 = fetch(`/project/deleteProject/${handleRowClick()}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    };
    const handleAddId = (id) => {
        setIds((prevIds) => [...prevIds, id]);
    }; useEffect(() => {
        axios.get(`http://localhost:9090/project/myProjects/${userId}`)
            .then(res => {
                console.log(res);
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })



    //fetch User Role 


    /*const [role, setRole] = useState([]);
    
        useEffect(() => {
            axios.get(`http://127.0.0.1:9090/project/myRole/63ffb6dcb63179ea4458f112/63ff20b3f5330d6b2cb16d55`)
            .then(res => {
                console.log(res);
                setRole(res.role)
            })
            .catch( err => {
                console.log(err)
            })
        })*/
    function handleRowClick(id) {
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        return id
    }


    return (
        <div>
            <NewProjectModal />

            <table className="table table-hover" style={{ border: "2px solid blue"}}>
                <thead>
                    <tr className='table-info'>
                        <th scope="col"></th>
                        <th scope="col">App Name</th>
                        <th scope="col">OS</th>
                        <th scope="col">Platform</th>
                        <th scope="col">Role</th>
                        <th scope="col">Options</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} >
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.opSystem}</td>
                            <td>{item.platform}</td>
                            <td>Mantainer</td>
                            <td>
                                <div style={{
                                    display: 'flex',
                                    justifycontent: 'row'
                                }}>
                                    <button onClick={() => handleRowClick(item._id)} style
                                        ={{ border: 'none', outline: 'none' }} class="btn btn-light w-30 rounded-pill"> <UpdateProjectModal />   </button>
                                    <button type="button" class="btn btn-danger  w-30 rounded-pill" onClick={(event) => {
                                        handleRowClick(item._id); handleDeleteChange(event);
                                    }}>Delete</button>
                                    <button type="button" class="btn btn-primary rounded-pill" onClick={() => handleRowClick(item._id)} ><NavLink className="nav-link" to="/invitation">Invite</NavLink></button>

                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div >
    );


}