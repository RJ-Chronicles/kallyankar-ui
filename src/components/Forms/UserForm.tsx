import { useState } from "react";

import { User } from "../../store/type";
import Overlay from "../UI/Overlay";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewUser } from "../../backend/user";
interface Props {
  user: User;
}
const UserForm: React.FC<Props> = ({ user }) => {
  const { setValue, data } = useHandlevalueChange(user);

  const { name, last_name, email, role } = data as User;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Overlay open={true} handleClose={() => {}}>
      <Heading heading="User Registration Form" />
      <div className="w-full  bg-white px-5 rounded-lg lg:rounded-l-none">
        <form
          className="px-8 pt-6 pb-4 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                User Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="User Name"
                onChange={setValue}
                value={name}
                required
              />
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="l_name"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="l_name"
                type="text"
                placeholder="Last Name"
                onChange={setValue}
                value={last_name}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="email"
              required
              onChange={setValue}
              id="email"
              placeholder="Username"
              value={email}
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              defaultValue={user.role}
              onChange={setValue}
              id="role"
            >
              <option value="DEFAULT">Choose a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <ButtonLarge title="register now" type="submit" />
        </form>
      </div>
    </Overlay>
  );
};

export default UserForm;

{
  /* <Form handleSubmit={handleSubmit} maxWidth="w-[600px]">
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

</Form> */
}
