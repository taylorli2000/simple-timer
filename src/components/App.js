import { Container } from "react-bootstrap";
import Timer from "./timer";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ minWidth: "550px" }}>
        <Timer />
      </div>
    </Container>
  );
}

export default App;
