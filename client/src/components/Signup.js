import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

const Signup = () => {

  const history = useHistory();

  const [user,setUser] = useState({
    name:"", email:"", phone:"", profession:"", password:"", cpassword:""
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

    const { name, email, phone, profession, password, cpassword} = user;

    const res = await fetch("/register", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name, email, phone, profession, password, cpassword
      })
    });

    const data = await res.json();

    console.log(data);

    if(res.status === 422 || !data){
      window.alert("Invalid credentials");
    }

    else{
      window.alert(JSON.stringify(data));
      history.push("/Login");
    }

  }

  return(
    <div>
      <>
      <div class = "row">
      <div class = "col-lg-6 col-md-6 col-12">
      <div class = "container-sm p-5 text-dark shadow" id="signup_container">
      <h1 class = "text-center mb-5 mt-4"><b>Register</b></h1>
      <form method = "POST">
      <div class="form-group">
      <input type="text" class="form-control" value = {user.name} onChange = {handleInputs} placeholder="Enter your name" autoComplete = "off" id="name"  name="name"></input>
      </div>
      <div class="form-group">
      <input type="email" class="form-control" value = {user.email} onChange = {handleInputs} placeholder="Enter your E-mail Address" autoComplete = "off" id="email" name="email"></input>
      </div>
      <div class="form-group">
      <input type="text" class="form-control" value = {user.phone} onChange = {handleInputs} placeholder="Enter your Phone number" autoComplete = "off" id="phone" name="phone"></input>
      </div>
      <div class="form-group">
      <input type="text" class="form-control" value = {user.profession} onChange = {handleInputs} placeholder="Enter your Profession" autoComplete = "off" id="profession"  name="profession"></input>
      </div>
      <div class="form-group">
      <input type="password" class="form-control" value = {user.pwd} onChange = {handleInputs} placeholder="Enter password" autoComplete = "off" id="password"  name="password"></input>
      </div>
      <div class="form-group">
      <input type="password" class="form-control" value = {user.cpwd} onChange = {handleInputs} placeholder="Re-enter the password" autoComplete = "off" id="cpassword"  name="cpassword"></input>
      </div>
      <button type="submit" class="btn btn-primary mt-5 mx-auto d-flex justify-content-center" onClick = {postData}>Submit</button>   
      </form>
      </div>
      </div>
      <div class = "col-lg-6 col-md-6 col-12 align-content-center">
        <div class = "container-fluid bg-primary text-light text-center shadow" id="welcome">
          <h1>Welcome :)</h1>
          <br></br>
          <p class="text-center">Please enter all the details carefully and press register<br></br> button to get yourself registered with us.</p>
        </div>
      </div>
      </div>
      </>
    </div>
  )
}

export default Signup