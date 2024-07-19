import { Heading } from "@Components/Common";
import { useAppSelector } from "@store/hooks"
import style from "./style.module.css";
const{accountInfo}=style;

function Account() {
  const {user} = useAppSelector((state)=>state.auth);
  return (
    <>
    <Heading title={`${user?.firstName} Account Info`} />
    <ul className={accountInfo}>
      <li>First Name: <span>{user?.firstName} {user?.lastName}</span> </li>
      
      <li>Email: <span>{user?.email}</span></li>
      
    </ul>
  </>
  )
}

export default Account
