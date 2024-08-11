interface ButtonSmallProps {
  buttonClick: () => void;
  title?: string;
}

const ButtonHeader: React.FC<ButtonSmallProps> = ({
  buttonClick,
  title = "Add New",
}) => {
  return (
    <button
      onClick={buttonClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md shadow-lg transition-all animate-fadeInUp my-4"
    >
      {title}
    </button>
  );
};

export default ButtonHeader;
