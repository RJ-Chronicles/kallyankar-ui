import Overlay from "./Overlay";
import ButtonLarge from "./Button/ButtonLarge";
const ErrorModal: React.FC<{
  children: React.ReactNode;
  open: boolean;
  errorMessage: string;
}> = ({ children, open, errorMessage }) => {
  return (
    <>
      <Overlay open={open} handleClose={() => {}} widthSize="md">
        <div className="w-96 h-52 font-sans text-center flex justify-center items-center flex-col ">
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4  h-full"
            role="alert"
          >
            <p className="font-bold ">{errorMessage}</p>
            <p className="my-6 text-justify">
              Something not ideal might be happening. Check your internet
              connection or try to login again.
            </p>
            <ButtonLarge addNewItem={() => {}} title="Logout" type="button" />
          </div>
        </div>
      </Overlay>
      {children}
    </>
  );
};

export default ErrorModal;
