import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearch } from "react-icons/io5";
import { navigation } from "../contents/navigation";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3).split("%20").join("");
  console.log("removeSpace", removeSpace);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  console.log("location", location);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 z-40 w-full h-16 bg-black bg-opacity-50">
      <div className="container flex items-center px-4 pt-2 mx-auto">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>
        <nav className="items-center hidden gap-1 ml-5 lg:flex ">
          {navigation.map((nav, index) => (
            <div key={`${nav.label}-header-${index}`}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${
                    isActive && "text-neutral-100"
                  }`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-5 ml-auto">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search here..."
              className="hidden px-4 bg-transparent border-none outline-none lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearch />
            </button>
          </form>

          <div className="w-8 h-8 overflow-hidden transition-all rounded-full cursor-pointer active:scale-50">
            <img src={userIcon} className="w-full h-full " alt="user icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
