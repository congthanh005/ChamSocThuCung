"use strict";

//dữ liệu assignment 1
//tạo biến lưu trữ thú cưng
let petArr;
let breedArr;
// const petArr = JSON.parse(getFromStorage("key"));
const PET_STORAGE = "pet_array";
const BREED_STORAGE = "breedList";

const breedFromStorage = getFromStorage(BREED_STORAGE);
const petArrayFromStorage = getFromStorage(PET_STORAGE);

if (breedFromStorage) {
  breedArr = JSON.parse(breedFromStorage);
} else {
  breedArr = [];
}

if (petArrayFromStorage) {
  petArr = JSON.parse(petArrayFromStorage);
} else {
  petArr = [];
}

let healthyCheck = false;
//hiển thị dữ liệu
renderTableData(petArr);

//tạo bảng chứa dữ liệu thú cưng
function renderTableData(_array) {
  const tableBodyEl = document.getElementById("table-tbody");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < _array.length; i++) {
    const currentPet = _array[i];
    const row = document.createElement("tr");

    //chuyển date thành string để load dữ liệu
    let _date = "";
    if (currentPet.date && typeof currentPet.date === "string") {
      _date = `${new Date(currentPet.date).getDate()}/${
        new Date(currentPet.date).getMonth() + 1
      }/${new Date(currentPet.date).getFullYear()}`;
    } else {
      if (typeof currentPet.date === "object") {
        _date = `${currentPet.date.getDate()}/${
          currentPet.date.getMonth() + 1
        }/${currentPet.date.getFullYear()}`;
      }
    }

    row.innerHTML = `
        <th scope="row">${currentPet.id}</th>
        <td>${currentPet.name}</td>
        <td>${currentPet.age} age</td>
        <td id="mySelect" onchange="myFunction()">${currentPet.type}</td>
        <td>${currentPet.weight} kg</td>
        <td>${currentPet.length} cm</td>
        <td>${currentPet.breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${currentPet.color}"></i>
        </td>
        <td>
          <i class="bi ${
            currentPet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
          </td>
        <td><i class="bi ${
          currentPet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${
          currentPet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
        }"></i></td>
        <td>${currentPet.BMI || "?"}</td>
        <td>${_date}</td>
        <td>
          <button type="button" class="btn btn-danger delete-btn"
          onClick="onDelete('${currentPet.id}')"
          >Delete</button>
        </td>
    `;

    tableBodyEl.appendChild(row);
  }
}

//khi type thay đổi thì hieehjn breed phù hợp
function onChangeType() {
  const typeValue = typeInput.options[typeInput.selectedIndex].text;
  const breedSelects = breedArr.filter((item) => item.type === typeValue);
  console.log("type value ", typeValue, breedSelects);

  let breedInputHTML = "";

  for (let i = 0; i < breedSelects.length; i++) {
    const item = breedSelects[i];
    breedInputHTML = breedInputHTML + `<option>${item.breed}</option>`;
  }

  breedInput.innerHTML = `
    <option>Select Breed</option>
    ${breedInputHTML}
  `;
}

// tính năng thêm thú cưng, bắt sự kiện khi ấn nút Submit
const onSubmit = () => {
  const data = {
    id: idInput.value,
    age: parseInt(ageInput.value),
    name: nameInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // validate data
  if (!data?.id) {
    alert("Please input for id");
    return;
  }
  // tìm các giá trị ID bị trùng
  const existIndex = petArr.findIndex((item) => item.id === data.id);
  // console.log("existIndex = ", existIndex);
  if (existIndex > -1) {
    alert("ID must unique!");
    return;
  }
  //Pet name
  if (!data?.name) {
    alert("Please input for Pet Name");
    return;
  }
  // Pet age có tuổi >1 và nhỏ hơn 15
  if (!data?.age) {
    alert("Age is reqired");
    return;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return;
  }

  //  Pet weight
  if (!data?.weight) {
    alert("weight is reqired");
    return;
  } else if (data.weight < 1 || data.weight > 15) {
    console.log(data.weight);
    alert("Weight must be between 1 and 15!");
    return;
  }
  // Pet length
  if (!data?.length) {
    alert("Length is reqired");
    return;
  } else if (data.length < 1 || data.length > 100) {
    console.log(data.length);
    alert("Length must be between 1 and 100!");
    return;
  }

  // select type
  if (data.type === "Select Type") {
    // console.log(data.type);
    alert("Please select Type");
    return;
  }

  // select Breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return;
  }

  // nếu ko có vấn đề validate
  // thêm data vào petArray
  petArr.push(data);

  // Xóa bỏ dữ liệu đã nhập sau khi dữ liệu được lấy
  //clearInput được nhập bên storage.js
  clearInput();

  // re-render data table
  renderTableData(petArr);
  //sau khi thêm thú cưng mới thì lưu trở lại vào LocalStorage
  saveToStorage(PET_STORAGE, JSON.stringify(petArr));
  console.log("petArr = ", petArr);
};

// delete thú cưng
function onDelete(petId) {
  // tim ra index can xoa
  const currentIndex = petArr.findIndex((item) => item.id === petId);
  console.log("currentIndex", currentIndex);
  //confirm before deletePet
  if (confirm("Are you sure?")) {
    petArr.splice(currentIndex, 1); // xóa tại vị trí currentIndex
    renderTableData(petArr); // render lại danh sách mới
    //xóa thú cưng trong LocalStorage và lưu lại
    saveToStorage(PET_STORAGE, JSON.stringify(petArr));
  }
}

// show the healthy pet
function onSeachHealthy() {
  const healthybtn = document.getElementById("healthy-btn");
  const healthyPetarr = petArr.filter((item) => {
    if (item.vaccinated && item.dewormed && item.sterilized) {
      return true;
    }
    return false;
  });
  if (healthyCheck) {
    healthybtn.textContent = "Show All Pet";
    healthyCheck = false;
    renderTableData(healthyPetarr);
  } else {
    healthybtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
    renderTableData(petArr);
  }
}

// BMI
function onCalculateBMI() {
  // update lại BMI trong object
  petArr.map((item) => {
    if (item.type === "Dog") {
      //làm tròn đến 2 chữ số thập phân
      let BMI =
        Math.round(((item.weight * 703) / item.length ** 2) * 100) / 100;
      item.BMI = BMI;
    } else if (item.type === "Cat") {
      let BMI =
        Math.round(((item.weight * 886) / item.length ** 2) * 100) / 100;
      item.BMI = BMI;
    }
    return item;
  });
  renderTableData(petArr);
}

document.getElementById("submit-btn").addEventListener("click", onSubmit);
document
  .getElementById("healthy-btn")
  .addEventListener("click", onSeachHealthy);
document
  .getElementById("calculate-btn")
  .addEventListener("click", onCalculateBMI);
