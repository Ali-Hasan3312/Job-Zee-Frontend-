import { useContext } from "react";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Context } from "../../main";
import { Link } from "react-router-dom";

const Footer = () => {

    const {user} = useContext(Context)
  return (
   <footer className={user? "footerShow" : "footerHide"}>
   <div>&copy; All Rights Reserved By JobZee.</div>
   <div>

    <Link to={"/"} target="_blank">
    <FaFacebookF />
    </Link>
    <Link to={"/"} target="_blank">
    <FaYoutube />
    </Link>
    <Link to={"/"} target="_blank">
    <FaLinkedin />
    </Link>
    <Link to={"https://www.instagram.com/z_4_zeeshuuu/"} target="_blank">
    <RiInstagramFill />
     </Link>
   </div>

   </footer>
  )
}

export default Footer