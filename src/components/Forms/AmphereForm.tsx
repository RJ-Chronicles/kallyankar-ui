import { AmphareSize } from "../../store/type";
import Overlay from "../UI/Overlay";
import ButtonLarge from "../UI/Button/ButtonLarge";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import { postNewAmphere } from "../../backend/amphere";
interface Props {
  amphere: AmphareSize;
}
const AmphereForm: React.FC<Props> = ({ amphere }) => {
  const { setValue, data } = useHandlevalueChange(amphere);
  const { error, setError, validator } = useResponseValidator();
  const { size } = amphere as AmphareSize;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as AmphareSize);
    if (!error) {
      const response = await postNewAmphere(data as AmphareSize);
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
        <ButtonLarge title="register now" type="submit" />
      </form>
    </Overlay>
  );
};

export default AmphereForm;

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
