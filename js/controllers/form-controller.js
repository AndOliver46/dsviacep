import Address from "../models/address.js";
import { findByCep } from "../services/address-service.js";

function State() {
  this.address = new Address();

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.btnSave = null;
  this.btnClear = null;

  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);

  state.inputCep.addEventListener("change", handleInputCepChange);
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyUp);
  state.inputNumber.addEventListener("change", handleInputNumberChange);
}

function handleInputNumberKeyUp(event) {
  const number = event.target.value;
  state.address.number = number;
}

async function handleInputCepChange(event) {
  try {
    const address = await findByCep(event.target.value);
    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.address = address;

    setFormError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    state.inputCity.value = "";
    state.inputStreet.value = "";
    setFormError("cep", "Informe um cep válido!");
  }
}

async function handleBtnSaveClick(event) {
  event.preventDefault();

  if (state.address.number == "" || state.address.number == null) {
    setFormError("number", "Campo requerido");
  } else if (state.address.cep == "" || state.address.cep == null) {
    setFormError("cep", "Campo requerido");
  } else {
    console.log(state.address);
  }
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function handleInputNumberChange(event) {
  if (event.target.value == "") {
    setFormError("number", "Campo requerido");
  } else {
    setFormError("number", "");
  }
}

function clearForm() {
  state.inputCep.value = "";
  state.inputCity.value = "";
  state.inputNumber.value = "";
  state.inputStreet.value = "";

  setFormError("cep", "");
  setFormError("number", "");

  state.inputCep.focus();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
