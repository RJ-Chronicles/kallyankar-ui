import { GSTValues } from "../../store/type";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import { postNewGST, updateGSTById } from "../../backend/gst";
import useAppContext from "../../hooks/useAppContext";

const GSTForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect, formProps } = state;
  const { data: _gst, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_gst as GSTValues);

  const { error, setError, validator } = useResponseValidator();
  const { gst: gstValue, _id } = _gst as GSTValues;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as GSTValues);
    if (!error) {
      dispatch({ type: "SET_LOADING", payload: true });
      if (mode === "ADD_RECORD") {
        const response = await postNewGST(data as GSTValues);
      } else {
        await updateGSTById(data as GSTValues, _id ?? "");
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
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            GST
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={setValue}
            id="name"
            placeholder="GST"
            value={gstValue}
          />
        </div>
        <ButtonLarge title="register now" type="submit" />
      </form>
    </>
  );
};

export default GSTForm;
