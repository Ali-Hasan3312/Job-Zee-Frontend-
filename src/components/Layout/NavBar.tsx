import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Context } from "../../main";

const NavBar = () => {
    const [show, setShow] = useState(false);
    const { setIsAuthorized, user,setUser } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        
            await signOut(auth).then(()=>{
                toast.success("User LoggedOut Successfully");
                setIsAuthorized(false);
                setUser(null)
                navigate("/login");
            }).catch((error)=>{
                toast.error(error.message);
            });
    }
   

    return (
        <>
            <nav className={user ? "navbarShow" : "navbarHide"}>
                <div className="container">
                    <div className="logo">
                        <img src="JobZee-logos__white.png" alt="logo" />
                    </div>
                    <ul className={!show ? "menu" : "show-menu menu"}>
                        <li>
                            <Link to={"/"} onClick={() => setShow(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={"/job/getall"} onClick={() => setShow(false)}>
                                ALL JOBS
                            </Link>
                        </li>
                        <li>
                            <Link to={`/application/me/${user?._id}`} onClick={() => setShow(false)}>
                                {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
                            </Link>
                        </li>
                        {user && user.role === "Employer" ? (
                            <>
                                <li>
                                    <Link to={`/job/post/${user._id}`} onClick={() => setShow(false)}>
                                        POST NEW JOB
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/job/me/${user._id}`} onClick={() => setShow(false)}>
                                        VIEW YOUR JOBS
                                    </Link>
                                </li>
                            </>
                        ) : null}
                        <button onClick={handleLogout}>LOGOUT</button>
                    </ul>
                    <div className="hamburger">
                        <GiHamburgerMenu onClick={() => setShow(!show)} />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
