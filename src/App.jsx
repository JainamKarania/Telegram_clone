import { Routes,Route,Navigate,Outlet,useLocation } from 'react-router-dom'
import './App.css'
import {Transition} from "@headlessui/react"
import clsx from "clsx"
import { Fragment,useRef } from 'react'
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Calls from './pages/Calls'
import PeoplesNearby from "./pages/PeoplesNearby"
import Contacts from './pages/Contacts'
import Messages from './pages/Messages'
import Invites from './pages/Invites'
import NewGroups from './pages/NewGroups'
import Profile from './pages/Profile'
import { Toaster } from 'sonner'
import Sidebar from "./Components/Sidebar"
import  Navbar  from "./Components/Navbar";
import { setOpenSidebar } from "./redux/slices/authSlice";
 function Layout(){
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/profile' state={{ from: location }} replace />
  );
}


  const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-gray-800 w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className='w-full min-h-screen bg-white '>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/profile' />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/groups' element={<NewGroups />} />
          <Route path='/people' element={<PeoplesNearby />} />
          <Route path='/calls' element={<Calls />} />
          <Route path='/invite' element={<Invites />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/messages' element={<Messages />} />
        </Route>

        <Route path='/profile' element={<Profile />} />
      </Routes>

      <Toaster richColors />
    </main>
  )
}

export default App
