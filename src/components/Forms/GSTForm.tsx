import { GSTValues } from "../../store/type";
import Overlay from "../UI/Overlay";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import { postNewGST } from "../../backend/gst";
interface Props {
  gst: GSTValues;
}
const GSTForm: React.FC<Props> = ({ gst }) => {
  const { setValue, data } = useHandlevalueChange(gst);
  const { error, setError, validator } = useResponseValidator();
  const { gst: gstValue } = gst as GSTValues;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as GSTValues);
    if (!error) {
      const response = await postNewGST(data as GSTValues);
    }
  };
  return (
    <Overlay open={true} handleClose={() => {}}>
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
    </Overlay>
  );
};

export default GSTForm;
