import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const Login = () => {

  const history = useHistory();

  const [user,setUser] = useState({
    email:"", password:""
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ... user, [name]:value});
  }

  const postData = async (e) => {
    e.preventDefault();

    const { email, password} = user;

    const res = await fetch("/login", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email, password
      })
    });

    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert(JSON.stringify(data));
    }

    else{
      window.alert("Success");
      history.push("/");
    }
  }
  return(
    <>
    <div class = "container-sm p-5 text-dark shadow" id="login_container">
    <h1 class = "text-center mb-5"><b>Login</b></h1>
    <form method = "POST">
    <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" placeholder="Enter email" id="email" name = "email" value = {user.email} onChange = {handleInputs}></input>
     </div>
    <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" placeholder="Enter password" id="password" name = "password" value = {user.password} onChange = {handleInputs}></input>
     </div>
  <button type="submit" class="btn btn-primary mt-5 mx-auto d-flex justify-content-center shadow" onClick = {postData}>Submit</button>   
</form>
</div>
</>
  )
  }
export default Login