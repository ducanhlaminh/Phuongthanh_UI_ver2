import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgLogin from '../../assets/bg-login.jpg';
import { Button2 } from "../../components";
import { InputFieldWithValidate } from '../../components/InputCtWidth';
import * as actions from "../../store/actions";

const actionTpyeLogin = "Đăng nhập"
const actionTpyeSigup = "Đăng ký"
const actionTypeForgotPassword = "Quên mật khẩu ?"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [actionType, setActionType] = useState(actionTpyeLogin)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(null)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(null)
  const [name, setName] = useState('')
  const [validName, setValidName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validConfirmPassword, setValidConfirmPassword] = useState('')
  const { isLoggedIn, msg } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsLoading(false)
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
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
          </div>
          <Link to={"/"} className="font-medium hover:underline text-white">
            Bỏ qua đăng nhập
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
