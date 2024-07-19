import notFound from "@assets/LottieFiles/404.json";
import empty from "@assets/LottieFiles/empty.json";
import error from "@assets/LottieFiles/error.json";
import loading from "@assets/LottieFiles/loading.json";
import success from "@assets/LottieFiles/success.json";
import Lottie from "lottie-react";

const lottieFiles={
  notFound,
  empty,
  error,  
  loading,
  success
}

type TlottieHandlerProps={
  type: keyof typeof lottieFiles,
  message?: string,
  className?: string
}
export default function LottieHandler({type,message}:TlottieHandlerProps) {
  const lottie = lottieFiles[type];
  const messageStyle = type === "error"
  ? { fontSize: "19px", color: "red" }
  : { fontSize: "19px"};
  return (
    <div className="d-flex flex-column align-items-center">
      <Lottie animationData={lottie}  style={{ width: "400px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    
    </div>
  )
}
