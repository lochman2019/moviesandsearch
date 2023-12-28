import Head from 'next/head'
import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';


const Login = ({ setIsLogin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err_msg, setErrMsg] = useState("");


  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login/', { username, password }).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username);
        Router.push("/account");
      } else {
        setErrMsg("Unexpected Error");
      }
    }).catch((err) => {
      console.log(err);
      setErrMsg(err.response.data.error);
    })
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Welcome Back</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium mb-2">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-2">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {err_msg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
            <strong>Error:</strong> {err_msg}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-500 text-sm">Don't have an account?</span>
        <a className="ml-2 font-medium text-blue-500 hover:text-blue-600" onClick={() => setIsLogin(false)}>Sign up</a>
      </div>
    </>
  );
}

const Register = ({ setIsLogin }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [err_msg, setErrMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setErrMsg("Passwords do not match");
      return;
    }
    axios.post('/api/signup', { username, email, password }).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        Router.push("/account");
      } else {
        setErrMsg(res.data.err_msg);
      }
      console.log(res);
    }).catch((err) => {
      setErrMsg("An error occurred");
      console.log(err);
    })
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Create an account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium mb-2">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-2">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-2">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm_password" className="block font-medium mb-2">Confirm Password</label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
          />
        </div>
        {err_msg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
            <strong>Error:</strong> {err_msg}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-500 text-sm">Already have an account?</span>
        <a className="ml-2 font-medium text-blue-500 hover:text-blue-600" onClick={() => setIsLogin(true)}>Log in</a>
      </div>
    </>
  )
}

export default function Home() {

  const [is_login, setIsLogin] = useState(true);

  var cur_main;
  if (is_login) {
    cur_main = <Login setIsLogin={setIsLogin} />;
  } else {
    cur_main = <Register setIsLogin={setIsLogin} />;
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          {cur_main}
        </div>
      </div>
      {/* <AppBody links={links} current={""} /> */}
    </>
  )
}
