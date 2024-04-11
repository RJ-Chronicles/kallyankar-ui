import useDateFormater from "../../../hooks/useDateFormater";
import { Customer } from "../../../store/type";
import React from "react";
import invoiceLogo from "../../svg/InvoiceLogo.svg";
const InvoiceHeading: React.FC<{ customer: Customer | null }> = ({
  customer,
}) => {
  const { dateFormater } = useDateFormater();

  return (
    <>
      <div className="flex flex-col p-4  bg-white  rounded-xl dark:bg-gray-800">
        <div className="flex justify-between">
          <img src={invoiceLogo} alt="Invoice logo" />
          <div className="text-right h-full mt-20">
            <h2 className="text-xl md:text-xl font-semibold text-gray-800 dark:text-gray-200">
              GSTN-27ARIPK2620F1Z2
            </h2>

            <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
              Shinde complex, main-road Gargoti
              <br />
              Bhudargad, Kolhapur, PIN: 416209 <br />
              contact &nbsp; 9420007273,7745047273
              <br />
            </address>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Bill to:
            </h3>
            <p className="text-base font-medium text-gray-800 dark:text-gray-200">
              {customer?.name + " " + customer?.last_name}
            </p>
            <address className=" not-italic text-gray-500">
              {`Address : ${customer?.address}`}
              <br />
              {`Contact : ${customer?.contact}`}
            </address>
            {customer?.gst_number && (
              <p className="not-italic text-gray-500">
                {`GST Number : ${customer?.gst_number}`}
              </p>
            )}
          </div>

          <div className="sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Billing date:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {dateFormater(new Date().toString())}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceHeading;
