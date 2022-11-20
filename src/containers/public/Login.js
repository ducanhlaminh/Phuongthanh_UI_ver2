import React, { useState, useEffect } from "react";
import introVideo from "../../assets/intro.mp4";
import { InputField, Button, Loading } from "../../components";
import * as actions from "../../store/actions";
<<<<<<< Updated upstream
import { validateLogin } from "../../ultils/validate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import swal from "sweetalert2";
=======

const actionTpyeLogin = "Đăng nhập"
const actionTpyeSigup = "Đăng ký"
const actionTypeForgotPassword = "Quên mật khẩu ?"
>>>>>>> Stashed changes

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    phone: "",
    password2: "",
    name: "",
  });
  const [isRegister, setIsRegister] = useState(location?.state?.flag);
  const [isPhone, setIsPhone] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const { isLoggedIn, msg } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
<<<<<<< Updated upstream
    setIsLoading(false);
    isLoggedIn &&
      setPayload({
        email: "",
        password: "",
        phone: "",
        password2: "",
        name: "",
      });
=======
    setIsLoading(false)
>>>>>>> Stashed changes
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);
  useEffect(() => {
<<<<<<< Updated upstream
    setIsLoading(false);
    msg && swal.fire("Oops!", msg, "error");
  }, [msg]);
  const handleSubmit = async () => {
    const isEmail = isPhone
      ? { phone: payload.phone }
      : { email: payload.email };
    const finalPayload = isRegister
      ? {
        ...isEmail,
        password: payload.password,
        password2: payload.password2,
        name: payload.name,
      }
      : {
        ...isEmail,
        password: payload.password,
      };
    let result = validateLogin(finalPayload, setInvalidFields, payload);
    if (result === 0) {
      setIsLoading(true);
      isRegister
        ? dispatch(actions.register(finalPayload))
        : dispatch(actions.login(finalPayload));
    }
  };
  return (
    <div className="w-full h-full relative">
      {isLoading && <Loading />}
      <video
        src={introVideo}
        muted
        autoPlay
        loop
        className="w-screen h-screen object-cover"
      ></video>
      <div className="overlay-layer absolute top-0 left-0 right-0 bottom-0 bg-overlay-80"></div>
      <div className="wrap-login absolute top-0 left-0 right-0 bottom-0 z-10 flex flex-col gap-7 justify-center items-center bg-transparent">
        <div className="box-login w-4/5 md:w-[500px]  bg-white rounded-md p-5 ">
          <h3 className="text-2xl font-semi w-full text-center py-5 pt-3">
            {!isRegister ? "Đăng nhập" : "Đăng ký tài khoản"}
          </h3>
          <div>
            {!isPhone && (
              <InputField
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label="EMAIL"
                value={payload.email}
                setValue={setPayload}
                type="email"
                typeInput="text"
              />
            )}
            {isPhone && (
              <InputField
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label="SỐ ĐIỆN THOẠI"
                value={payload.phone}
                setValue={setPayload}
                type="phone"
                typeInput="text"
              />
            )}
            {isRegister && (
              <InputField
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label="HỌ TÊN"
                value={payload.name}
                setValue={setPayload}
                type="name"
                typeInput="text"
              />
            )}
            <InputField
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              label="MẬT KHẨU"
              value={payload.password}
              setValue={setPayload}
              type="password"
              typeInput="password"
            />
            {isRegister && (
              <InputField
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label="NHẬP LẠI MẬT KHẨU"
                value={payload.password2}
                setValue={setPayload}
                type="password2"
                typeInput="password"
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <Button
              text={!isRegister ? "Đăng nhập" : "Đăng ký"}
              bgColor="bg-blue-700"
              textColor="text-white"
              fullWidth
              onClick={handleSubmit}
            />
            <small
              onClick={() => setIsPhone((prev) => !prev)}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              <span>{isRegister ? "Đăng ký bằng " : "Đăng nhập bằng "}</span>
              <span>{!isPhone ? "số điện thoại ?" : "email ?"}</span>
            </small>
            {!isRegister ? (
              <small>
                Chưa có tài khoản ?{" "}
                <span
                  onClick={() => {
                    setIsRegister(true);
                    setPayload({
                      email: "",
                      password: "",
                      phone: "",
                      password2: "",
                      name: "",
                    });
                    setInvalidFields([]);
                  }}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Đăng ký ngay
                </span>
              </small>
            ) : (
              <small>
                Đã có tài khoản ?{" "}
                <span
                  onClick={() => {
                    setIsRegister(false);
                    setPayload({
                      email: "",
                      password: "",
                      phone: "",
                      password2: "",
                      name: "",
                    });
                    setInvalidFields([]);
                  }}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Đi tới đăng nhập
                </span>
              </small>
            )}
=======
    if(msg === "Email/Phone chưa đăng ký !" ||
    msg ==="Email/Phone đã được sử dụng!") {
      setValidPassword(null)
      setValidEmail(msg)
    }else if(msg === "Mật khẩu không đúng !") {
      setValidPassword(msg)
      setValidEmail(null)
    }else if(msg === "Vui lòng kiểm tra đường truyền mạng.") {
      setValidPassword(msg)
      setValidEmail(msg)
    }
  }, [msg,isLoading]);

  const handleButton1 = async () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isEmail = regexEmail.test(email)
    if(!isEmail) setValidEmail("Email này không hợp lệ.")
    if(actionType === actionTpyeLogin){
      if(password.length < 6) setValidPassword("Mật khẩu tối thiểu 6 ký tự.")
      if(isEmail&&password.length >= 6){
        let payload ={
          email: email,
          password: password
        }
        dispatch(actions.login(payload))
        setIsLoading(true)
      }
    }else if (actionType === actionTpyeSigup){
      if(password.length < 6) setValidPassword("Mật khẩu tối thiểu 6 ký tự.")
      if(name.length < 6) setValidName("Tên tối thiểu 6 ký tự.")
      if(confirmPassword !== password) setValidConfirmPassword('Mật khẩu không khớp.')
      if(confirmPassword === password && name.length >= 6 &&
          isEmail&&password.length >= 6){
          let payload ={
          email: email,
          password: password,
          name: name
          }
          dispatch(actions.register(payload))   
        }
    }else if (actionType === actionTypeForgotPassword){
      
    }
  }

  const handleButton2 = () => {
    if(actionType === actionTpyeLogin){
      setActionType(actionTpyeSigup)
    }else if (actionType === actionTpyeSigup){
      setActionType(actionTpyeLogin)
    }
  }

  const handleButton3 = () => {
    if(actionType === actionTypeForgotPassword){
      setActionType(actionTpyeLogin)
    }else setActionType(actionTypeForgotPassword)
  }

  return (
    <div className="w-full h-full relative">
      {/* {isLoading && <Loading />} */}
      <img src={bgLogin} alt="background-login" className="w-full h-full object-cover" />
      <div className=" fixed top-0 left-0 right-0 bottom-0 bg-overlay-70">
        <div className="h-full w-full flex items-center justify-center">
        <div className="z-10 flex flex-col w-full justify-center items-center bg-transparent">
          <div className="box-login w-11/12 max-h-[80%] md:w-[500px]  bg-white rounded-md p-5 ">
            <h3 className="font-medium text-[20px] lg:text-[34px] md:text-[26px] md:font-semibold text-center text-primary md:py-[24px]">
              {actionType}
            </h3>
            <div>
              
                <InputFieldWithValidate 
                lable={"Email"}
                PLarge={true}
                value={email}
                setValue={setEmail}
                type={"email"}
                message={validEmail}
                setMessage={setValidEmail}
                />

                {actionType === actionTpyeSigup&&<InputFieldWithValidate 
                lable={"Tên"}
                PLarge={true}
                value={name}
                setValue={setName}
                type={"text"}
                message={validName}
                setMessage={setValidName}
                />}

                {actionType !== actionTypeForgotPassword&&<InputFieldWithValidate 
                lable={"Mật khẩu"}
                PLarge={true}
                value={password}
                setValue={setPassword}
                type={"password"}
                message={validPassword}
                setMessage={setValidPassword}
                />}

                {actionType === actionTpyeSigup&&<InputFieldWithValidate 
                lable={"Nhập lại mật khẩu"}
                PLarge={true}
                value={confirmPassword}
                setValue={setConfirmPassword}
                type={"password"}
                message={validConfirmPassword}
                setMessage={setValidConfirmPassword}
                />}
            </div>
            <div className="flex flex-col gap-5 mt-[12px]">
              <Button2 handleClick={() => handleButton1()} 
              text={actionType === actionTpyeLogin?actionTpyeLogin:
                actionType ===actionTpyeSigup ? actionTpyeSigup:"Xác nhận email"}/>
              {actionType !== actionTypeForgotPassword&&<Button2 handleClick={() => handleButton2()} 
              text={actionType === actionTpyeLogin?actionTpyeSigup:actionTpyeLogin}/>}
              <div 
              onClick={() => handleButton3()}
              className="text-[16px] text-primary cursor-pointer">
              {actionType !== actionTypeForgotPassword ? actionTypeForgotPassword : "Đăng nhập."}
            </div>
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
        <Link to={"/"} className="font-medium hover:underline text-white">
          Bỏ qua đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default Login;
