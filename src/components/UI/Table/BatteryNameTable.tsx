import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { AMPHERE_TABLE_COLUMN } from "./columns";
import Table from "./Table";
import { Pencil, Trash2 } from "lucide-react";

const BatteryNameTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const { batteryNames } = state;

  const handleDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.name;
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

  return (
    <>
      {batteryNames?.length === 0 ? (
        <div>No record found</div>
      ) : (
        <div className="flex items-center justify-center flex-col w-full">
          <Table column={AMPHERE_TABLE_COLUMN}>
            {batteryNames.map((element, index) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
              >
                <td className="px-3 py-4">{element.name}</td>
                <td className="px-3 py-4">{element.createdAt}</td>
                <td className="flex items-center px-3 py-4 space-x-3">
                  <button
                    onClick={handleDeleteModal}
                    name={element._id}
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    <Trash2 color="red" />
                  </button>
                  <button
                    // onClick={handleDeleteModalVisibility}
                    name={element._id}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <Pencil />
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}
    </>
  );
};

export default BatteryNameTable;
