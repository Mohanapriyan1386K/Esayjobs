import { useDispatch } from "react-redux";
import CustomButton from "../Component/CustomButton";
import { logout } from "../Redux/Slice/authSlice";
import { closeModal } from "../Redux/Slice/ModalSlice";
import toast from "react-hot-toast";
import { UseLoader } from "../Hooks/UseLoder";
import { deletePost } from "../Service/Service";
function ConfirmationModal({ userdata, id, type,onok }: any) {
  const { startLoading, stopLoading } = UseLoader();
  const dispatch = useDispatch();

  const handleConfirm = () => {
    startLoading();

    setTimeout(() => {
      stopLoading();

      if (type === "logout") {
        dispatch(logout());
        window.location.href = "/jobs";
        toast.success("Logged out successfully");
      }

      if (type === "delete") {
          deletePost(id).then((res)=>{
            if(res.status==200){
             toast.success(res?.data?.message)
             onok()
            }
          })
      }

      dispatch(closeModal());
    }, 600);
  };

  const getMessage = () => {
    if (type === "logout") {
      return `Are you sure you want to log out, ${
        userdata?.user?.name ?? ""
      }?`;
    }

    if (type === "delete") {
      return `Are you sure you want to delete this item?`;
    }

    return "Are you sure you want to continue?";
  };

  const getButtonLabel = () => {
    if (type === "logout") return "Logout";
    if (type === "delete") return "Delete";
    return "Confirm";
  };

  return (
    <div>
      <p>{getMessage()}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 20,
          gap: 20,
        }}
      >
        <CustomButton label="Cancel" variant="contained" />

        <CustomButton
          label={getButtonLabel()}
          backgroundColor="red"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}

export default ConfirmationModal;