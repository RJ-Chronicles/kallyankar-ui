import useDateFormater from "../../../hooks/useDateFormater";
import { Customer } from "../../../store/type";
import React from "react";
import invoiceLogo from "../../svg/InvoiceLogo.svg";

const InvoiceHeading: React.FC<{ customer?: Customer }> = ({ customer }) => {
  const { dateFormater } = useDateFormater();

  return (
    <div className="p-6 bg-white dark:bg-gray-800">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-6 md:space-y-0 md:space-x-8">
        <img src={invoiceLogo} alt="Invoice logo" className="w-32 h-auto" />
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            GSTN-27ARIPK2620F1Z2
          </h2>
          <address className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Shinde complex, main-road Gargoti
            <br />
            Bhudargad, Kolhapur, PIN: 416209
            <br />
            Contact: 9420007273, 7745047273
          </address>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Bill to:
          </h3>
          <p className="text-base font-medium text-gray-800 dark:text-gray-200">
            {customer?.name} {customer?.last_name}
          </p>
          <address className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Address: {customer?.address}
            <br />
            Contact: {customer?.contact}
            <br />
            {customer?.gst_number && `GST Number: ${customer?.gst_number}`}
          </address>
        </div>

        <div className="text-right">
          <dl className="text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <dt className="font-semibold text-gray-800 dark:text-gray-200">
                Billing date:
              </dt>
              <dd>{dateFormater(new Date().toString())}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeading;
