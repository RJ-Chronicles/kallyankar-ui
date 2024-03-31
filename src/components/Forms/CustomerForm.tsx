import { Customer } from "../../store/type";
import Overlay from "../UI/Overlay";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewCustomer } from "../../backend/customer";
import useResponseValidator from "../../hooks/useResponseValidator";

interface Props {
  customer: Customer;
}
const CustomerForm: React.FC<Props> = ({ customer }) => {
  const { setValue, data } = useHandlevalueChange(customer);
  const { error, setError, validator } = useResponseValidator();
  const { name, last_name, address, email, contact, gst_number } =
    data as Customer;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as Customer);
    if (!error) {
      const response = await postNewCustomer(data as Customer);
    }
  };

  return (
    <Overlay open={true} handleClose={() => {}} showButton={true}>
      <Heading heading="Customer Registration Form" />
      <div className="w-full  bg-white p-5 rounded-lg lg:rounded-l-none">
        <form
          className="px-8 pt-6 pb-4 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                onChange={setValue}
                value={name}
              />
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                onChange={setValue}
                value={last_name}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
              onChange={setValue}
              value={address}
            />
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
              id="email"
              type="email"
              placeholder="Email"
              onChange={setValue}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="contact"
              type="number"
              placeholder="Contact"
              onChange={(e) => setValue}
              value={contact}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="gst_num"
            >
              GST Number
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="gst_num"
              type="text"
              placeholder="Customer GST Number"
              onChange={(e) => setValue}
              value={gst_number}
            />
          </div>
          <ButtonLarge title="register now" type="submit" />
          <hr className="mb-6 border-t" />
        </form>
      </div>
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

{
  /* <Form handleSubmit={() => {}} maxWidth="w-[600px]">
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
      </Form> */
}
