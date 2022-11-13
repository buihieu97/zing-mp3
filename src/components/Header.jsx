import React, { useState } from "react";
import { HiSearch, HiOutlineX } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleNavigate = (e) => {
    e.preventDefault();

    if (location.pathname === "/search/") {
      navigate(`?q=${searchValue}`);
      setSearchValue("");
      return;
    }
    navigate(`/search/?q=${searchValue}`);
    setSearchValue("");
    setToggleSearch(false);
  };
  return (
    <div className=" bg-color-header shadow  ">
      <div className="flex justify-between items-center py-4 relative mx-[5vw]">
        <div>
          <Link className="text-lg  md:text-xl lg:text-2xl" to="/">
            Zingmp3
          </Link>
        </div>
        <div
          className={`h-full absolute  -left-[5vw] lg:w-[400px] lg:static   transition-all duration-500
           w-screen z-50  ${toggleSearch ? "top-0" : "-top-[100%]"}`}
        >
          <form
            className={`flex justify-center items-center  h-full`}
            onSubmit={handleNavigate}
          >
            <input
              className="shadow appearance-none h-full  w-full  py-3 px-5 text-white leading-tight focus:outline-none focus:shadow-outline bg-color-hover lg:rounded-full "
              id="username"
              type="text"
              placeholder="Search..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
            <HiSearch
              className="text-2xl absolute right-2 text-gray-400 cursor-pointer hidden lg:block"
              onClick={handleNavigate}
            />
            <HiOutlineX
              className="text-xl absolute right-2 text-gray-400 cursor-pointer lg:hidden"
              onClick={() => {
                setToggleSearch(false);
              }}
            />
          </form>
        </div>
        <HiSearch
          className="text-2xl absolute right-0 text-gray-400 cursor-pointer lg:hidden"
          // onClick={handleNavigate}
          onClick={() => {
            setToggleSearch(true);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
