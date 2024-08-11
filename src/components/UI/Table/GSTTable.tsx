import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { Edit2, Trash2 } from "lucide-react";
import useDateFormater from "../../../hooks/useDateFormater";
import { useAnimation } from "../../../hooks";
import ButtonHeader from "../Button/ButtonHeader";
import Nothing from "../Nothing";

const GSTTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const { GST, isLoading } = state;

  const { dateFormater } = useDateFormater();
  const { snackbarAnimation } = useAnimation();

  const deleteButtonHandler = (id: string) => {
    dispatch({
      type: "ADD_DELETE_MODAL_PROPS",
      payload: {
        id,
        mode: "GST",
        title: "Do you want to delete this record!",
      },
    });

    dispatch({ type: "SET_DELETE_MODAL_VISIBLE", payload: true });
  };

  const addRecordHandler = () => {
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: { gst: 0 },
        mode: "ADD_RECORD",
        type: "GST",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };

  const editRecordHandler = (id: string) => {
    const record = GST.find((item) => item._id === id);
    if (!record) {
      snackbarAnimation("No such record present with given id", "warning");
      return;
    }
    dispatch({
      type: "SET_FORM_PROPS",
      payload: {
        data: record,
        mode: "UPDATE_RECORD",
        type: "GST",
        title: "Update Battery record",
      },
    });
    dispatch({ type: "HIDE_SHOW_FORM", payload: true });
  };
  const showNothing = !isLoading && GST.length === 0;
  return (
    <div className="relative   p-5">
      <ButtonHeader buttonClick={addRecordHandler} />

      {showNothing ? (
        <Nothing
          heading="No Record"
          subHeading="Please add records to see..."
        />
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden font-sans">
          <thead className="bg-indigo-600 text-white ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                GST
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Created At
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll w-full max-h-60">
            {GST.map((element, index) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-base hover:bg-gray-50"
              >
                <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                  {element.gst}
                </td>
                <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider">
                  {dateFormater(element.createdAt ?? "")}
                </td>
                <td className="px-6 py-3 text-left text-xs  uppercase tracking-wider flex items-center space-x-3">
                  <button
                    onClick={() => deleteButtonHandler(element._id ?? "")}
                    name={element._id}
                    className="text-red-600 hover:text-red-800 transition-colors duration-150"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => editRecordHandler(element._id ?? "")}
                    name={element._id}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                  >
                    <Edit2 size={20} />
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

export default GSTTable;
