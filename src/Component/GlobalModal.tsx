import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector, useDispatch } from "react-redux";

import { MODAL_COMPONENTS } from "../Modal/ModalComponent";
import { closeModal } from "../Redux/Slice/ModalSlice";

const GlobalModal = () => {
  const dispatch = useDispatch();
  const {  modalname,data } = useSelector((state: any) => state.modal);

  const handleClose = () => dispatch(closeModal());

  if (!modalname) return null;
  //@ts-ignore
  const Component = MODAL_COMPONENTS[modalname];

  if (!Component) return null;

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth={data?.size || "md"}
    >
      {/* Header */}
      <DialogTitle sx={{ display: "flex",fontSize:25,fontWeight:600,justifyContent: "space-between", }}>
        {data?.title}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderBottomWidth: 2, borderColor: "gray" }} />

      {/* Full Component Render */}
      <DialogContent sx={{ p: 2 }}>
        <Component {...data} onClose={handleClose} />
      </DialogContent>
      <Divider sx={{ borderBottomWidth: 2, borderColor: "gray" }} />
    </Dialog>
  );
};

export default GlobalModal;
