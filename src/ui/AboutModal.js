import React from "react";

export const AboutModal = (props) => {
  let modalClass = "modal";
  if (props.isActive) {
    modalClass += " is-active";
  }

  return (
    <div className={modalClass}>
      <div className="modal-background" onClick={props.toggleModal}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-4">Thanks for checking out my kanban board.</h1>
          <p className="block">This app is a front-end only project management board, in the vein of Trello or Kanboard. I created this project to practice React.js, as well as to try out the Bulma css framework.</p>
          <p className="block">This project is front-end only, data is not persisted. As such, refreshing the page will reset the board to the default state.</p>
          <p className="block">You can add new columns and task cards, edit existing columns and task cards, and rearrange them using the buttons provided or by dragging and dropping.</p>
          <p className="block">Hope you enjoy clicking around.</p>
        </div>
      </div>
      <button
        className="modal-close is-large"
        onClick={props.toggleModal}
      ></button>
    </div>
  );
};
