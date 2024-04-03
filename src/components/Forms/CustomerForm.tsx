import { Customer } from "../../store/type";
import Overlay from "../UI/Overlay";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewCustomer } from "../../backend/customer";
import useResponseValidator from "../../hooks/useResponseValidator";
import useAppContext from "../../hooks/useAppContext";

interface Props {
  customer: Customer;
  showForm: boolean;
  closeForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomerForm: React.FC<Props> = ({ customer, closeForm, showForm }) => {
  const { state, dispatch } = useAppContext();
  const { setValue, data } = useHandlevalueChange(customer);

  const { name, last_name, address, email, contact, gst_number } =
    data as Customer;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validator(data as Customer);
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await postNewCustomer(data as Customer);

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "REFRESH_EFFECT", payload: !state.refreshEffect });

    console.log(response);
  };

  return (
    <Overlay open={showForm} handleClose={closeForm} showButton={true}>
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
                name="name"
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
                name="last_name"
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
              name="address"
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
              name="email"
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
              name="contact"
              id="contact"
              type="number"
              placeholder="Contact"
              onChange={setValue}
              value={contact}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="gst_number"
            >
              GST Number
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="gst_number"
              id="gst_number"
              type="text"
              placeholder="Customer GST Number"
              onChange={setValue}
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
