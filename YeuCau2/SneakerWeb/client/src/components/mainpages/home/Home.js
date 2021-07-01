import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../auth/Login.css";
import { showErrMsg, showSuccessMsg } from "../utils/Notification/Notification";
import Button from "../utils/Button/Button";

const Home = () => {
    const [state, setState] = useState({ err: "", success: "" });
    const { err, success } = state;

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .trim()
                .email("Email invalid")
                .required("Please enter this field."),
            password: Yup.string()
                .min(6, "Please enter at least 6 characters.")
                .required("Please enter this field."),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post("/user/login", { ...values });
                // console.log(res);
                setState({ err: "", success: res.data.message });
                localStorage.setItem("firstLogin", true);
                window.location.href = "/";
                resetForm();
            } catch (error) {
                // console.log(error.response);
                error.response.data.message &&
                    setState({ err: error.response.data.message, success: "" });
            }
        },
    });

    return (
        <div>
            <div className="login mrt mrb">
                <div className="grid wide">
                    <div className="row app-content">
                        <div className="col l-6 m-12 c-12">
                            <form
                                className="form"
                                onSubmit={formik.handleSubmit}
                            >
                                <h2 className="heading">Log In</h2>
                                {err && showErrMsg(err)}
                                {success && showSuccessMsg(success)}
                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="kimthang@gmail.com"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    {formik.errors.email &&
                                        formik.touched.email && (
                                            <span className="form-message">
                                                {formik.errors.email}
                                            </span>
                                        )}
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="*******"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.errors.password &&
                                        formik.touched.password && (
                                            <span className="form-message">
                                                {formik.errors.password}
                                            </span>
                                        )}
                                </div>
                                <Button text="Log In" />
                            </form>
                        </div>
                        <div className="col l-6 m-12 c-12">
                            <div className="reason">
                                <h2 className="heading">CREATE AN ACCOUNT</h2>
                                <p className="desc">
                                    Creating an account is easy. Enter your
                                    email address and fill in the form on the
                                    next page and enjoy the benefits of having
                                    an account.
                                </p>
                                <div className="content">
                                    <ul>
                                        <li>
                                            <i className="fal fa-check"></i>
                                            <span>
                                                Simple overview of your personal
                                                information
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fal fa-check"></i>
                                            <span>Faster checkout</span>
                                        </li>
                                        <li>
                                            <i className="fal fa-check"></i>
                                            <span>
                                                A single global login to
                                                interact with adidas products
                                                and services
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fal fa-check"></i>
                                            <span>
                                                Exclusive offers and promotions
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fal fa-check"></i>
                                            <span>
                                                Latest products arrivals
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fal fa-check"></i>
                                            <span>Upcoming events</span>
                                        </li>
                                        <li>
                                            <i className="fal fa-check"></i>
                                            <span>
                                                New season and limited
                                                collections
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <Link to="/register">
                                    <Button text="Register" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
