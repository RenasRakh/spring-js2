userInfo();

function userInfo() {
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
            console.log(data);

            document.getElementById("user.id").innerHTML = data.id;
            document.getElementById("user.username").innerHTML = data.username;
            document.getElementById("user.password").innerHTML = data.password;
            document.getElementById("user.email").innerHTML = data.email;
            document.getElementById("user.firstName").innerHTML = data.firstName;
            document.getElementById("user.lastName").innerHTML = data.lastName;
            document.getElementById("user.roles").innerHTML = userRoles.toString();


        })
        .catch(error => {
            console.log(error);
        });
}