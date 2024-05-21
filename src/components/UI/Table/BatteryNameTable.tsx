import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { AMPHERE_TABLE_COLUMN } from "./columns";
import Table from "./Table";
import { Edit2, Pencil, Trash2 } from "lucide-react";
import { useAnimation } from "../../../hooks";
import useDateFormater from "../../../hooks/useDateFormater";
import { BatteryNameValues } from "../../../store/type";
import ButtonHeader from "../Button/ButtonHeader";

const BatteryNameTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const { batteryNames } = state;

  const handleDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {};
  const { dateFormater } = useDateFormater();
  const { snackbarAnimation } = useAnimation();

  const deleteButtonHandler = (id: string) => {
    dispatch({
      type: "ADD_DELETE_MODAL_PROPS",
      payload: {
        id,
        mode: "BATTERY_NAME",
        title: "Do you want to delete this record!",
      },
    });

    dispatch({ type: "SET_DELETE_MODAL_VISIBLE", payload: true });
  };

  const addRecordHandler = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: { name: "" },
        mode: "ADD_RECORD",
        type: "BATTERY",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  const editRecordHandler = (id: string) => {
    const battery = batteryNames.find((item) => item._id === id);
    if (!battery) {
      snackbarAnimation("No such record present with given id", "warning");
      return;
    }
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: battery,
        mode: "UPDATE_RECORD",
        type: "BATTERY",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  return (
    <div className="relative   p-5">
      <ButtonHeader buttonClick={addRecordHandler} />

      {batteryNames?.length === 0 ? (
        <div>No record found</div>
      ) : (
        <table className="w-full text-sm text-left text-gray-700 tracking-wider shadow-lg rounded-lg">
          <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-3 py-3">
                Battery Name
              </th>
              <th scope="col" className="px-3 py-3">
                Created At
              </th>

              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll w-full max-h-60">
            {batteryNames.map((element, index) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
              >
                <td className="px-3 py-4">{element.name}</td>
                <td className="px-3 py-4">
                  {dateFormater(element.createdAt ?? "")}
                </td>
                <td className="flex items-center px-3 py-4 space-x-3">
                  <button
                    onClick={() => deleteButtonHandler(element._id ?? "")}
                    name={element._id}
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    <Trash2 color="red" />
                  </button>
                  <button
                    onClick={() => editRecordHandler(element._id ?? "")}
                    name={element._id}
                    className="font-medium  hover:underline"
                  >
                    <Edit2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BatteryNameTable;
