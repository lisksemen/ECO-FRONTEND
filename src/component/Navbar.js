import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar justify-content-center navbar-dark bg-dark">
            <div className="bg-dark w-100">
                <ul className="navbar-nav w-100 justify-content-center list-group-horizontal">
                    <li className="nav-item m-2">
                        <NavLink
                            className="nav-link"
                            to="/"
                            activeClassName="active"
                            exact
                        >
                            Pollutions
                        </NavLink>
                    </li>
                    <li className="nav-item m-2">
                        <NavLink
                            className="nav-link"
                            to="/pollutants"
                            activeClassName="active"
                        >
                            Pollutants
                        </NavLink>
                    </li>
                    <li className="nav-item m-2">
                        <NavLink
                            className="nav-link"
                            to="/objects"
                            activeClassName="active"
                        >
                            Objects
                        </NavLink>
                    </li>
                    <li className={"nav-item m-2"}>
                        <NavLink
                            className="nav-link"
                            to="/emergencies"
                            activeClassName="active"
                        >
                            Emergencies
                        </NavLink>
                    </li>
                    <li className={"nav-item m-2"}>
                        <NavLink
                            className="nav-link"
                            to="/file"
                            activeClassName="active"
                        >
                            File upload
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
