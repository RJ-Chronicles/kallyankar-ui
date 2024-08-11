import {
  BatteryIcon,
  DownloadCloud,
  IndianRupeeIcon,
  SmartphoneIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { getBillingList } from "../backend/billing";
import { getCustomerList } from "../backend/customer";
import { getProductList } from "../backend/product";
import { getStockList } from "../backend/stock";
import TitleScreen from "../components/UI/TitleScreen";
import { useAnimation } from "../hooks";
import { Billing, Customer, Product, STOCK } from "../store/type";
type Selection = "CUSTOMER" | "STOCK" | "PAYMENT" | "PRODUCT";
interface BackupCardProps {
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
}

const BackupCard: React.FC<BackupCardProps> = ({
  title,
  icon,
  handleClick,
}) => (
  <div className="w-full">
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 group hover:scale-105 transform transition-transform duration-300 m-4 rounded-md text-[#EEA47F] pt-6 px-5 shadow-lg">
      <div className="w-full flex justify-center items-center mb-4">{icon}</div>
      <p className="text-white font-semibold text-xl font-serif text-center mb-4 tracking-widest">
        {title}
      </p>
      <div className="flex justify-center items-center h-full">
        <CustomButton onClick={handleClick}>
          <DownloadCloud size={24} />
        </CustomButton>
      </div>
    </div>
  </div>
);

const SettingsPage = () => {
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();
  const handleBackupRecords = async (type: Selection) => {
    let exportData: (Customer | STOCK | Product | Billing)[] | null = null;
    try {
      spinnerAnimationStart();
      switch (type) {
        case "CUSTOMER":
          exportData = await getCustomerList();
          break;
        case "PAYMENT":
          exportData = await getBillingList();
          break;
        case "STOCK":
          exportData = await getStockList();
          break;
        case "PRODUCT":
          exportData = await getProductList();
          break;
      }
      snackbarAnimation(`${type.toLowerCase()} has been exported`, "success");
    } catch (err) {
      snackbarAnimation(
        `Problem while exporting ${type.toLowerCase()} data`,
        "error"
      );
    }
    spinnerAnimationStop();
  };

  const cardsData: BackupCardProps[] = [
    {
      title: "Export Customer Data",
      icon: <UserIcon size={40} />,
      handleClick: () => handleBackupRecords("CUSTOMER"),
    },
    {
      title: "Export Billing Data",
      icon: <IndianRupeeIcon size={40} />,
      handleClick: () => handleBackupRecords("PAYMENT"),
    },
    {
      title: "Export Products Data",
      icon: <BatteryIcon size={40} />,
      handleClick: () => handleBackupRecords("PRODUCT"),
    },
    {
      title: "Export Stock Data",
      icon: <SmartphoneIcon size={40} />,
      handleClick: () => handleBackupRecords("STOCK"),
    },
  ];

  return (
    <div>
      <TitleScreen
        pageTitle="Daily take backup of your data..."
        onAddRecord={() => {}}
        isVisible={false}
      />
      <div className="p-10">
        <div className="flex flex-col md:flex-row justify-center mx-20 space-y-6 md:space-y-0 md:space-x-6">
          {cardsData.map((card, index) => (
            <BackupCard
              key={index}
              title={card.title}
              icon={card.icon}
              handleClick={card.handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 w-full text-white font-bold py-2 px-6 rounded-md shadow-lg transition-all animate-fadeInUp my-4 flex justify-center"
    >
      {children}
    </button>
  );
};

export default SettingsPage;
