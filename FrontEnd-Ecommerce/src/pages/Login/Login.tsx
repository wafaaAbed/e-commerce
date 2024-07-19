import { Alert, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import login from "@assets/LottieFiles/login.json"
import styles from "./styles.module.css";
import Lottie from "lottie-react";
import { Input } from "@Components/e-Commerce";
import { Navigate } from "react-router-dom";
import useLogin from "./useLogin";

const { bigContainer, leftSide, rightSide } = styles;
export default function Login() {
const {emailAvailabilityStatus,submitForm,register, handleSubmit,formErrors,loading, error, accessToken,searchParams }=useLogin()
  if (accessToken) {
    return <Navigate to={"/"} />
  }
  return (
    <Container>
      <Row className={bigContainer}>
        <Col className={leftSide}>
          <Lottie animationData={login} />
        </Col>
        <Col className={rightSide}>
          <div className="Container p-5">
            <h2>Login</h2>
            {searchParams.get("message") === "login_required" && (<Alert variant='info' style={{ textTransform: "lowercase" }}>You need to login to view this content</Alert>)}
            {searchParams.get("message") === "account_created" && (<Alert variant='success' style={{ textTransform: "lowercase" }}>Your account successfully created,please login</Alert>)}
            <Form className="my-5" onSubmit={handleSubmit(submitForm)}>
              <Input iconName="faEnvelope" title="Email" type="text" name="email" register={register} error={formErrors.email?.message} />
              <Input iconName="faLock" title="Password" type="password" name="password" register={register} error={formErrors.password?.message} />
              <button
                style={{ padding: "5px 10px" }}
                type="submit"

                disabled={
                  emailAvailabilityStatus === "checking"
                    ? true
                    : false || loading === "pending"
                }
              >
                {loading === "pending" ? (
                  <>
                    <Spinner animation="border" size="sm"></Spinner> Loading...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
              {error && (
                <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
