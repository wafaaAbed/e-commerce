import Iconformat from "@Components/feedback/IconFormat/Iconformat"
import { useNavigate } from "react-router-dom"
import { TIconTypes } from "@types";

type TRegistration={
  classStyle: string,
  navigation?:string | null,
  iconName: keyof typeof TIconTypes,
  title:string,
}
function Registration({classStyle,navigation,iconName,title}:TRegistration) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(`/${navigation}`)} className={classStyle}>
    <Iconformat icon={iconName}/>
        {title}</button>
  )
}

export default Registration
