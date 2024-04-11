type ButtonSaveProps = {
  title?: string;
  type?: "button" | "submit";
};

const ButtonSave: React.FC<ButtonSaveProps> = ({
  title = "Submit",
  type = "submit",
}) => {
  return (
    <div className="w-full">
      <button
        type={type}
        className="px-10 py-2 my-0 font-bold tracking-widest uppercase border-2 border-black font-sans hover:bg-black  hover:text-white w-full"
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonSave;
