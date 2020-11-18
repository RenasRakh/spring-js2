let saveButtonInModalForm = $('#updateButtonInModal div');
let deleteButtonInModalForm = $('#deleteButtonInModal div');


let elementCloseDeleteModal1 = document.getElementById('closeDeleteModal');
let elementCloseDeleteModal2 = document.getElementById('closeDeleteModal2');
let elementCloseUpdateModal1 = document.getElementById('closeUpdateModal');
let elementCloseUpdateModal2 = document.getElementById('closeUpdateModal2');

usersTable();

//счетчики для удаления дублей кнопок
let sch=0;
let sc=0;

elementCloseDeleteModal1.onclick = function () {
    document.getElementById('delButtInModal').remove();
};

elementCloseDeleteModal2.onclick = function () {
    document.getElementById('delButtInModal').remove();
};

elementCloseUpdateModal1.onclick = function () {
    document.getElementById('updButtInModal').remove();
};

elementCloseUpdateModal2.onclick = function () {
    document.getElementById('updButtInModal').remove();
};



function usersTable() {
    fetch('http://localhost:8189/admin/usersTable')
        .then((response) => {
            if (!response.ok) {
                throw Error("Error : " + response.status);
            }
            return response.json();
        })
        .then((data) => {


            document.querySelector('#test tbody').innerHTML += data.map(n => `


  <tr>
  <td>${n.id}</td>
    <td>${n.username}</td>
    <td>${n.password}</td>
    <td>${n.email}</td>    
    <td>${n.rolesString}</td>
    <td>${n.firstName}</td>
    <td>${n.lastName}</td>
    <td><button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#updateModal"
    id="updateButton${n.id}" onclick="updateClick(${n.id})">Edit</button></td>
    <td><button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal"
    id="updateButton${n.id}" onclick="deleteClick(${n.id})">Delete</button></td>
  </tr>
`).join('');


        })
        .catch(error => {
            console.log(error);
        });
}

function iter(item, index) {
    console.log(item);

    //fillingModalFormUpdate(item.id);


}


//заполнение мод окна на редактирование
function updateClick(id){

    let updateButtonInModal = document.createElement('button');
    let userIdForUpdateButton = "updateUser" + "(" + id + ")";

    updateButtonInModal.setAttribute('type', "button");
    updateButtonInModal.setAttribute('id', "updButtInModal"+sch);
    updateButtonInModal.setAttribute('class', "btn btn-success");
    updateButtonInModal.setAttribute('data-dismiss', "modal");
    updateButtonInModal.setAttribute('onclick', `${userIdForUpdateButton}`);
    updateButtonInModal.appendChild(document.createTextNode("Save"));

    saveButtonInModalForm.append(updateButtonInModal);
    if(sch!==0) {
        let sch2 = sch - 1;
        document.getElementById('updButtInModal' + sch2).remove();
    }
    sch=sch+1;





    fetch('http://localhost:8189/admin/user/' + id).then(function (response) {
        response.json().then(function (data) {

            $('#idEdit').val(id);
            $('#usernameEdit').val(data.username);
            $('#passwordEdit').val(data.password);
            $('#emailEdit').val(data.email);
            $('#firstNameEdit').val(data.firstName);
            $('#lastNameEdit').val(data.lastName);

            const select = document.querySelector('#select').getElementsByTagName('option');
            select[0].selected = false;
            select[1].selected = false;
            if (data.admin){
                select[0].selected = true;
            }

            if (data.user){
                select[1].selected = true;
            }

        });
    });
}

//изменение юзера
async function updateUser(value) {

    let id = '#idEdit';
    let username = '#usernameEdit';
    let password = '#passwordEdit';
    let email = '#emailEdit';
    let firstName = '#firstNameEdit';
    let lastName = '#lastNameEdit';

    let elementUpdateUserRoles = document.getElementById('select');

    let roleSelectedValues = Array.from(elementUpdateUserRoles.selectedOptions).map(el => el.value);
    let roleArray = convertToRoleSet(roleSelectedValues);

    let data = {
        id: $(id).val(),
        username: $(username).val(),
        password: $(password).val(),
        email: $(email).val(),
        firstName: $(firstName).val(),
        lastName: $(lastName).val(),

        roles: roleArray

    };

    const response = await fetch('http://localhost:8189/admin/updateUser/', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });


    window.location.reload();
    return response.json();
}

function convertToRoleSet(Array) {
    let roleArray = [];

    if (Array.indexOf("ROLE_USER") !== -1) {
        roleArray.unshift({id: 1, name: "ROLE_USER"});
    }
    if (Array.indexOf("ROLE_ADMIN") !== -1) {
        roleArray.unshift({id: 2, name: "ROLE_ADMIN"});
    }
    return roleArray;
}

function deleteClick(id){
    let deleteButtonInModal = document.createElement('button');
    let userIdForDeleteButton = "deleteUser" + "(" + id + ")";

    deleteButtonInModal.setAttribute('type', "button");
    deleteButtonInModal.setAttribute('id', "delButtInModal"+sc);
    deleteButtonInModal.setAttribute('class', "btn btn-danger");
    deleteButtonInModal.setAttribute('data-dismiss', "modal");
    deleteButtonInModal.setAttribute('onclick', `${userIdForDeleteButton}`);
    deleteButtonInModal.appendChild(document.createTextNode("Delete"));

    deleteButtonInModalForm.append(deleteButtonInModal);


    if(sc!==0) {
        let sc2 = sc - 1;
        document.getElementById('delButtInModal' + sc2).remove();
    }
    sc=sc+1;




    fetch('http://localhost:8189/admin/user/' + id).then(function (response) {
        response.json().then(function (data) {

            $('#id1').val(id);
            $('#username1').val(data.username);
            $('#password1').val(data.password);
            $('#email1').val(data.email);
            $('#firstName1').val(data.firstName);
            $('#lastName1').val(data.lastName);

            const select = document.querySelector('#select0').getElementsByTagName('option');
            select[0].selected = false;
            select[1].selected = false;
            if (data.admin){
                select[0].selected = true;
            }

            if (data.user){
                select[1].selected = true;
            }

        });
    });
}

async function deleteUser(value) {

    await fetch('http://localhost:8189/admin/deleteUser/' + value, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    //document.getElementById('delButtInModal').remove();
    window.location.reload();
}

async function newUser() {


    // document.getElementById('hideTheUsersTable').hidden = true;
    // document.getElementById('hideTheCreateUserForm').hidden = false;

    let elementCreateUserRoles = document.getElementById('sel2');

    let roleSelectedValues = Array.from(elementCreateUserRoles.selectedOptions).map(el => el.value);
    let roleArray = convertToRoleSet(roleSelectedValues);

    let data = {
        username: $('#username').val(),
        password: $('#password').val(),
        email: $('#email').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),

        roles: roleArray

    };

    let newUserUrl = 'http://localhost:8189/admin/newUser';

    const response = await fetch(newUserUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
        .catch(error => {
            console.log(error);
        });
    window.location.reload();
    return response.json();

}
