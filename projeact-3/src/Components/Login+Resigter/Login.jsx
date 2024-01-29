import React from "react";

import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-context";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const url = "http://localhost:8000/users";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("メールエラー")
        .required("メールアドレスを空白にしないでください"),
      password: Yup.string().required("パスワードを空白にしないでください"),
    }),
    onSubmit: async (values) => {
      try {
        const reponse = await axios.get(url);
        let users = reponse.data;
        const user = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        if (user) {
          toast.success("ログイン成功");
          navigate("/homepage");
          login(user);
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          toast.error("ログイン失敗");
        }
      } catch (err) {
        console.error("ログインエラー");
      }
    },
  });

  return (
    <div>
      <div className="main">
        <form onSubmit={formik.handleSubmit} className="form" id="form-2">
          <h3 className="heading">ログイン</h3>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              メールアドレス
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              name="email"
              type="text"
              placeholder="VD: email@domain.com"
              className="form-control"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="form-message">{formik.errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              パスワード
            </label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              name="password"
              type="password"
              placeholder="パスワード入力"
              className="form-control"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="form-message">{formik.errors.password}</span>
            )}
          </div>
          <button className="form-submit">ログイン</button>
          <div id="them">
            <span>
              アカウントがありません？{" "}
              <span>
                <button onClick={() => navigate("/resigter")}>
                  こちらに登録！
                </button>
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
