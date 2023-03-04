import React from "react";
import "./Header.scss";

import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.png";

const Header = () => {
  const [show, setshow] = useState("top");
  const [lastScrolly, setlastScrolly] = useState(0);
  const [mobileMenu, setmobileMenu] = useState(false);
  const [showSearch, setshowSearch] = useState("");
  const [query, setquery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrolly]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrolly && !mobileMenu) {
        setshow("hide");
      } else {
        setshow("show");
      }
    } else {
      setshow("top");
    }
    setlastScrolly(window.scrollY);
  };

  const searchqueryhandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setshowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setmobileMenu(false);
    setshowSearch(true);
  };
  const openmobilemenu = () => {
    setmobileMenu(true);
    setshowSearch(false);
  };

  const navigationhandler = (type) => {
    if (type === "movies") {
      navigate(`/explore/movie`);
    } else {
      navigate(`/explore/tv`);
    }
    setmobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=>navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuitems">
          <li className="menuitem" onClick={() => navigationhandler("movies")}>
            Movies
          </li>
          <li className="menuitem" onClick={() => navigationhandler("shows")}>
            TV Shows
          </li>
          <li className="menuitem">
            <HiOutlineSearch onClick={() => setshowSearch(true)} />
          </li>
        </ul>

        <div className="mobilemenuitems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setmobileMenu(false)} />
          ) : (
            <SlMenu onClick={openmobilemenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchbar">
          <ContentWrapper>
            <div className="searchinput">
              <input
                type="text"
                placeholder="Search for movie or TV Shows"
                onChange={(e) => setquery(e.target.value)}
                onKeyUp={searchqueryhandler}
              />
              <VscChromeClose onClick={() => setshowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
