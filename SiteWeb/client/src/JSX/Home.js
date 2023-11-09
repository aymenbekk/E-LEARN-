//This is home page, It will contains all the sections require in this page.

//Import all the require sections here
import HeroSection from "././Sections/Hero";
import Contact from "././Sections/Contact";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../actions/loginActions";
import { GlobalStyle } from "../globalStyles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  if (auth.authenticated) {
    if (auth.user.role == "admin") navigate("/api/admin")
    else if (auth.user.role == "student") navigate("/api/student")
  }

  return (
    <Container>
      <GlobalStyle/>
      <HeroSection />
      <Contact />
    </Container>
  );
};

export default Home;
