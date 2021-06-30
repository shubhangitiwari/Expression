import React from 'react'
import { useHistory } from "react-router-dom";
  

const Home = () => {
  const history = useHistory();
  const handleRouteLogin = () =>{
    history.push("/Login");
  }
  const handleRouteRegister = () =>{ 
    history.push("/Signup");
  }

  const goTo = () =>{ 
    history.push("/About");
  }
  return(
    <>
    <h1 id = "h1" class="mb-5">Expression</h1>
    <div class = "container align-content-center mt-5 shadow" id = "home_container">
    <div class = "continer-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
      <button type="button" class = "btn btn-primary text-light m-5 btn-lg shadow" onClick = {goTo}>Write an Article</button>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
      <button type="button" class = "btn btn-primary text-light m-5 btn-lg shadow">Search for an Article</button>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
      <button type="button" class = "btn btn-primary text-light m-5 btn-lg shadow">View all Articles</button>
    </div>
    </div>
    </div>
    <p class="text-center mt-2">Have you always wanted to convey your thoughts to people, but didn't knew how to do it ? Well <b>EXPRESSION</b> is the right spot for you to showcase your writing skills. Login or Register now to <b>EXPRESSION</b>.</p>
    </div>
    </>
  )
}

export default Home