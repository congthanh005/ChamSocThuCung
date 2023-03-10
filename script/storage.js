"use strict";
//lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//lấy dữ liệu
function getFromStorage(key) {
  return localStorage.getItem(key);
}
// animation sidebar
const sidebar = document.querySelector("#sidebar");
// //1. bổ xung animation cho sidebar
sidebar.addEventListener("click", function () {
  this.classList.toggle("active");
  // e.preventDefault();
});

// gọi dữ liệu chung
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

//clear all
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value;
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};
