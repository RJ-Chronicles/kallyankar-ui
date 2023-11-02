export interface User {
  _id?: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
  createdBy: string;
  deleted: boolean;
}

export interface Login {
  email: string;
  password: string;
}
export interface UserLoggedIn {
  user: User;
  token: string;
  expiration: string | any;
  isLoggedIn: boolean;
}
export interface FormProps {
  initial_data: {};
  mode: string;
  title: string;
}

export interface DeleteModalFormProps {
  id: string;
  mode: string;
  title: string;
}

export interface StoredCartItemsProps {
  GST: string;
  customer: string;
  name: string;
  price: string;
  serial_number: string;
  type: string;
  vehicle_name?: string;
  vehicle_number?: string;
}

export interface AmphareSize {
  _id: string;
  size: number;
  createdAt: string;
}

export interface BatteryNameValues {
  _id: string;
  name: number;
  createdAt: string;
}

export interface GSTValues {
  _id: string;
  gst: number;
  createdAt: string;
}

export interface Customer {
  _id?: string;
  name: string;
  last_name: string;
  address: string;
  email: string;
  contact: number;
  gst_number: string;
}

export interface State {
  token: string | undefined;
  user: User;
  loggedIn: UserLoggedIn;
  GST: GSTValues[];
  batteryNames: BatteryNameValues[];
  amphere: AmphareSize[];
  storedCartItems: StoredCartItemsProps;
  deleteModalFormProps: DeleteModalFormProps;
  formProps: FormProps;
  refreshEffect: boolean;
  isLoggedIn: boolean;
  isModalVisible: boolean;
  isDeleteModalVisible: boolean;
  error: { hasError: boolean; message: string };
  isLoading: boolean;
  customer: Customer[] | [];
  snackbar: { isOpen: boolean; message: string; severity: Severity };
}

export const initialUser: User = {
  name: "",
  last_name: "",
  email: "",
  role: "",
  createdBy: "",
  deleted: false,
};

export const initialFormProps: FormProps = {
  initial_data: {},
  mode: "",
  title: "",
};

export const initialDeleteFormProps: DeleteModalFormProps = {
  id: "",
  mode: "",
  title: "",
};

export const initialStoredCartItems: StoredCartItemsProps = {
  GST: "",
  customer: "",
  name: "",
  price: "",
  serial_number: "",
  type: "",
  vehicle_name: "",
  vehicle_number: "",
};

export const initialAmphere: AmphareSize[] = [
  {
    _id: "",
    size: 0,
    createdAt: "",
  },
];

export const initialBatteryNames: BatteryNameValues[] = [
  {
    _id: "",
    name: 0,
    createdAt: "",
  },
];

export const initialGST: GSTValues[] = [
  {
    _id: "",
    gst: 0,
    createdAt: "",
  },
];

export const initialUserLoggedIn: UserLoggedIn = {
  user: initialUser,
  token: "",
  expiration: "",
  isLoggedIn: false,
};

export const customer: Customer = {
  name: "",
  last_name: "",
  address: "",
  email: "",
  contact: 7798689539,
  gst_number: "",
};

export interface Headers {
  headers: {
    Authorization: string;
  };
}

export const user: Login = {
  email: "",
  password: "",
};

export type UserFormData = Customer | User | Login;

export type Request = "GET" | "POST" | "DELETE" | "PATCH";

export type Severity = "success" | "error" | "warning" | "info";

export interface RequestConfig {
  method: Request;
  url: string;
  headers?: Headers;
  success: string;
  error: string;
}
