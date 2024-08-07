import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaUserPlus } from "react-icons/fa";
import { BiSolidCategory, BiSolidMessage } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { RiDashboard2Fill, RiDashboard2Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { LuBoxes } from "react-icons/lu";
import { PiTruckDuotone } from "react-icons/pi";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import "./AdminLayout.css";
import { useState } from "react";

export const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    // console.log("admin Layout:",user);
    const [isActive, setIsActive] = useState(false);

    const toggleDropdown = () => {
        setIsActive(!isActive);
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!user.isAdmin) {
        toast.error("You are not an Admin..!!")
        return <Navigate to="/" />;
    }

    return <>

        <div className="sidebar">
            <h2>Welcome, {user ? user.userName : "User" }
                <img src={`http://localhost:5000/logo1.png`} alt="logo"
                    style={{ borderRadius: "50%" }} /> <br />
                Maavdi milk</h2>
            <ul>
                <NavLink to="/admin/dashboard">
                    <li>
                        <div style={{ fontSize: "30px" }}>
                            <RiDashboard2Line />
                        </div>
                        <label>Dashboard</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/users">
                    <li>
                        <div style={{ fontSize: "30px" }}>
                            <FaUser />
                        </div> <label>Users</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/contacts">
                    <li>
                        <div style={{ fontSize: "30px" }}>
                            <BiSolidMessage />
                        </div>
                        <label>Contacts</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/products">
                    <li>
                        <div style={{ fontSize: "30px" }}>
                            <LuBoxes />
                        </div>
                        <label>Products</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/categorys">
                    <li>
                        <div style={{ fontSize: "30px" }}>
                            <BiSolidCategory />
                        </div>
                        <label>Category</label>
                    </li>
                </NavLink>
                <NavLink to="/admin/vendors">
                    <li>
                        <div style={{ fontSize: "30px" }}>
                            <FaUserPlus />
                        </div>
                        <label>Vendor</label>
                    </li>
                </NavLink>
                <NavLink className={`dropdown-btn ${isActive ? 'active' : ''}`} onClick={toggleDropdown}>
                    <li class="dropdown-btn">
                        <div style={{ fontSize: "30px" }}>
                            <GrUpdate />
                        </div>
                        <label>Updates</label> <label style={{ marginLeft: "70px", fontSize: "25px" }}><IoMdArrowDropdown /></label>
                    </li>
                    <div class="dropdown-container" style={{ display: isActive ? 'block' : 'none' }}>
                        <NavLink to="/admin/today-updates">
                            <li>
                                <div style={{ fontSize: "30px" }}>
                                    <HiOutlineSpeakerphone />
                                </div>
                                <label>Today Update</label>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/upcoming-products">
                            <li>
                                <div style={{ fontSize: "30px" }}>
                                    <FaBoxOpen />
                                </div>
                                <label>Upcoming Product</label>
                            </li>
                        </NavLink>
                    </div>
                </NavLink>
                <NavLink to="/admin/orders">
                    <li>
                        <div style={{ fontSize: "30px" }}>
                            <PiTruckDuotone />
                        </div>
                        <label>Order</label>
                    </li>
                </NavLink>
            </ul>
        </div>
        <Outlet />
    </>
};