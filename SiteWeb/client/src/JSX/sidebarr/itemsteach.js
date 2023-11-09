import React, { Component } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SiCoursera } from "react-icons/si";
import { BsCalendarCheck } from "react-icons/bs";
import { BiBarChartSquare } from "react-icons/bi";
import { BiCloudUpload } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
export const ItemsTeach = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiOutlineHome />,
  },
  {
    title: "Courses",
    path: "/courses",
    icon: <BiCloudUpload />,
  },
  {
    title: "Anouncements",
    path: "/anouncements",
    icon: <BiBell />,
  },

  {
    title: "Calendar",
    path: "/calendar",
    icon: <BsCalendarCheck />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];
