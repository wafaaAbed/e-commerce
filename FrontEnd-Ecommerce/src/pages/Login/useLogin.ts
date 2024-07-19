
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validation/signInSchema";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvilabilty";
import { useEffect } from "react";
function useLogin() {
  const dispatch = useAppDispatch();
const navigate = useNavigate();
const { loading, error, accessToken } = useAppSelector((state) => state.auth)
const [searchParams, setsearchParams] = useSearchParams();
const { register, handleSubmit, formState: { errors: formErrors } } = useForm<signInType>({
  mode: "onBlur",
  resolver: zodResolver(signInSchema)
});

const submitForm: SubmitHandler<signInType> = (data) => {

  if (searchParams.get("message") === "account_created") {
    setsearchParams("")
  }
  dispatch(actAuthLogin(data)).unwrap().then(() => {
    navigate("/");
  })
}
const { emailAvailabilityStatus } = useCheckEmailAvailability();

useEffect(() => {

  dispatch(resetUI());

}, [dispatch])

  return {emailAvailabilityStatus,submitForm,register, handleSubmit,formErrors,loading, error, accessToken ,searchParams}

}

export default useLogin
