import InputBox from "../UI/Input/InputBox";
import Form from "../UI/Form";
import ButtonLarge from "../UI/Button/ButtonLarge";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { user, RequestConfig, UserLoggedIn } from "../../store/type";
import useHandleFormSubmit from "../../hooks/useHandleFormSubmit";
import { useNavigate } from "react-router-dom";
import useInitalFetch from "../../hooks/useInitialFetch";
import { userLoginRequest } from "../../api/admin";
import { useSession } from "../../session";
import { snackBarErrorMessage, snackBarSuccessMessage } from "../../api";

const LoginForm = () => {
  const naviage = useNavigate();
  const { setValue, data } = useHandlevalueChange(user);
  const { handleSubmit } = useHandleFormSubmit();
  const { fetchOnetimeItems } = useInitalFetch();
  const { login } = useSession();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: UserLoggedIn = await handleSubmit(
      data,
      userLoginRequest,
      "You have been successfuly loggedIn",
      "Error while loggedIn!"
    );
    const { token, user, expiresIn } = response;
    if (!token || !user || !expiresIn) {
      naviage("/");
      return;
    }
    const User = {
      user,
      token,
      expiresIn,
      isLoggedIn: true,
    };
    login(User);
    setTimeout(() => {
      fetchOnetimeItems("ALL");
      naviage("/admin/dashboard");
    }, 5000);
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
