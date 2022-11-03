import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ApiChangePassword from "../../apis/changePassword";
import InputField from "../../components/InputField";
import LongButton from "../../components/LongButton";

const ChangePassword = () => {
  const changePassword = useSelector((state) => state.changePassword);
  const [tokenVerifyEmailSuccess, setTokenVerifyEmailSuccess] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    password: "",
    password2: "",
  });
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  useEffect(() => {
    const fetchChangePassword = async () => {
      const res = await ApiChangePassword.verifyEmail({
        id: changePassword.userId,
        token: changePassword.tokenChangePassword,
      });
      if (res.status === 0) {
        setTokenVerifyEmailSuccess(res?.tokenVerifyEmailSuccess);
        setIsVerifiedEmail(true);
      }
    };

    fetchChangePassword();
  }, []);
  return (
    <>
      {isVerifiedEmail && (
        <div>
          <div className="">
            <InputField
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              label="Mật khẩu mới"
              value={payload.password}
              setValue={setPayload}
              type="password"
              typeInput="password"
            />
            <InputField
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              label="Nhập lại mật khẩu mới"
              value={payload.password2}
              setValue={setPayload}
              type="password2"
              typeInput="password"
            />
          </div>

          <div className="flex justify-end w-full">
            <LongButton height='44px' width='100px' backgroundColor='#1B4B66' color='white' size='14px'>
                <p>Xác nhận</p>
            </LongButton>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
