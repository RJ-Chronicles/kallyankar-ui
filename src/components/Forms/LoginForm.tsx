import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { user, Login } from "../../store/type";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import useResponseValidator from "../../hooks/useResponseValidator";
import { postUserLogin } from "../../backend/user";
import { useAuthContext } from "../../context/AuthContext";
import useAnimation from "../../hooks/useAnimation";
import ButtonSave from "../UI/Button/ButtonSave";

const LoginForm = () => {
  const naviage = useNavigate();
  const { data, setValue } = useHandlevalueChange(user);
  const { state, dispatch } = useAppContext();
  const { error, setError, validator } = useResponseValidator();
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const auth = useAuthContext();
  const { email, password } = data as Login;

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
      spinnerAnimationStart();
      try {
        const response = await postUserLogin(data as Login);
        snackbarAnimation("Succesfully Login", "success");
        dispatch({ type: "SET_LOADING", payload: false });
        const expirationTime = new Date(
          new Date().getTime() + response.expiresIn * 1000
        );
        const expiration = expirationTime.toISOString();
        const { token, user } = response;
        userLoginHandler(token, expiration, user);
        naviage("/admin/dashboard");
        spinnerAnimationStart();
      } catch (error) {
        spinnerAnimationStop();
        snackbarAnimation("Fail to load Initial Data...", "error");
        let message = "ERROR OCCURED!";
        if (error instanceof Error) {
          message = error.message;
        }
        dispatch({ type: "SET_ERROR", payload: { hasError: true, message } });
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="px-20 py-5 text-[#333300]">
      <div className="mb-4 w-full">
        <label className="block mb-2 text-sm font-bold " htmlFor="email">
          Admin Email.
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          name="email"
          id="email"
          type="text"
          placeholder="Email"
          onChange={setValue}
          value={email}
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 text-sm font-bold " htmlFor="password">
          Admin Password.
        </label>
        <input
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={setValue}
          value={password}
        />
      </div>
      <ButtonSave title="Login" />
    </form>
  );
};

export default LoginForm;
