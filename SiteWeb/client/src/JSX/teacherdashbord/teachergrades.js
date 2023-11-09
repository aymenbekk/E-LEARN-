import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../../actions/loginActions";

const Teachernotes = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  return (
    <div>
      <div className="title">Grades</div>
    </div>
  );
};
export default Teachernotes;
