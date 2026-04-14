import { useSelector } from "react-redux";
import { TrophySpin } from "react-loading-indicators";

function Loader() {
  const isLoading = useSelector((state: any) => state.loader.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* <FourSquare color="#008080" size="medium" />
      <BlinkBlur color="#32cd32" size="medium" text="" textColor="" />
      <BlinkBlur color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} /> */}
      {/* <Comme0t color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} /> */}
      <TrophySpin color={["#123ea8"]} />
    </div>
  );
}

export default Loader;
