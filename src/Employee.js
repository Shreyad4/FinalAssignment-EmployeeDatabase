import React, { Component } from "react";
import { Link } from "react-router-dom";

import { variables } from "./Variables.js";

export class Employee extends Component {
  

    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            modalTitle: "",
            EmployeeID: 0,
            Name: "",
            Band: "",
            Role: "",
            Designation: "",
            Responsibilities: "",


            DesignationFilter: "",
            DesignationsWithoutFilter:[]


        }
    }

    FilterFn() {
        var DesignationFilter = this.state.DesignationFilter;

        var filteredData = this.state.DesignationsWithoutFilter.filter(
            function (el) {
                return el.Designation.toString().toLowerCase().includes(
                    DesignationFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({ employees: filteredData });
    }

    changeDesignationFilter = (e) => {
        this.state.DesignationFilter = e.target.value;
        this.FilterFn();
    }

   
    refreshList() {
        fetch(variables.API_URL + 'employee')
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data, DesignationsWithoutFilter:data});
            });
    }
    componentDidMount() {
        this.refreshList();
    }
    changeName = (e) => {
        this.setState({ Name: e.target.value });
    }
    changeBand = (e) => {
        this.setState({ Band: e.target.value });
    }
    changeRole = (e) => {
        this.setState({ Role: e.target.value });
    }
    changeDesignation = (e) => {
        this.setState({ Designation: e.target.value });
    }
    changeResponsibilities = (e) => {
        this.setState({ Responsibilities: e.target.value });
    }
    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            EmployeeID: 0,
            Name: "",
            Band: "",
            Role: "",
            Designation: "",
            Responsibilities: ""
        });
    }

    editClick(emp) {
        this.setState({
            modalTitle: "Edit Employee",
            EmployeeID: emp.EmployeeID,
            Name: emp.Name,
            Band: emp.Band,
            Role: emp.Role,
            Designation: emp.Designation,
            Responsibilities: emp.Responsibilities
        });
    }
   

    updateClick() {
        fetch(variables.API_URL + 'employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: this.state.EmployeeID,
                Name: this.state.Name,
                Band: this.state.Band,
                Role: this.state.Role,
                Designation: this.state.Designation,
                Responsibilities: this.state.Responsibilities
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            

            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure??')) {
            fetch(variables.API_URL + 'employee/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }


    render() {
        const {
            employees,
            modalTitle,
            EmployeeID,
            Name,
            Band,
            Role,
            Designation,
            Responsibilities

        } = this.state;
  
       
        return (
            <div className="container" style={{textAlign:"right"}}>

                             <input className="form control m-2"
                             style={{"width":"25%","margin":"20px",
                            "borderColor":"black"}}
                             
                             onChange={this.changeDesignationFilter}
                                placeholder="Filter.."/>
                                
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>
                                EmployeeID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Band
                            </th>
                            <th>
                                Role  
                            </th>
                            <th>
                           
                                Designation
                            </th>
                            <th>
                                Responsibilities
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map(emp =>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.Name}</td>
                                <td>{emp.Band}</td>
                                <td>{emp.Role}</td>
                                <td>{emp.Designation}</td>
                                <td>{emp.Responsibilities}</td>

                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        style={{"margin":"5px"}}
                                        onClick={() => this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>

                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(emp.EmployeeID)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>

                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Name</span>
                                    <input type="text" className="form-control"
                                        value={Name}
                                        onChange={this.changeName} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Band</span>
                                    <input type="text" className="form-control"
                                        value={Band}
                                        onChange={this.changeBand} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Role</span>
                                    <input type="text" className="form-control"
                                        value={Role}
                                        onChange={this.changeRole} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Designation</span>
                                    <input type="text" className="form-control"
                                        value={Designation}
                                        onChange={this.changeDesignation} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Responsibilities</span>
                                    <input type="text" className="form-control"
                                        value={Responsibilities}
                                        onChange={this.changeResponsibilities} />
                                </div>

                                {EmployeeID !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update
                                    </button>
                                    : null}


                            </div>

                        </div>
                    </div>
                </div>
                <div className="divbtn" >
                <Link to="employee/create" className="btn btn-primary float-start"
                >
                    Add Employee
                </Link>
                </div>


            </div>





        )
    
       

    }

}

export default Employee;

