import React, { useState, useEffect } from "react";
import { login, isUserLoggedIn } from "../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import photo from "../assets/undraw_professor_re_mj1s .svg";
import avatar from "../assets/undraw_profile_pic_ic-5-t.svg";
import wave from "../assets/wave.png";
import "../CSS/stylesLogin.css";
import { Formik, Form } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Notification from "./components/notification/notification";

export default function Login(props) {
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const handleSubmit = (
    //{ email, password },
    { setFieldError }
  ) => {
    console.log("Success! Call the API Now!");
    setTimeout(() => {
      setFieldError("password", "wrong password");
    }, 1000);
  };


  function validateTheSchema(mail, passwd) {
    if (mail == "") {
      setNotify({ isOpen: true, message: 'Email is required', type: 'error' })

    } else if (!mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setNotify({ isOpen: true, message: 'Enter a valid email', type: 'error' })
    } else if (passwd == "") {
      setNotify({ isOpen: true, message: 'Password is required', type: 'error' })
    }
    else if (passwd.length < 8) {
      setNotify({ isOpen: true, message: 'Password must contain more than 8 characters', type: 'error' })
    } else if ((passwd.search(/[a-zA-Z]+/) == -1) || (passwd.search(/[0-9]+/) == -1)) {
      setNotify({ isOpen: true, message: 'Password must contain at least 1 number', type: 'error' })

    } else {

      //  setNotify({ isOpen: true, message: 'wrong password or email', type: 'error' })

    }


  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("please enter a valid email")
      .required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short ! Must be at least 8 characters")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  });

  // use state for focus in input (design)
  //const [classes1, setClasses1] = useState("input-div one");
  //const [classes2, setClasses2] = useState("input-div two");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, []);

  function loginClick(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user))
    validateTheSchema(user.email, user.password)
  }

  if (auth.authenticated) {
    if (auth.user.role == "admin") navigate("/api/admin")
    else if (auth.user.role == "student") navigate("/api/student")
    else if (auth.user.role == "teacher") navigate("/api/teacher")
  }

  return (

    <div>
      {console.log(Formik.values)}
      <img className="wave" src={wave} />
      <div className="container">
        <div className="img">
          <img src={photo} />
        </div>
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        <div className="login-container">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(errors) => {
              handleSubmit(errors);
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => {
              return (
                <Form className="login-form" onSubmit={handleSubmit}>
                  <img className="avatar" src={avatar} alt="avatar" />
                  <h2 className="title"> Welcome</h2>

                  <div className="input-div one focus">
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      {/* <h5>Email</h5> */}
                      <input
                        values={values.email}
                        className="input"
                        name="email"
                        type="text"
                        placeholder="Email"

                        onChange={(e) => {
                          setEmail(e.target.value);
                          handleChange("email");
                        }}
                        onBlur={handleBlur("email")}
                      />
                      {/* {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )} */}

                      {/* <div>{touched.email && errors.email}</div> */}
                    </div>
                  </div>

                  <div className="input-div two focus">
                    <div className="i">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div focus">
                      {/* <h5>Password</h5> */}

                      <input
                        className="input"
                        type="password"
                        values={values.password}
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          handleChange("password");
                        }}
                        onBlur={handleBlur("password")}
                      />

                      {/* {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )} */}

                      {/* <div>{touched.password && errors.password}</div> */}
                    </div>
                  </div>

                  <a className="forgot-pw" href="#">
                    Forgot password?
                  </a>

                  <form className="login-form" name="login" action="/api/login" method="post">
                    <input
                      type="submit"
                      className="btn"
                      value="Login"
                      onClick={loginClick}
                    />
                  </form>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

