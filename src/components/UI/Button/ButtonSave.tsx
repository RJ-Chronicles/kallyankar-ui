type ButtonSaveProps = {
  title?: string;
  type?: "button" | "submit";
};
import React from "react";

const ButtonSave: React.FC<ButtonSaveProps> = ({
  title = "Submit",
  type = "submit",
}) => {
  return (
    <div className="w-full">
      <button
        type={type}
        className="px-10 py-2 my-0 font-normal tracking-widest uppercase border-2 border-black font-sans hover:border-slate-50 hover:bg-gradient-to-r from-teal-500 to-indigo-600 hover:shadow-md  hover:text-white w-full"
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonSave;
