import { AmphareSize } from "../../store/type";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import { postNewAmphere, updateAmphereById } from "../../backend/amphere";
import useAppContext from "../../hooks/useAppContext";
import ButtonSave from "../UI/Button/ButtonSave";

const AmphereForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect, formProps } = state;
  const { data: _amphere, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_amphere as AmphareSize);

  const { error, setError, validator } = useResponseValidator();
  const { size, _id } = data as AmphareSize;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as AmphareSize);
    if (!error) {
      dispatch({ type: "SET_LOADING", payload: true });
      if (mode === "ADD_RECORD") {
        const response = await postNewAmphere(data as AmphareSize);
      } else {
        await updateAmphereById(data as AmphareSize, _id ?? "");
      }

      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    }
  };

  return (
    <>
      <Heading heading="User Registration Form" />
      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mr-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Size in Amphere
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={setValue}
            id="name"
            placeholder="Size in Amphere"
            value={size}
          />
        </div>
        <ButtonSave />
      </form>
    </>
  );
};

export default AmphereForm;
