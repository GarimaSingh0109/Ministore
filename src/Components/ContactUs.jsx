import React, { useState } from "react";

import formValidations from "./Validations/formValidations";
import { addContactUs } from "../Store/ActionCreators/ContactUsActionCreators";
import { useDispatch } from "react-redux";
export default function ContactUs() {
  let [message, setMessage] = useState("");
  let [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    email: "Email Field is Mendatory",
    phone: "Phone Field is Mendatory",
    subject: "Subject Field is Mendatory",
  });
  let [show, setShow] = useState(false);
  let dispatch = useDispatch();
  function getInputData(e) {
    var { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidations(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    if (Object.values(errorMessage).find((x) => x && x.length !== 0)) {
      setShow(true);
    } else {
      let item = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        date: new Date(),
        active: true,
      };
      dispatch(addContactUs(item));
      setShow(false);
      setMessage("Thanks to Contact Us!!! Our Team Will Contact You Soon!!!");
      setData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  }
  return (
    <>
      <div className="container-fluid my-5">
        <div style={{ height: 100 }} />

        <h5 className="text-center p-2">DO YOU HAVE ANY QUERY? CONTACT US</h5>
        <div className="row">
          <div className="col-md-6">
            <p className="text-success">{message}</p>
            <form onSubmit={postData}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Full Name"
                />
                {show ? (
                  <p className="text-danger px-2">{errorMessage.name}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Email Address"
                />
                {show ? (
                  <p className="text-danger px-2">{errorMessage.email}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Phone Number"
                />
                {show ? (
                  <p className="text-danger px-2">{errorMessage.phone}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="subject"
                  value={data.subject}
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Subject"
                />
                {show ? (
                  <p className="text-danger px-2">{errorMessage.subject}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  rows="3"
                  value={data.message}
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="card mt-3 p-2">
              <div>
                <p className="text-dark">
                  <i className="fa fa-home mx-3"></i> G-43, Sector 54,Noida
                  (201301), India
                </p>
              </div>
              <div>
                <p className="text-dark">
                  <i className="fa fa-envelope mx-3"></i>{" "}
                  <a href="mailto:vishankchauhan@gmail.com">
                    garimasingh@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <p className="text-dark">
                  <i className="fa fa-phone mx-3"></i>{" "}
                  <a href="tel:9123456780">9123456780</a>
                </p>
              </div>
            </div>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width="100%"
                  height="210"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=G-53%20Sector%2054%20Noida&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
