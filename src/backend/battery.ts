import { BatteryNameValues } from "../store/type";
import api from "./api";

const postNewBattery = async (battery: BatteryNameValues) => {
  const { data } = await api.post<BatteryNameValues>("battery/add", battery);
  return data;
};
const updateBatteryById = async (battery: BatteryNameValues, id: string) => {
  const { data } = await api.patch<BatteryNameValues>(
    "battery/update/" + id,
    battery
  );
  return data;
};
const deleteBatteryById = async (id: string) => {
  const { data } = await api.delete<BatteryNameValues>("battery/delete/" + id);
  return data;
};
const getBatteryList = async () => {
  const { data } = await api.get<BatteryNameValues[]>("battery/user_list-up");
  return data;
};

const getBatterySizeById = async (id: string) => {
  const { data } = await api.get<BatteryNameValues>("battery/seleted/" + id);
  return data;
};

export {
  postNewBattery,
  updateBatteryById,
  deleteBatteryById,
  getBatteryList,
  getBatterySizeById,
};
