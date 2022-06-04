import "./App.css";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
{
  /*
         코드가 강의 버전이랑 많이 바뀜. Switch를 더 안 씀
         지금 강의 보시는 분들은 저 코드가 안될꺼에요. 옛날 v5 버전으로 기술되어 있고 현재 v6는 switch 대신 Routes 를 사용해야합니다.

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



        <Routes>

          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>

        component -> element로 바꾸고 하여간 문법 많이 바뀐듯..
        */
}
