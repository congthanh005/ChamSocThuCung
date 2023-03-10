"use strict";

//lấy dữ liệu petArr, breedArr
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
// hiển thị các thú cưng ban đầu
function renderTableData(_array) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < _array.length; i++) {
    const currentPet = _array[i];
    const row = document.createElement("tr");
    // hiển thị thời gian
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
        <td>${_date}</td>
    `;

    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

//breedinput form
//hiển thị toàn bộ breed cho người dùng lựa chọn
const breedInputForm = petArr.filter((item) => item.breed);
let breedInputHTML = "";
for (let i = 0; i < breedInputForm.length; i++) {
  const item = breedInputForm[i];
  breedInputHTML = breedInputHTML + `<option>${item.breed}</option>`;
}
breedInput.innerHTML = `
    <option>Select Breed</option>
    ${breedInputHTML}
  `;

//bắt sự kiện khi ấn nút find
const findBtn = document.getElementById("find-btn");
findBtn.addEventListener("click", function () {
  //tạo biến mới để hiển thị các dữ liệu đã tìm
  let petArrFind = petArr;
  //khi nhập id của pet thì tìm id đó
  if (idInput.value) {
    petArrFind = petArrFind.filter((petid) => petid.id.includes(idInput.value));
  }
  //khi nhập tên của pet thì tìm tên đó
  if (nameInput.value) {
    petArrFind = petArrFind.filter((petName) =>
      petName.name.includes(nameInput.value)
    );
  }
  //khi chọn kiểu type thì tìm pet theo type
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter(
      (petType) => petType.type === typeInput.value
    );
  }
  //khi chọn kiểu breed thì tìm pet theo bredd
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter(
      (petBreed) => petBreed.breed === breedInput.value
    );
  }
  //khi có tích vaccinated
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter(
      (petVaccin) => petVaccin.vaccinated === true
    );
  }

  //khi có tích dewormed
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((petDeworm) => petDeworm.dewormed === true);
  }

  //khi có tích sterilized
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter(
      (petSteriliz) => petSteriliz.sterilized === true
    );
  }

  //hiển thị thú cưng thỏa mãn các điều kiện trên
  renderTableData(petArrFind);
});
