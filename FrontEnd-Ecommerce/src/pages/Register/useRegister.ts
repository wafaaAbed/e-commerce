import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import {  useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signUpType } from "@validation/signUpSchema"
import useCheckEmailAvilabilty from "@hooks/useCheckEmailAvilabilty";
import { useEffect } from "react";
function useRegister() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {loading,error,accessToken}= useAppSelector((state)=> state.auth)

  const { resetCheckEmailAvailability, checkEmailAvailability, emailAvailabilityStatus, enteredEmail } = useCheckEmailAvilabilty();

  const { register, handleSubmit,getFieldState, trigger, formState: { errors } } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema)
  });

  const submitForm: SubmitHandler<signUpType> = (data) => {

    const { firstName, lastName, password, email } = data;
    dispatch(actAuthRegister({ firstName, lastName, password, email })).unwrap()
    .then(()=>{
      navigate("/login?message=account_created");

    })
  }

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    await trigger("email");
    const value = e.target.value;
    const { invalid, isDirty } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      //check 
      checkEmailAvailability(value);
    }
    // this stsatment to reset error not still if user inter anther email error  
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  }
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    }
  }, [dispatch])

  return {loading,error,accessToken,emailOnBlurHandler,submitForm, register, handleSubmit,errors,emailAvailabilityStatus}
}

export default useRegister
