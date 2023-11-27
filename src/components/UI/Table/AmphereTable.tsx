import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { AMPHERE_TABLE_COLUMN } from "./columns";
import Table from "./Table";
import { Pencil, Trash2 } from "lucide-react";

const AmphereTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const { amphere } = state;

  const deleteButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.name;
    dispatch({
      type: "ADD_DELETE_MODAL_PROPS",
      payload: {
        id,
        mode: "AMPHERE",
        title: "Do you want to delete this record!",
      },
    });

    dispatch({ type: "SET_DELETE_MODAL_VISIBLE", payload: true });
  };
  return (
    <>
      {amphere.length === 0 ? (
        <div>No record found</div>
      ) : (
        <div className="flex items-center justify-center flex-col w-full">
          <Table column={AMPHERE_TABLE_COLUMN}>
            {amphere.map((element, index) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
              >
                <td className="px-3 py-4">{element.size}</td>
                <td className="px-3 py-4">{element.createdAt}</td>
                <td className="flex items-center px-3 py-4 space-x-3">
                  <button
                    onClick={deleteButtonHandler}
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

export default AmphereTable;
