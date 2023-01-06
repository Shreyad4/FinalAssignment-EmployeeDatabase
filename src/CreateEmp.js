import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateEmp = () => {

    const [Name, namechange] = useState("");
    const [Band, bandchange] = useState("");
    const [Role, rolechange] = useState("");
    const [Designation, designationchange] = useState("");
    const [Responsibilities, responsibilitieschange] = useState("");
    const [validation, valchange] = useState(false);


    const navigate = useNavigate();

    const handlesubmit = (e) => {

        e.preventDefault();
        // console.log({name,band,role,designation,responsibilities});
        const empdata = { Name, Band, Role, Designation, Responsibilities };


        fetch("https://localhost:44345/api/employee", {

            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
           alert('Saved Successfully');
            navigate('/');
        }).catch((err) => {
            //alert('Failed');
            console.log(err.message);
        })
    }



    return (

        <div className="row" >
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="modal-body" style={{ "textAlign": "left" }}>
                        <div className="card-title">
                            <h3>Create New</h3>
                        </div>

                        <div className="modal-body">
                        
                            <div className="row">

                                <div className="col-lg-10">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input value={Name} onMouseDown={e => valchange(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        {Name.length === 0 && validation && <span className="text-danger">Enter the Name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-10">
                                    <div className="form-group">
                                        <label>Band</label>
                                        <input value={Band} onMouseDown={e => valchange(true)} onChange={e => bandchange(e.target.value)} className="form-control"></input>
                                        {Band.length === 0 && validation && <span className="text-danger">Field is Required</span>}
                                    </div>
                                </div>

                                <div className="col-lg-10">
                                    <div className="form-group">
                                        <label>Role</label>
                                        <input value={Role} onMouseDown={e => valchange(true)} onChange={e => rolechange(e.target.value)} className="form-control"></input>
                                        {Role.length === 0 && validation && <span className="text-danger">Field is Required</span>}
                                    </div>
                                </div>

                                <div className="col-lg-10">
                                    <div className="form-group">
                                        <label>Designation</label>
                                        <input value={Designation} onMouseDown={e => valchange(true)} onChange={e => designationchange(e.target.value)} className="form-control"></input>
                                        {Designation.length === 0 && validation && <span className="text-danger">Field is Required</span>}
                                    </div>
                                </div>

                                <div className="col-lg-10">
                                    <div className="form-group">
                                        <label>Responsibilities</label>
                                        <input value={Responsibilities} onMouseDown={e => valchange(true)} onChange={e => responsibilitieschange(e.target.value)} className="form-control"></input>
                                        {Responsibilities.length === 0 && validation && <span className="text-danger">Field is Required</span>}
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-3">
                                <div className="form-group">
                                    <button className="btn btn-primary float-start" 
                                       type="submit" >Save</button>
                                    <Link to="/" className="btn btn" >Back</Link>
                                </div>
                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>



    );
}

export default CreateEmp;