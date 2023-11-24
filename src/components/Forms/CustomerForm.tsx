import { useState } from "react";
import InputBox from "../UI/Input/InputBox";
import { customer_fields } from "./customer-fields";
import { Customer } from "../../store/type";
import Overlay from "../UI/Overlay";
import Form from "../UI/Form";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandleFormSubmit from "../../hooks/useHandleFormSubmit";
import useHandlevalueChange from "../../hooks/useHandleValueChange";

interface Props {
  customer: Customer;
}
const CustomerForm: React.FC<Props> = ({ customer }) => {
  const { setValue, data } = useHandlevalueChange(customer);
  //const { handleSubmit } = useHandleFormSubmit(data);

  return (
    <Overlay open={true} handleClose={() => {}} showButton={true}>
      <Heading heading="Customer Registration Form" />
      <Form handleSubmit={() => {}} maxWidth="w-[600px]">
        {customer_fields.map((field, index) => (
          <InputBox
            key={index}
            label={field.label}
            id={field.id}
            type={field.type}
            width={field.width}
            margin={field.margin}
            setValue={setValue}
            required={field.required}
          />
        ))}
        <ButtonLarge title="register now" addNewItem={() => {}} type="submit" />
      </Form>
    </Overlay>
  );
};

export default CustomerForm;

// const [user, setUser] = useState<Customer>({ ...customer });

// const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// };
// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
// };
