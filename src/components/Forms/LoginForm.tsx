import InputBox from "../UI/Input/InputBox";
import Form from "../UI/Form";
import ButtonLarge from "../UI/Button/ButtonLarge";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { user, Login } from "../../store/type";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import useResponseValidator from "../../hooks/useResponseValidator";
import { postUserLogin } from "../../backend/user";
import useToken from "../../hooks/useAuthentication";
import { useAuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const naviage = useNavigate();
  const { setValue, data } = useHandlevalueChange(user);
  const { state, dispatch } = useAppContext();
  const { error, setError, validator } = useResponseValidator();

  const auth = useAuthContext();

  const { isLoggedIn, userLoginHandler } = auth;
  useEffect(() => {
    if (isLoggedIn) {
      naviage("admin/dashboard");
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as Login);
    if (!error) {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await postUserLogin(data as Login);
      dispatch({ type: "SET_LOADING", payload: false });
      const expirationTime = new Date(
        new Date().getTime() + response.expiresIn * 1000
      );
      const expiration = expirationTime.toISOString();
      const { token, user } = response;
      userLoginHandler(token, expiration, user);
      naviage("/admin/dashboard");
    }
  };

  return (
    <Form handleSubmit={handleFormSubmit} maxWidth="720px">
      <InputBox
        label="Email Address"
        type="email"
        id="email"
        setValue={setValue}
      />
      <InputBox
        label="Password Address"
        type="password"
        id="password"
        setValue={setValue}
      />
      <div className="flex justify-center items-end w-full px-2">
        <ButtonLarge title="Login" />
      </div>
    </Form>
  );
};

export default LoginForm;

// const response: UserLoggedIn = await handleSubmit(
//   data,
//   userLoginRequest,
//   "You have been successfuly loggedIn",
//   "Error while loggedIn!"
// );
// const { token, user, expiresIn } = response;

// if (!token || !user || !expiresIn) {
//   naviage("/");
//   return;
// }
// const User = {
//   user,
//   token,
//   expiresIn,
//   isLoggedIn: true,
// };
