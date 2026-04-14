import "./UnderConstruction.css";

const UnderConstruction = () => {
  return (
    <div className="construction-container">
      <div className="construction-animation">
        <div className="cone"></div>
        <div className="hammer"></div>
      </div>
      <h1 className="construction-title">Page Under Construction</h1>
      <p className="construction-text">
        We are working hard to bring you something amazing!
      </p>
    </div>
  );
};

export default UnderConstruction;
