import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../Redux/Slice/LoaderSlice";


export const UseLoader = () => {
  const dispatch = useDispatch();
  const startLoading = () => dispatch(showLoader());
  const stopLoading = () => dispatch(hideLoader());
  return { stopLoading, startLoading };
};
