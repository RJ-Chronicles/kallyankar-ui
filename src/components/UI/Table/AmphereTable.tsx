import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { Edit2, Trash2 } from "lucide-react";
import ButtonHeader from "../Button/ButtonHeader";
import useDateFormater from "../../../hooks/useDateFormater";
import { useAnimation } from "../../../hooks";
import Nothing from "../Nothing";

const AmphereTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const { amphere, isLoading } = state;
  const { dateFormater } = useDateFormater();
  const { snackbarAnimation } = useAnimation();
  const deleteButtonHandler = (id: string) => {
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

  const addRecordHandler = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: { size: 0 },
        mode: "ADD_RECORD",
        type: "AMPHERE",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  const editRecordHandler = (id: string) => {
    const amp = amphere.find((item) => item._id === id);
    if (!amp) {
      snackbarAnimation("No such record present with given id", "warning");
      return;
    }
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: amp,
        mode: "UPDATE_RECORD",
        type: "AMPHERE",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  const showNothing = !isLoading && amphere.length === 0;
  return (
    <div className="relative   p-5">
      <ButtonHeader buttonClick={addRecordHandler} />
      {showNothing ? (
        <Nothing
          heading="No Record"
          subHeading="Please add records to see..."
        />
      ) : (
        <table className="w-full text-sm text-left text-gray-700 tracking-wider shadow-lg rounded-lg">
          <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-3 py-3">
                Size
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
            {amphere.map((element, index) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
              >
                <td className="px-3 py-4">{element.size}</td>
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

export default AmphereTable;
