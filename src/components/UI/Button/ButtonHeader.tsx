//import { ReactComponent as Add} from '../svg/add.svg'

interface ButtonSmallProps {
  buttonClick: () => void;
  title?: string;
}

import { HiOutlineArrowRight } from "react-icons/hi";
import { Button } from "flowbite-react";
const ButtonHeader: React.FC<ButtonSmallProps> = ({
  buttonClick,
  title = "Add New",
}) => {
  return (
    <div className="flex justify-between items-center mx-auto w-full bg-white bg-gradient-to-r py-5 dark:bg-gray-900">
      <Button
        onClick={buttonClick}
        className="group relative text-white flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent bg-cyan-700 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 rounded-lg "
      >
        {title}
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default ButtonHeader;
