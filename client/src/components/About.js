import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
const About = () => {

  const history = useHistory();
  const [userData, setUserData] = useState([]);
  userData.articles = [];
  const callAboutPage = async () => {
    try{
      const res = await fetch('/about',{
        method : "GET",
        headers : {
             Accept : 'application/json',
             "Content-Type" : "application/json"
        },
        credentials : "include"
      })
      var arr = [];
      var data = await res.json();
      Object.keys(data).forEach(function(key) {
      arr.push(data[key]);
      });
      console.log(arr + " " + "we got it");
      setUserData(arr);
      console.log(arr["articles"]);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch(err){
      console.log(err);
      history.push('/login');
    }
  }

  useEffect (() => {
    callAboutPage();
  }, [{}]);

  const [user, setUser] = useState({
    articles:""
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

    const {title,article} = user;

    const res = await fetch("/about", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        'Accept': 'application/json'
      },
      body : JSON.stringify({
        title,article
      })
    });

    const data = await res.json();

    console.log(data);

    if(res.status === 422 || !data){
      window.alert("Invalid data");
    }

    else{
      window.alert(JSON.stringify(data));
      history.push("/");
    }
  }

  return(
    <>
    <div class = "container align-content-center text-center shadow p-5" id = "about_container">
    <div class = "row">
    <div class = "col-lg-6 col-md-6 col-sm-12">
      <div class = "container-fluid bg-light" id = "article_container">
      <h4 class="mt-5 mb-5">Welcome back! {userData.name}</h4>
      <h7>Your email : {userData.email}</h7><br></br>
      <h7>Phone Number : {userData.phone}</h7><br></br>
      <h7>Profession : {userData.profession}</h7><br></br>
      <h7>List of your articles : </h7>
      <table>
      {userData["articles"].map(article=>(
     <tr key={article.id}>
       <td key={1}>{article.title}</td>
     </tr>))}
      </table>

    </div>
    </div>
    <div class = "col-lg-6 col-md-6 col-sm-12">
      <h5 class="mb-5">Express your views here about the topic of your choice ! It might help our readers :)</h5>
      <form action="#" method="POST">
      <div class="form-group">
      <label for="title">Title:</label>
      <input type="text" class="form-control" value = {user.title} onChange = {handleInputs} placeholder="Enter your title here" id="title" name="title"></input>
      </div>
      <div class="form-group">
      <label for="article">Body of the article:</label>
      <textarea class="form-control" value = {user.article} onChange = {handleInputs} placeholder="Enter the body/content here" id="article" name="article"></textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-5" onClick = {postData}>Submit</button>
      </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default About