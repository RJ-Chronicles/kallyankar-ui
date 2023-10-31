import { useState } from "react";
import InputBox from "../UI/Input/InputBox";
import { userColumns } from "./user-fields";
import { User } from "../../store/type";
import Overlay from "../UI/Overlay";
import Form from "../UI/Form";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
interface Props {
  owner: User;
}
const UserForm: React.FC<Props> = ({ owner }) => {
  const [user, setUser] = useState<User>({ ...owner });

  const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Overlay open={true} handleClose={() => {}}>
      <Heading heading="User Registration Form" />
      <Form handleSubmit={handleSubmit} maxWidth="w-[600px]">
        {userColumns.map((field, index) => (
          <InputBox
            key={index}
            label={field.label}
            id={field.id}
            type={field.type}
            width={field.width}
            margin={field.margin}
            setValue={handleSetUser}
            required={field.required}
          />
        ))}
        <ButtonLarge title="register now" addNewItem={() => {}} type="submit" />
      </Form>
    </Overlay>
  );
};

export default UserForm;
