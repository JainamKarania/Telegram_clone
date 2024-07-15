import React from "react";
import { 
  FaUser, FaUsers, FaPhone, FaMapMarkerAlt, FaEnvelope, 
  FaSave, FaAddressBook,FaTelegram
} from 'react-icons/fa';
import { MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
    {
      label: "My Profile",
      link: "profile",
      icon: <FaUser />,
    },
    {
      label: "New Groups",
      link: "groups",
      icon: <FaUsers />,
    },
    {
      label: "Calls",
      link: "calls",
      icon: <FaPhone />,
    },
    {
      label: "People",
      link: "people",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: "Invite Friends",
      link: "invite",
      icon: <FaEnvelope />,
    },
    {
      label: "Saved Messages",
      link: "messages",
      icon: <FaSave />,
    },
    {
      label: "Contacts",
      link: "contacts",
      icon: <FaAddressBook />,
    },
  ];
const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
  
    const dispatch = useDispatch();
    const location = useLocation();
  
    const path = location.pathname.split("/")[1];
  
    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
  
    const closeSidebar = () => {
      dispatch(setOpenSidebar(false));
    };
  
    const NavLink = ({ el }) => {
      return (
        <Link
          to={el.link}
          onClick={closeSidebar}
          className={clsx(
            "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-white text-base hover:bg-gray-700",
            path === el.link.split("/")[0] ? "bg-gray-700 text-neutral-100" : ""
          )}
        >
          {el.icon}
          <span className='hover:text-[#2564ed]'>{el.label}</span>
        </Link>
      );
    };
    return (
      <div className='w-full bg-gray-800 h-screen flex flex-col gap-6 p-5'>
        <h1 className='flex gap-1 items-center'>
          <p className='bg-blue-600 p-2 rounded-full mr-4'>
            <FaTelegram className='text-white text-2xl font-black' />
          </p>
          <span className='text-2xl font-bold text-white'>Telegram</span>
        </h1>
  
        <div className='flex-1 flex flex-col gap-y-5 py-8'>
          {sidebarLinks.map((link) => (
            <NavLink el={link} key={link.label} />
          ))}
          <div className=''>
          <button className='w-full flex gap-2 p-2 items-center text-lg text-white'>
            <MdSettings />
            <span>Settings</span>
          </button>
        </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;