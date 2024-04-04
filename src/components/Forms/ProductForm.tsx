import { Product } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";
import useResponseValidator from "../../hooks/useResponseValidator";
import useAppContext from "../../hooks/useAppContext";
import { postNewProduct, updateProductById } from "../../backend/product";

const ProductForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { refreshEffect, formProps, amphere } = state;
  const { data: _amphere, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_amphere as Product);

  const { error, setError, validator } = useResponseValidator();
  const { _id } = data as Product;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validator(data as Product);
    if (!error) {
      dispatch({ type: "SET_LOADING", payload: true });
      if (mode === "ADD_RECORD") {
        const response = await postNewProduct(data as Product);
      } else {
        await updateProductById(data as Product, _id ?? "");
      }

      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "REFRESH_EFFECT", payload: !refreshEffect });
    }
  };

  return (
    <>
      <Heading heading="Add Item to cart" />
    </>
  );
};

export default ProductForm;
