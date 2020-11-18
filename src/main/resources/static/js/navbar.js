navbar();


function navbar() {
    fetch('http://localhost:8189/user/authUser')
        .then((response) => {
            if (!response.ok) {
                throw Error("Error : " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            const userRoles = data.roles.map(role => {
                return role.name.slice(5);
            }).join(", ");
            let a = document.createElement('a');
            a.setAttribute('class', "navbar-text text-white font-bold");
            a.setAttribute('fontSize', '33px');

            a.appendChild(document.createTextNode(data.email + " with roles : " + userRoles.toString()));

            let element = document.getElementById("navbar-user-info");
            element.append(a);
        })
        .catch(error => {
            console.log(error);
        });
}