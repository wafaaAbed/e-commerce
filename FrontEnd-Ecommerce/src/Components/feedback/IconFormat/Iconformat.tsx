import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRightFromBracket,faEnvelope, faLock, faUser, faHouse, faList, faAddressCard, faUserPlus, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
// const iconeNames = {
//   faEnvelope: faEnvelope,
//   faLock: faLock,
//   faUser: faUser,
//   faHouse: faHouse,
//   faList: faList,
//   faAddressCard: faAddressCard,
//   faUserPlus: faUserPlus,
//   faCartShopping: faCartShopping,
//   faHeart: faHeart,
//   faArrowRightFromBracket:faArrowRightFromBracket
// }
import { TIconTypes } from "@types";
type TIconProps = {
  icon:keyof typeof TIconTypes ,
}
export default function Iconformat({ icon }: TIconProps) {
const name = TIconTypes[icon];
  return (
    <FontAwesomeIcon icon={name} className="me-1" />
  )
}
