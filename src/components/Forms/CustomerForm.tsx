import { Customer } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import { postNewCustomer, updateCustomerById } from "../../backend/customer";

import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";
import { CustomerSchema } from "../../zod";
import useAnimation from "../../hooks/useAnimation";
import { ERRORS } from "../../zod/zod_error";

const CustomerForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect, formProps } = state;
  const { data: _customer, title, mode } = formProps;
  console.log(formProps);
  const { setValue, data } = useHandlevalueChange(_customer as Customer);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const { name, last_name, address, email, contact, gst_number, _id } =
    data as Customer;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { contact } = data as Customer;
    const validate = CustomerSchema.safeParse({
      ...data,
      contact: contact.toString(),
    } as Customer);
    if (!validate.success) {
      const errors = validate.error.flatten();
      const { name, last_name, contact, email, address } = errors.fieldErrors;
      address && snackbarAnimation(ERRORS.ADDRESS, "error");
      email && snackbarAnimation(ERRORS.EMAIL, "error");
      contact && snackbarAnimation(ERRORS.CONTACT, "error");
      last_name && snackbarAnimation(ERRORS.LAST_NAME, "error");
      name && snackbarAnimation(ERRORS.NAME, "error");
      return;
    }
    try {
      spinnerAnimationStart();
      dispatch({ type: "HIDE_SHOW_FORM", payload: false });
      if (mode === "ADD_RECORD") {
        const response = await postNewCustomer(data as Customer);
      } else {
        await updateCustomerById(data as Customer, _id ?? "");
      }
      spinnerAnimationStop();
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    } catch (err) {
      spinnerAnimationStop();
      snackbarAnimation(ERRORS.FAILURE, "error");
    }
  };

  return (
    <>
      <Heading heading={`${title ?? "Customer Registration Form"} `} />
      <div className="w-full  bg-white p-5 rounded-lg lg:rounded-l-none">
        <form
          className="px-8 pt-6 pb-4 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
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
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
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
          <div className="mb-4 md:mr-2">
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
          <div className="mb-4 md:mr-2">
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
          <div className="mb-4 md:mr-2">
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
          <div className="mb-4 md:mr-2">
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
          <ButtonSave />
          <hr className="mb-6 border-t" />
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
