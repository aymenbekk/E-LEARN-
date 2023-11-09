import React, { Component } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SiCoursera } from "react-icons/si";
import { BsCalendarCheck } from "react-icons/bs";
export const Items = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiOutlineHome />,
  },
  {
    title: "Modules",
    path: "/courses",
    icon: <SiCoursera />,
  },
  {
    title: "Emplois de temps",
    path: "/calendar",
    icon: <BsCalendarCheck />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];
