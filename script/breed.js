"use strict";

//lấy dữ liệu đã lưu
let breedArr;
let storageKey = "breedList";
let breedFromStorage = localStorage.getItem(storageKey);

if (breedFromStorage) {
  breedArr = JSON.parse(breedFromStorage);
} else {
  breedArr = [];
}
renderTableData(breedArr);

//tạo bảng hiển thị breed
function renderTableData(array) {
  const tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const currentBreed = array[i];
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${currentBreed.breed}</td>
        <td>${currentBreed.type} </td>
        <td>
          <button type="button" class="btn btn-danger delete-btn"
          onClick="onDelete('${currentBreed.breed}')"
          >Delete</button>
        </td>
    `;

    tableBodyEl.appendChild(row);
  }
}

//thêm breed, bắt sự kiện khi ấn nút submit
const breedSubmit = () => {
  const breedsubmitbtn = document.querySelector("#submit-btn");

  //clear new breed
  const clearInput = function () {
    breedInput.value = "";
    typeInput.value = "Select Type";
  };

  const dataBreed = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  //kiểm tra đã nhập đầy đủ thông tin
  if (!dataBreed?.breed) {
    alert("Please input a breed");
    return;
  }

  //timf cac breed bi trung lap
  const existIndex = breedArr.findIndex(
    (item) => item.breed === dataBreed.breed
  );
  if (existIndex > -1) {
    alert("Breed must unique!");
    return;
  }

  if (dataBreed.type === "Select Type") {
    // console.log(data.type);
    alert("Please select Type");
    return;
  }

  // thêm breed vào chuỗi
  breedArr.push(dataBreed);
  clearInput();
  renderTableData(breedArr);
  //lưu vào localStorage
  localStorage.setItem(storageKey, JSON.stringify(breedArr));
};

//xoas breed
function onDelete(breedId) {
  // tim ra index can xoa
  const currentIndex = breedArr.findIndex((item) => item.breed === breedId);
  // confirm before deletePet
  if (confirm("Are you sure?")) {
    breedArr.splice(currentIndex, 1); // xóa tại vị trí currentIndex
    renderTableData(breedArr); // render lại danh sách mới
    localStorage.setItem(storageKey, JSON.stringify(breedArr));
  }
}

document.getElementById("submit-btn").addEventListener("click", breedSubmit);
