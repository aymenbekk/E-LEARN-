import { BsArrowLeftSquare } from "react-icons/bs";
import { BsArrowRightSquare } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import logo from "../../assets/esi-logo.png";
import aboutus from "../../assets/about-us-icon.png";
import { Items } from "./items";
import { Itemsad } from "./itemsad";
import { ItemsTeach } from "./itemsteach";
import "../../CSS/Sidebar.css";
import React, { Component, useState, useEffect } from "react";
import { BsCalendarCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../actions/loginActions";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  {
    props.setOpen(isOpen);
  }
  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  if (!auth.authenticated) {
    navigate("/login");
  }

  const role = auth.user.role;
  let array = [];
  const changearray = () => {
    switch (role) {
      case "student":
        return Items;
      case "admin":
        return Itemsad;
      case "teacher":
        return ItemsTeach;
    }
  };
  array = changearray();
  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="top-section">
        <div className="logo">
          <a href="https://www.esi-sba.dz/fr/">
            <img src={logo} alt="webscript" />
          </a>
        </div>

        <div className="toggle-btn" onClick={() => setOpen((v) => !v)}>
          <i>{isOpen ? <BsArrowLeftSquare /> : <BsArrowRightSquare />}</i>
        </div>
      </div>
      <div className="ligne"></div>
      <div className="elements-container">
        <ul>
          {array.map((item, key) => {
            return (
              <li key={key}>
                <NavLink to={"api/" + role + item.path} className="element">
                  <div className="icony">{item.icon}</div>
                  <span> {item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebar-footer">
        <div className="avatar">
          <img src={aboutus} alt="aboutus" />
        </div>
        <div className="ketba">
          <span>About Us</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
