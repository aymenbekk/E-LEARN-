import React, { Component } from "react";
import { AiOutlineHome, AiFillDatabase } from "react-icons/ai";
import { SiOpenaccess } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import { MdViewModule } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { BsJournals } from "react-icons/bs";
export const Itemsad = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiOutlineHome />,
  },
  {
    title: "DataBase",
    path: "/database",
    icon: <MdManageAccounts />,
  },
  {
    title: "Manage Modules",
    path: "/managemodules",
    icon: <MdViewModule />,
  },
  {
    title: "Manage Prof",
    path: "/manageprof",
    icon: <MdManageAccounts />,
  },
  {
    title: "Manage Groupe",
    path: "/managegroup",
    icon: <MdGroups />,
  },
  {
    title: "Manage Salles",
    path: "/managesalle",
    icon: <MdOutlineRoomPreferences />,
  },

  {
    title: "Promos",
    path: "/promos",
    icon: <AiFillDatabase />,
  },
  {
    title: "Journal",
    path: "/journalad",
    icon: <BsJournals />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FiSettings />,
  },
];
