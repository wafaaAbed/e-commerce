import {  Col, Container, Form, Row, Spinner } from "react-bootstrap";
import registerLottie from "@assets/LottieFiles/register.json";
import Lottie from "lottie-react";

//css files
import shareStyle from "../Login/styles.module.css";
const { leftSide, rightSide, bigContainer } = shareStyle;
import style from "./style.module.css";
import { Input } from "@Components/e-Commerce";
import { Navigate } from "react-router-dom";
import useRegister from "./useRegister";

const { formContainer } = style;
export default function Register() {
const {loading,error,accessToken,emailOnBlurHandler,submitForm, register, handleSubmit,errors,emailAvailabilityStatus}=useRegister()
  if(accessToken){
    return <Navigate to={"/"}/>
    }

  return (
    <Container>
  
      <Row className={bigContainer}>
        <Col className={leftSide}>
          <Lottie animationData={registerLottie} />
        </Col>
        <Col className={rightSide}>
          <div className="Container p-3">
            <h2>Registration</h2>
            <Form className={`my-5 ${formContainer}`} onSubmit={handleSubmit(submitForm)}>
              <Row>
                <Col>
                  <Input iconName="faUser" title="First Name" type="text" name="firstName" register={register} error={errors.firstName?.message} />
                </Col>
                <Col>
                  <Input iconName="faUser" title="Last Name" type="text" name="lastName" register={register} error={errors.lastName?.message} />
                </Col>
              </Row>
              <Input iconName="faEnvelope" title="Email" type="text" name="email" register={register} error={errors.email?.message
                ? errors.email?.message
                : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                    ? "Error from the server."
                    : ""}
                     onBlur={emailOnBlurHandler}
                formText={
                  emailAvailabilityStatus === "checking"
                    ? "We're currently checking the availability of this email address. Please wait a moment."
                    : ""
                }
                success={
                  emailAvailabilityStatus === "available"
                    ? "This email is available for use."
                    : ""
                }
                disabled={emailAvailabilityStatus === "checking" ? true : false}

              />
              <Input iconName="faLock" title="Password" type="password" name="password" register={register} error={errors.password?.message} />
              <Input iconName="faLock" title="Confirm Password" type="password" name="confirmPassword" register={register} error={errors.confirmPassword?.message} />
              <button
            style={{padding:"5px 10px"}}
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

              {/* <Button type="submit" onClick={()=>console.log("cchhhc")}  disabled={isSubmitting} className="w-100 p-1 mt-3">{isSubmitting ? "Loading...":"Submit" }</Button> */}
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
