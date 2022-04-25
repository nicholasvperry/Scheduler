import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Providers/UserProvider";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      navigate("/")
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <>
    <div className="login">      
    <form onSubmit={loginSubmit} className="loginForm">
      <h1>Welcome to Scheduler</h1>
      <br/>
      <br/>
      <br/>
      <fieldset>
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <Button>Login</Button>
        </div>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </form>
    </div>
    </>
  );
}