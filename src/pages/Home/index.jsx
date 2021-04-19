import React, { useState, useCallback, useMemo } from "react";
import Game from "../Game";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import useStyle from "./style";

const userSchema = yup.object().shape({
  username: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid!"),
  phone: yup
    .string()
    .required("This field is required")
    .matches(/^[0-9]+$/, "Phone must contain numbers"),
});

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyle();

  const {
    handleChange,
    values,
    errors,
    isValid,
    handleBlur,
    touched,
    setFieldTouched,
    setValues,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      totalPoint: 25000,
      cards: [],
    },
    validationSchema: userSchema,
    validateOnMount: true,
  });

  const setAllTouched = useCallback(() => {
    const fields = ["username", "email", "phone"];
    fields.forEach((field) => {
      setFieldTouched(field, true);
    });
  }, [setFieldTouched]);

  const handleSubmit = useCallback(
    (event) => {
      /**
       * TODO
       *   1.Xử lý form, kiểm tra và lấy info người dùng nhập
       *   2.dispatch action , push user vào playerList
       *   3. Hiện màn hình chơi game, ẩn form
       *
       */
      event.preventDefault();
      if (!isValid) {
        setAllTouched();
        return;
      }

      console.log(values);

      //dispatch action to store
      dispatch({ type: "ADD_PLAYER", payload: values });
      setIsStarted(true);
    },
    [values, isValid, dispatch, setAllTouched]
  );

  const handleSetDefaultPlayer = useCallback(() => {
    const defaultPlayer = {
      username: "trunghieu",
      email: "dangtrunghieu147@gmail.com",
      phone: "0334643124",
      totalPoint: 25000,
      cards: [],
    };

    setValues(defaultPlayer);
  }, [setValues]);

  // const number = 10000;

  // const sum = useMemo( () => {
  //   return 10 + 5 + 5 * 1000000 * number
  // } , [number] );

  return (
    <>
      {isStarted ? (
        <Game />
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className={classes.title}> Welcome to Pocker Center</h1>
          <h3>Fill your info and start</h3>
          <form onSubmit={handleSubmit} className="w-25 mx-auto">
            <input
              type="input"
              name="username"
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
              placeholder="username"
              className="w-100 form-control mb-3"
            />
            {touched.username && errors.username && (
              <p className="text-danger">{errors.username}</p>
            )}

            <input
              type="input"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="email"
              className="w-100 form-control mb-3"
            />
            {touched.email && errors.email && (
              <p className="text-danger">{errors.email}</p>
            )}

            <input
              type="input"
              name="phone"
              onChange={handleChange}
              value={values.phone}
              onBlur={handleBlur}
              placeholder="phone"
              className="w-100 form-control mb-3"
            />
            {touched.username && errors.phone && (
              <p className="text-danger">{errors.phone}</p>
            )}

            <button className="btn btn-success">Start new Game</button>
          </form>
          <button onClick={handleSetDefaultPlayer} className="btn btn-primary">
            Set default player
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
