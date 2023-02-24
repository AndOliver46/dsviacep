import * as modalController from "./modal-controller.js";

function State() {
  this.contactLink = null;
}

const state = new State();

export function init() {
  state.contactLink = document.querySelector(".contact-link");
  state.contactLink.addEventListener("click", handleContactLinkClick);
}

function handleContactLinkClick(event) {
  modalController.showModal();
}
