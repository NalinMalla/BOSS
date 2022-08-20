import { useDispatch } from "react-redux";

import { updateIsAdmin } from "../redux/reducer/isAdmin";

export default function Logout(){
  const dispatch = useDispatch();
  dispatch(updateIsAdmin(false));
  localStorage.clear();
  window.location.href = "/";
}
