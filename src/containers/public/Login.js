import React, { useState, useEffect } from "react";
import bgLogin from '../../assets/bg-login.jpg'
import { Button2, Loading } from "../../components";
import * as actions from "../../store/actions";
import { validateLogin } from "../../ultils/validate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import swal from "sweetalert2";
import {InputFieldWithValidate} from '../../components/InputCtWidth'

const actionTpyeLogin = "Đăng nhập"
const actionTpyeSigup = "Đăng ký"

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [actionType, setActionType] = useState(actionTpyeLogin)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { isLoggedIn, msg } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   setIsLoading(false);
  //   isLoggedIn &&
  //     setPayload({
  //       email: "",
  //       password: "",
  //       phone: "",
  //       password2: "",
  //       name: "",
  //     });
  //   isLoggedIn && navigate("/");
  // }, [isLoggedIn]);
  // useEffect(() => {
  //   setIsLoading(false);
  //   msg && swal.fire("Oops!", msg, "error");
  // }, [msg]);
  // const handleSubmit = async () => {
  //   const isEmail = isPhone
  //     ? { phone: payload.phone }
  //     : { email: payload.email };
  //   const finalPayload = isRegister
  //     ? {
  //       ...isEmail,
  //       password: payload.password,
  //       password2: payload.password2,
  //       name: payload.name,
  //     }
  //     : {
  //       ...isEmail,
  //       password: payload.password,
  //     };
  //   let result = validateLogin(finalPayload, setInvalidFields, payload);
  //   if (result === 0) {
  //     setIsLoading(true);
  //     isRegister
        // ? dispatch(actions.register(finalPayload))
  //       : dispatch(actions.login(finalPayload));
  //   }
  // }
  const handleButton1 = () => {
    if(actionType === actionTpyeLogin){
      let payload ={
        email: email,
        password: password
      }
      let res=dispatch(actions.login(payload))
      console.log(res)
    }else if (actionType === actionTpyeSigup){
      let payload ={
        email: email,
        password: password,
        name: name
      }
      dispatch(actions.register(payload))
    }
  }
  const handleButton2 = () => {
    if(actionType === actionTpyeLogin){
      setActionType(actionTpyeSigup)
    }else if (actionType === actionTpyeSigup){
      setActionType(actionTpyeLogin)
    }
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
                message={null}
                />

                {actionType === actionTpyeSigup&&<InputFieldWithValidate 
                lable={"Tên"}
                PLarge={true}
                value={name}
                setValue={setName}
                type={"text"}
                />}

                <InputFieldWithValidate 
                lable={"Mật khẩu"}
                PLarge={true}
                value={password}
                setValue={setPassword}
                type={"password"}
                message={"Sai mật khẩu"}
                />

                {actionType === actionTpyeSigup&&<InputFieldWithValidate 
                lable={"Nhập lại mật khẩu"}
                PLarge={true}
                value={confirmPassword}
                setValue={setConfirmPassword}
                type={"password"}
                />}
            </div>
            <div className="flex flex-col gap-5 mt-[12px]">
              <Button2 handleClick={() => handleButton1()} 
              text={actionType === actionTpyeLogin?actionTpyeLogin:actionTpyeSigup}/>
              <Button2 handleClick={() => handleButton2()} 
              text={actionType === actionTpyeLogin?actionTpyeSigup:actionTpyeLogin}/>
              <div className="text-[16px] text-primary cursor-pointer">
              Quên mật khẩu ?
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
