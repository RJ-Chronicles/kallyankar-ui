import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { user, Login } from "../../store/type";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import { postUserLogin } from "../../backend/user";
import { useAuthContext } from "../../context/AuthContext";
import useAnimation from "../../hooks/useAnimation";
import ButtonSave from "../UI/Button/ButtonSave";
import { LoginSchema } from "../../zod";

const LoginForm = () => {
  const naviage = useNavigate();
  const { data, setValue } = useHandlevalueChange(user);
  const { dispatch } = useAppContext();
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const auth = useAuthContext();
  const { email, password } = data as Login;

  const { isLoggedIn, userLoginHandler } = auth;
  useEffect(() => {
    if (isLoggedIn) {
      naviage("admin/dashboard");
    }
  }, [isLoggedIn]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const testValid = LoginSchema.safeParse({ email, password });
      if (!testValid.success) {
        const errors = testValid.error.flatten();
        const { email, password } = errors.fieldErrors;
        email && snackbarAnimation("Email is not valid", "error");
        password && snackbarAnimation("Password is not valid", "error");
        return;
      }

      spinnerAnimationStart();
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
      spinnerAnimationStop();
    } catch (error) {
      spinnerAnimationStop();
      snackbarAnimation("Username or password incorrect!", "error");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="px-6 md:px-20 py-5 text-[#333300]"
    >
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
