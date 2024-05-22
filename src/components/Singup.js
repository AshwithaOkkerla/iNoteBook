import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
const Singup = () => {

	const [cred,setCred] = useState({name:"",email:"",password:"",cpassword:""});
	let navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const {name,email,password,cpassword} = cred;
		const response = await fetch("http://localhost:5000/api/auth/createUser", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({name:name,email:email,password:password})
		});
		const json = await response.json()
		console.log(json);
	
		
		  //save auth token and redirect to notes
		  localStorage.setItem('token',json.authToken);
		  navigate("/");
		
	  };
	
	  const onchange =(e)=>{
		setCred({...cred,[e.target.name]:e.target.value})
	  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
		<label htmlFor="name" className="form-label">
            Name
          </label>
          <input
		  	name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
			onChange={onchange}
          />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
		  	name="email"
            type="email"
            className="form-control"
            id="email"
            
			onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
		  	name="password"
            type="password"
            className="form-control"
            id="password"
			onChange={onchange}
			minLength={6}
			required
          />
        </div>
        <div className="mb-3">
          <label for="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
		  	name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
			onChange={onchange}
			minLength={6}
			required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Singup;
