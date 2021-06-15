import React from "react";
import { NewColumnButton } from "./NewColumnButton";

import logo from '../images/boardlogo.png'

export const NavBar = (props) => {
  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="">
          <img
            src={logo}
            width="100"
            height="100"
          />
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <NewColumnButton
              addNewId={props.addNewId}
              updateBoard={props.updateBoard}
              globalCount={props.globalCount}
              globalIncrement={props.globalIncrement}
              board={props.board}
              lastColumnRef={props.lastColumnRef}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
