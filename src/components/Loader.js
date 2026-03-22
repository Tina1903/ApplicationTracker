import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "60px",
          height: "60px",
          marginBottom: "15px",
        }}
      />

      <p style={{ fontSize: "16px", color: "#666" }}>Loading your jobs...</p>
    </div>
  );
};

export default Loader;
