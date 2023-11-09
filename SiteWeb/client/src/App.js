import "./index.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./JSX/login";
import Dashboard from "./JSX/dashbord";
import { UploadRessource } from "./JSX/upload";
import { DownloadRessources } from "./JSX/download";
import Sidebar from "./JSX/sidebarr/sidebar";
import "./index.css";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginTest } from "./actions/loginActions";

import ProtectedRoutes from "./HOC/ProtectedRoutes";
import AdminRoutes from "./HOC/AdminRoutes";
import StudentRoutes from "./HOC/StudentRoutes";
import TeacherRoutes from "./HOC/TeacherRoutes";
import { GlobalStyle } from "./globalStyles";
import Header from "./JSX/header";
import Home from "./JSX/Home";
import Head from "./JSX/headerm/head";
import Dashboardst from "./JSX/Dashboards/DashboardST/dashboardst";
import Settings from "./settingss/settings";
import Profil from "./settingss/Profile/profil";
import NotesPage from "./JSX/notes/notespage";
import Teacherdashbord from "././JSX/teacherdashbord/teacherdashbord";
import DashboardAdmin from "./JSX/Dashboards/DashboardAdmin/dashboardAdmin";
import Database from "./JSX/pages/database/database";
import Promos from "./JSX/pages/promos/Promos";
import Calendar from "./JSX/components/calendar/calendar";

import Manageprof from "./JSX/pages/manageprof/Manageprof";
import Managesalle from "./JSX/pages/managesalle/Managesalle";
import Teachercourses from "././JSX/teacherdashbord/teachercourses";
import Teacherupload from "././JSX/teacherdashbord/teacherupload";
import Teachergrades from "./JSX/teacherdashbord/teachergrades";
import Anouncements from "./JSX/teacherdashbord/anouncements";
import Courses from "./JSX/courses_stud/courses";
import Course from "./JSX/courses_stud/course_content/course";
import ManageGroup2 from "./JSX/pages/managegroup/managegroup2";
import ManageModules from "./JSX/pages/managemodules/managemodules";
import CalendarSt from "./JSX/components/calendar/calendarSt";
import PromosCalendar from "./JSX/pages/promos/PromosCalendar";
import CalendarTeacher from "./JSX/components/calendar/CalendarTeacher";
import Journalad from "./JSX/journalad";
import {Helmet} from "react-helmet"
const App = () => {
  const [isOpen, setOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.authenticated);

  return (
    <div>

      <Helmet>
        <title> E-Learn ESI-SBA</title>
      </Helmet>
    <BrowserRouter>
      {isAuth && <Head />}

      {isAuth && <Sidebar setOpen={setOpen} />}
      {console.log(isOpen)}
      <div className={isAuth ? "container--closed" : null}>
        {/* <GlobalStyle /> */}
        <Routes>
          <Route path="/api" element={<ProtectedRoutes />}>
            {/* <Route path="/api" element={<Navigate replace to="dashboard" />} /> */}
            <Route path="admin" element={<AdminRoutes />}>
              <Route
                path="/api/admin"
                element={<Navigate replace to="dashboard" />}
              />

              {/* all admin's paths */}

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="database" exact element={<Database />} />
              <Route path="promos" exact element={<PromosCalendar />} />
              <Route path="calendar" exact element={<Calendar />} />
              <Route path="upload" exact element={<UploadRessource />} />
              <Route path="ressources" exact element={<DownloadRessources />} />
              <Route path="managemodules" exact element={<ManageModules />} />
              <Route path="managegroup" exact element={<ManageGroup2 />} />
              <Route path="manageprof" exact element={<Manageprof />} />
              <Route path="managesalle" exact element={<Managesalle />} />
              <Route path="courses" exact element={<DownloadRessources />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="journalad" element={<Journalad />} />
            </Route>

            <Route path="student" element={<StudentRoutes />}>
              {/* all student's paths */}

              <Route
                path="/api/student"
                element={<Navigate replace to="dashboard" />}
              />
              <Route path="dashboard" element={<Dashboardst />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="courses" element={<Courses />} />
              <Route path="course" element={<Course />} />
              <Route path="calendar" element={<CalendarSt />} />
            </Route>

            <Route path="teacher" element={<TeacherRoutes />}>
              {/* all teacher's paths */}

              <Route
                path="/api/teacher"
                element={<Navigate replace to="dashboard" />}
              />
              <Route path="dashboard" element={<Teacherdashbord />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="courses" element={<Teachercourses />} />
              <Route path="upload" element={<Teacherupload />} />
              <Route path="grades" element={<Teachergrades />} />
              <Route path="anouncements" element={<Anouncements />} />
              <Route path="calendar" element={<CalendarTeacher />} />
            </Route>

            {/* <Route path="dashboard" element={<Dashboard />} /> */}

            {/* end of PROTECTED ROUTES */}
          </Route>
          <Route path="/" exact element={<Header />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
};

export default App;
