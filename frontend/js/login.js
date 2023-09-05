$(() => {
    $("#btnLogin").on("click", function () {
        let loginId = $("#loginId").val();
        let loginPW = $("#loginPW").val();
        let users = getUsers();
        console.log(users)
        if (users.length != 0) {
            let checkUser = users.filter(function (obj) {
                return obj.id == loginId;
            });

            if (checkUser != null) {
                if (checkUser[0].pw != loginPW) {
                    showSnackbar("wrong password");
                } else {
                    sessionStorage.setItem("loginUser", JSON.stringify(checkUser));
                    if (checkUser[0].id == "admin") {
                        console.log("aaa")
                        window.location = "./index.html"
                    } else {
                        window.location = "./user.html"
                    }
                }
            }else{
                showSnackbar("wrong Id");
            }
        }
    });

    $("#btnCreateAccount").on("click", function () {
        let createId = $("#loginId").val();
        let createPW = $("#loginPW").val();
        const newUser = { id: createId, pw: createPW }
        console.log(newUser.id + newUser.pw);
        addUser(newUser);
    });

})

function addUser(user) {
    var users = getUsers();
    console.log(users);
    if (users.length != 0) {
        let checkUser = users.filter(function (obj) {
            return obj.id == user.id;
        });
        console.log(checkUser);

        if (checkUser.length != 0) {
            showSnackbar("already exsist user")
            return;
        }
        console.log(checkUser);
    }
    // Modifying
    var user = {
        id: user.id,
        pw: user.pw
    };
    users.push(user);
    // Saving
    localStorage.setItem("users", JSON.stringify(users));
}


function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}