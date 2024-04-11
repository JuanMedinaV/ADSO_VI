const tbodyId = "tbody";
const firebaseGame = new FirebaseGameUser(tbodyId);
const formUser = document.getElementById('formUser');
const btnSubmit = document.getElementById('btnSubmit');
const preload = document.getElementById('preload');
const myModal = new bootstrap.Modal(document.getElementById("modalApp"), {});
const textConfirm = "Press a button to Delete!\nAccept or Cancel.";

var getIdUser = "";
var validate = true;

function getDataUser() {
  showPreload();
  firebaseGame.getDataUsers().then((result)=>{
    hidePreload();
  });
}

function createUser() {
  validate = true;
  cleanForm();
  enableForm();
  btnSubmit.disabled = false;
  showModal();
}

function showUser(id) {
  cleanForm();
  disableForm();
  showPreload();
  const dataUser = firebaseGame.getDataUser(id);
  dataUser.then((data) => {
    setDataForm(data);
    hidePreload();
  });
  btnSubmit.disabled = true;
  showModal();
}

function editUser(id) {
  validate = false;
  cleanForm();
  enableForm();
  showPreload();
  getIdUser = id;
  const dataUser = firebaseGame.getDataUser(id);
  dataUser.then((data) => {
    setDataForm(data);
    hidePreload();
  });
  btnSubmit.disabled = false;
  showModal();
}

function deleteUser(id) {
  showPreload();
  if (confirm(textConfirm) == true) {
    firebaseGame.setDeleteUser(id).then((data) => {
      getDataUser();
    });
  }
  hidePreload();
}

formUser.addEventListener('submit', (e) => {
  e.preventDefault();
  let inputId = document.getElementById('id');
  if (inputId.value.length === 0) {
    inputId.value = uuid.v1();
  }
  let elements = formUser.querySelectorAll('input');
  var jsonArray = {};
  for (const elem of elements) {
    jsonArray[elem.id] = elem.value;
  }
  if (validate) {
    firebaseGame.setCreateUser(jsonArray).then(hideModal());
  } else {
    firebaseGame.setUpdateUser(getIdUser, jsonArray).then(hideModal());
  }
});

function showModal() {
  myModal.show();
};

function hideModal() {
  myModal.hide();
}

function cleanForm() {
  formUser.reset();
};

function enableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
};

function disableForm() {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

function setDataForm(data) {
  let elements = formUser.querySelectorAll("input");
  for (let i = 0; i < elements.length; i++) {
    document.getElementById(elements[i].id).value = data[elements[i].id];
  }
};
function showPreload() {
  preload.style.display = "block";
};
function hidePreload() {
  preload.style.display = "none";
}
window.addEventListener('load', (e) => {
  getDataUser();
});