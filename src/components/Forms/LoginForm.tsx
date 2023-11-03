import InputBox from "../UI/Input/InputBox";
import Form from "../UI/Form";
import ButtonLarge from "../UI/Button/ButtonLarge";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { api } from "../../api";
import { user, RequestConfig, UserLoggedIn } from "../../store/type";
import useHandleFormSubmit from "../../hooks/useHandleFormSubmit";
import AppContext from "../../store/AppContext";
import { useContext } from "react";

const LoginForm = () => {
  const requestMeta: RequestConfig = {
    method: "POST",
    url: api.user_Login,
    headers: {
      headers: {
        Authorization: "",
      },
    },
    success: "Login successful",
    error: "Error while logging",
  };

  const { setValue, data } = useHandlevalueChange(user);
  const { handleSubmit } = useHandleFormSubmit();
  const { dispatch } = useContext(AppContext);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: UserLoggedIn = await handleSubmit(data, requestMeta);
    const { token, user, expiresIn } = response;
    const payload = {
      user,
      token,
      expiresIn,
      isLoggedIn: true,
    };
    dispatch({ type: "USER_LOG_IN", payload: payload });
    console.log(user, expiresIn, token);
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
        <ButtonLarge title="Login" addNewItem={() => {}} />
      </div>
    </Form>
  );
};

export default LoginForm;
