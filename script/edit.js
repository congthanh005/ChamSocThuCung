"use strict";

//lấy dữ liệu petArr, breedArr
let petArr;
let breedArr;
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

//hiện dữ liệu
function renderTableData(_array) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < _array.length; i++) {
    const currentPet = _array[i];
    const row = document.createElement("tr");
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
        <td>${currentPet.type}</td>
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
        <td>${_date}</td>
        <td>
          <button type="button" class="btn btn-warning edit-btn"
          onClick = "onEdit('${currentPet.id}')"
          >Edit</button>
        </td>
    `;

    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

const petInputForm = document.querySelector(".pet-input");

//khi type thay đổi
function onChangeType() {
  const typeValue = typeInput.options[typeInput.selectedIndex].text;
  const breedSelects = breedArr.filter((item) => item.type === typeValue);
  console.log("type value ", typeValue, breedSelects);

  let breedInputHTML = "";

  for (let i = 0; i < breedSelects.length; i++) {
    const item = breedSelects[i];
    breedInputHTML = breedInputHTML + `<option>${item.breed}</option>`;
  }
  //tạo ra các danh sách ứng với mỗi type khác nhau
  breedInput.innerHTML = `
    <option>Select breed</option>
    ${breedInputHTML}
  `;
}

//bắt sự kiện khi ấn nút edit
function onEdit(petId) {
  petInputForm.classList.remove("hide");
  const currentIndex = petArr.findIndex((item) => item.id === petId);

  //hiện dữ liệu vào input form
  idInput.value = petArr[`${currentIndex}`].id;
  nameInput.value = petArr[`${currentIndex}`].name;
  ageInput.value = petArr[`${currentIndex}`].age;
  typeInput.value = petArr[`${currentIndex}`].type;
  weightInput.value = petArr[`${currentIndex}`].weight;
  lengthInput.value = petArr[`${currentIndex}`].length;
  colorInput.value = petArr[`${currentIndex}`].color;
  //khi type có giá trị như nào thì hiện danh sách breed tương ứng
  const typeValue = typeInput.options[typeInput.selectedIndex].text;
  const breedSelects = breedArr.filter((item) => item.type === typeValue);

  let breedInputHTML = "";

  for (let i = 0; i < breedSelects.length; i++) {
    const item = breedSelects[i];
    breedInputHTML = breedInputHTML + `<option>${item.breed}</option>`;
  }
  breedInput.innerHTML = `
    <option>Select breed</option>
    ${breedInputHTML}`;
  breedInput.value = petArr[`${currentIndex}`].breed;
}

//bắt sự kiện sau khi sửa xong và lưu lại
const onSubmit = () => {
  //data
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
  if (data.breed === "Select Breed" || data.breed === "") {
    alert("Please select Breed!");
    return;
  }
  const currentIndex = petArr.findIndex((item) => item.id === data.id);
  petArr.splice(currentIndex + 1, 1);
  petInputForm.classList.add("hide");

  // nếu ko có vấn đề validate
  // thêm data vào petArray
  petArr.push(data);

  // Xóa bỏ dữ liệu đã nhập sau khi dữ liệu được lấy
  clearInput();

  // re-render data table
  renderTableData(petArr);
  //sau khi thêm thú cưng mới thì lưu trở lại vào LocalStorage
  saveToStorage(PET_STORAGE, JSON.stringify(petArr));
};

document.getElementById("submit-btn").addEventListener("click", onSubmit);
