import React, {useState} from "react";
import { NewColumnButton } from "./NewColumnButton";

import logo from '../images/boardlogo.png'
import { AboutModal } from "./AboutModal";
import ReactTooltip from "react-tooltip";

export const NavBar = (props) => {
  const [aboutModal, setAboutModal] = useState(false)

  const toggleAboutModal = (e) => {
    e.preventDefault()
    setAboutModal(!aboutModal)
  }

  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="" onClick={toggleAboutModal} data-tip="About this app">
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
      <AboutModal
        isActive={aboutModal}
        toggleModal={toggleAboutModal}
      />
      <ReactTooltip/>
    </nav>
  );
};
