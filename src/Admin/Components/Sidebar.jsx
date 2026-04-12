import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import control from "../pics/switch.png";
import logo2 from "../pics/logo2.png";

function Sidebar({ theme }) {
  const [open, setOpen] = useState(true);
  const [showUserSubMenu, setShowUserSubMenu] = useState(false);
  const userMenuRef = useRef(null);

  const Menus = [
    { title: "Dashboard", src: "dashboard", link: "/home" },
    {
  title: "Orders",
  src: "order",
  iconSize: "w-1 h-1",
  gap: true,
  link: "/orders",
},
{
  title: "Products",
  src: "product",
  iconSize: "w-4 h-4",
  gap: true,
  link: "/products",
},
    {
      title: "Collections",
      src: "collection",
      gap: true,
      link: "/collections",
    },
    {
      title: "Categories",
      src: "categorie",
      gap: true,
      link: "/categories",
    },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserSubMenu(false);
    }
  };

  const toggleUserSubMenu = () => {
    setShowUserSubMenu(!showUserSubMenu);
  };

  const handleSubmenuClick = () => {
    setShowUserSubMenu(false);
  };

  return (
    <div className="flex h-screen">
    <div
  className={`${
    open ? "w-72" : "w-32"
  } h-screen p-2 pt-8 relative duration-300
  bg-gradient-to-b from-[#F4E5C8]/50 via-[#F4E5C8]/75 to-[#FF4E5C8]/95
  backdrop-blur-2xl`}
>
        <img
          src={control}
          alt="Control icon"
          className={`absolute cursor-pointer -right-4 top-12 w-9 border-[#884B2C]
          border-1 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-2 items-center p-4">
          <img
            src={logo2}
            alt="Logo"
            className={`cursor-pointer w-25 duration-500 block float-left ${
              open && "rotate-[360deg]"
            }`}
          />
         { /*<h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            <span className="text-[#884B2C] font-script text-xl">Roma</span>Terra
          </h1>*/}
        </div>
        <ul className="px-8">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              ref={Menu.title === "Accounts" ? userMenuRef : null}
              className={`flex flex-col  ${
                Menu.title === "Accounts" && "relative"
              }`}
            >
              <div
                className={`rounded-md p-2 cursor-pointer hover:bg-[#A2664E] text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-5" : "mt-2"}`}
              >
                {Menu.submenus ? (
                  <div onClick={toggleUserSubMenu}>
                    <div className="flex">
                      <img
                        src={require(`../pics/${Menu.src}.png`)}
                        alt={Menu.title}
                      />
                      <span
                        className={`origin-left duration-200 ml-5 text-black font-medium ${
                          !open && "hidden"
                        }`}
                      >
                        {Menu.title}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Link to={Menu.link} className="no-underline text-white">
                    <div className="flex">
                      <img
                        src={require(`../pics/${Menu.src}.png`)}
                        alt={Menu.title}
                      />
                      <span
                        className={`origin-left duration-200 ml-5 text-black font-medium ${
                          !open && "hidden"
                        }`}
                      >
                        {Menu.title}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
              {Menu.title === "Accounts" && showUserSubMenu && (
                <ul className="absolute top-full left-0 w-44 bg-LightBlue rounded-lg shadow-md mt-1">
                  {Menu.submenus.map((submenu, subIndex) => (
                    <li
                      key={subIndex}
                      className="text-white py-2 px-4 hover:bg-DarkBlue cursor-pointer"
                      onClick={handleSubmenuClick}
                    >
                      <Link to={submenu.link}>{submenu.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
