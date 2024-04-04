import useAppContext from "../../hooks/useAppContext";
import AmphereForm from "../Forms/AmphereForm";
import CustomerForm from "../Forms/CustomerForm";
import Overlay from "./Overlay";

const FormModal: React.FC<{ showForm: boolean }> = ({ showForm }) => {
  const { dispatch, state } = useAppContext();
  const { type } = state.formProps;
  const handleOverlayClose = () => {
    dispatch({ type: "HIDE_SHOW_FORM", payload: false });
  };

  return (
    <Overlay handleClose={handleOverlayClose} open={showForm} showButton={true}>
      {type === "CUSTOMER" && <CustomerForm />}
      {/* {type === 'AMPHERE' && <AmphereForm/>} */}
    </Overlay>
  );
};

export default FormModal;
