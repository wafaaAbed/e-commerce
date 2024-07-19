import errorPage from "@assets/LottieFiles/404.json"
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Lottie from "lottie-react";
function Error() {
  return (
    <Container>
    <div
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "5%" }}
    >
      <Lottie animationData={errorPage}  style={{ width: "500px" }} />
      <Link to="/" replace={true}>
        How about going back to safety?
      </Link>
    </div>
  </Container>
  )
}

export default Error
