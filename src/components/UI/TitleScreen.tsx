import React from "react";
interface Props {
  pageTitle: string;
  onAddRecord: () => void;
  isVisible?: boolean;
}

const TitleScreen: React.FC<Props> = ({
  pageTitle,
  onAddRecord,
  isVisible = true,
}) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500  text-white p-6  shadow-md">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight font-sans">
            {pageTitle}
          </h1>
          <p className="text-lg text-gray-200">{"Kalyankar Batteries"}</p>
        </div>
        {isVisible && (
          <button
            onClick={onAddRecord}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            Add Record
          </button>
        )}
      </div>
    </div>
  );
};

export default TitleScreen;
