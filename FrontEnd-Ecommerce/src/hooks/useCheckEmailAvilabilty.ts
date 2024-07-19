import { useState } from "react";
import axios from "axios";
 

type TStatus= "idle" | "checking" | "available" | "notAvailable" | "failed";





function useCheckEmailAvilabilty() {
  const[emailAvailabilityStatus,setEmailAvailabilityStatus]=useState<TStatus>("idle");
const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

const checkEmailAvailability = async (email: string) => {
  setEmailAvailabilityStatus("checking");
  setEnteredEmail(email);
  try {

  const response = await axios.get(`http://localhost:5006/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      
      setEmailAvailabilityStatus("failed");
    }
  };

const resetCheckEmailAvailability = () => {
  setEmailAvailabilityStatus("idle");
  setEnteredEmail(null)

};
  return {resetCheckEmailAvailability,checkEmailAvailability,emailAvailabilityStatus,enteredEmail}
}

export default useCheckEmailAvilabilty

