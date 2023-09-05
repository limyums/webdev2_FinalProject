var username = "";

$(() => {
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser')) || [];
    username = loginUser[0].id;
    console.log(username);
    getUserDashInfo(username);
    $(".transferToBox").hide();


    $("#btnLogout").on("click", function(){
        sessionStorage.clear();
        window.location = "./login.html";
    })
      // menu controll
    $(".userDashboard").on("click", function(){
        $(".infoDashboard").show();
        $(".infoTransfer").hide();
        $(".infoTransaction").hide();
        $(".infoAccount").hide();
        getUserDashInfo();

    })
    $(".userTransfer").on("click", function(){
        $(".infoDashboard").hide();
        $(".infoTransfer").show();
        $(".infoTransaction").hide();
        $(".infoAccount").hide();
        getUserTransfer();

    })
    $(".userTransaction").on("click", function(){
        $(".infoDashboard").hide();
        $(".infoTransfer").hide();
        $(".infoTransaction").show();
        $(".infoAccount").hide();
        getUserTransaction();


    })
    $(".userAccount").on("click", function(){
        $(".infoDashboard").hide();
        $(".infoTransfer").hide();
        $(".infoTransaction").hide();
        $(".infoAccount").show();
        getUserAccount();

    })

    //input change
    $('input[type=radio][name=usertransType]').change(function () {
        if (this.value == 'Withdraw' || this.value == 'Deposit') {
          $(".transferToBox").hide();
        } else if (this.value == 'Transfer') {
          $(".transferToBox").show();
        }
      });
      
    $("#btnUserTransfer").on("click", function(){
        let flag = true;
        let formData = {
            accountId: $("select[name=userMyAccount]").val(),
            accountIdFrom: $("select[name=userMyAccount]").val(),
            accountIdTo: $("select[name=userTransferTo]").val(),
            type: $('input[type=radio][name=usertransType]:checked').val(),
            amount: $('input[type=number][name=userTransAmount]').val(),
            categoryId: $("select[name=userCategorySelect]").val(),
            description: $('input[type=text][name=userTransdescription]').val()
        }
        if (formData.type == "Transfer") {
          if (formData.accountIdTo == null) {
            showSnackbar("please select account ID");
            flag = false;
          }
        }else{
            formData.accountIdFrom = null;
            formData.accountIdTo = null;
        }
        if (formData.categoryId == 0) {
          showSnackbar("please select category");
          flag = false;
        }
        if (formData.amount == "") {
          showSnackbar("please write amount");
          flag = false;
        }
        if(flag) {
          checkTransaction(formData);
          $("#userTransForm")[0].reset();
        }
      })
    
      $(".userTransAccount").on("change", function () {
        var selectedId = $(".userTransAccount").val();
        getTransationById(selectedId);
        
      })

      $("#btnUserAddAccount").on("click", function(){
        checkMaximumAccount(username);
      })
})

//User Dashboard
function updateUserDashboard(data) {
    var totalBalance = 0;
    var barChart = "";

    $(".userInfo").html(username);
    let userData = data.filter(function (obj) {
        return obj.username == username;
    });
    userData.forEach(function (element, index) {
        totalBalance += getBalance(element);
        barChart += `<div class="accountBarItem` + index + `">` + getBalance(element) + `</div>`
    });

    let newTrans = [];
    userData.forEach(element => {
        if (element.username == username) {
            element.transactions.forEach(tran => {
                newTrans.push(tran);
            })
        }
    })
    newTrans.sort((a, b) => b.id - a.id);
    $(".dash_total").empty();
    $(".dash_accountBar").empty();
    $(".tb_recentTrans").empty();

    //total value
    $(".dash_total").append(`Total Balance <div class="numbers">` + totalBalance.toLocaleString("en-US") + `</div>`);
    gsap.fromTo($(".dash_total"), { opacity : 0 } , { opacity : 1, duration : 1.5})

    //balance chart
    if (totalBalance != 0) {
        $(".dash_accountBar").append(barChart);
        for (let i = 0; i < userData.length; i++) {
            let tempWidth = parseFloat($(".dash_accountBar div:eq(" + i + ")").text()) / totalBalance * 100;
            $(".dash_accountBar div:eq(" + i + ")").html(parseFloat($(".dash_accountBar div:eq(" + i + ")").text()).toLocaleString("en-US"))
            $(".dash_accountBar div:eq(" + i + ")").css({
                "width": tempWidth + "%",
                padding: "1em"
            })
            if (i == 0) {
                $(".dash_accountBar div:eq(" + i + ")").css({
                    "background-color": "#141E46",
                    color: "white"
                })
            } else if (i == 1) {
                $(".dash_accountBar div:eq(" + i + ")").css({
                    "background-color": "#BB2525",
                    color: "white"
                })
            } else if (i == 2) {
                $(".dash_accountBar div:eq(" + i + ")").css({
                    "background-color": "#FF6969",
                    color: "white"
                })
            } else if (i == 3) {
                $(".dash_accountBar div:eq(" + i + ")").css({
                    "background-color": "#FFF5E0",
                    color: "#141E46"
                })
            } else if (i == 4) {
                $(".dash_accountBar div:eq(" + i + ")").css({
                    "background-color": "white",
                    color: "#141E46"
                })
            }
            gsap.fromTo($(".dash_accountBar div:eq(" + i + ")"), { width: 0 }, { width: tempWidth + "%", duration: 1.5 });
        }
    }
    //table 
    var txt = `<tr><th>Id</th>
     <th>Username</th>
     <th>Transaction Type</th>
     <th class="hidden_mobile">Category</th>
     <th class="hidden_mobile">Description</th>
     <th>Amount</th>
     <th class="hidden_mobile">From</th>
     <th class="hidden_mobile">To</th>
     </tr>`;
    // generate no record 
    if (newTrans.length == 0) {
        txt += `<tr><td colspan="8"> No record </td></tr>`;
    } else {
        let length = newTrans.length;
        if (length > 10) {
            length = 10
        }
        for (let i = 0; i < length; i++) {
            var userNameFrom = "";
            var userNameTo = "";
            if (newTrans[i].accountIdFrom != null && newTrans[i].accountIdTo != null) {
                let tmpFrom = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdFrom;
                });
                let tmpTo = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdTo;
                });
                userNameFrom = tmpFrom[0].username;
                userNameTo = tmpTo[0].username;
            }
            txt += `<tr>
                    <td>`+ newTrans[i].accountId + `</td>
                    <td>` + username + `</td>
                    <td>`+ newTrans[i].type + `</td>
                    <td class="hidden_mobile">`+ newTrans[i].categoryId + `</td>
                    <td class="hidden_mobile">`+ newTrans[i].description + `</td>
                    <td>`+ newTrans[i].amount.toLocaleString("en-US") + `</td>
                    <td class="hidden_mobile">`+ userNameFrom + `</td>
                    <td class="hidden_mobile">`+ userNameTo + `</td>
                </tr>`
        }
    }
    $(".tb_recentTrans").append(txt);
    gsap.fromTo($(".tb_recentTrans"), { opacity : 0 } , { opacity : 1, duration : 1.5});
}

//User Transfer Section
function updateUserTransfer(data){
    var myData = data.filter(function (obj) {
        return obj.username == username ;
    });
    var toData = data.filter(function (obj) {
        return obj.username != username ;
    }); 

    $(".userMyAccount").empty();
    $(".userTransferTo").empty();
    const defaultOption = new Option('Choose a Account', '0');
    $(".userTransferTo").append(defaultOption);
    myData.forEach((element) => {
        const option = new Option(element.username + " : " + element.id, element.id);
        $(".userMyAccount").append(option);
    });
    toData.forEach((element) => {
        const option = new Option(element.username + " : " + element.id, element.id);
        $(".userTransferTo").append(option);
    });
}

// User Transaction total
function updateUserTransaction(data) {
    let userData = data.filter(function (obj) {
        return obj.username == username;
    });

    $(".userTransAccount").empty();
    const defaultOption = new Option('total', '0');
    $(".userTransAccount").append(defaultOption);
    userData.forEach((element) => {
        const option = new Option(element.username + " : " + element.id, element.id);
        $(".userTransAccount").append(option);
    });

    let newTrans = [];
    userData.forEach(element => {
        if (element.username == username) {
            element.transactions.forEach(tran => {
                newTrans.push(tran);
            })
        }
    })
    newTrans.sort((a, b) => b.id - a.id);
    //table 
    $(".tb_userTrans").empty();
    var txt = `<tr><th>Id</th>
     <th>Username</th>
     <th>Transaction Type</th>
     <th class="hidden_mobile">Category</th>
     <th class="hidden_mobile">Description</th>
     <th>Amount</th>
     <th class="hidden_mobile">From</th>
     <th class="hidden_mobile">To</th>
     </tr>`;
    // generate no record 
    if (newTrans.length == 0) {
        txt += `<tr><td colspan="8"> No record </td></tr>`;
    } else {
        for (let i = 0; i < newTrans.length; i++) {
            var userNameFrom = "";
            var userNameTo = "";
            if (newTrans[i].accountIdFrom != null && newTrans[i].accountIdTo != null) {
                let tmpFrom = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdFrom;
                });
                let tmpTo = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdTo;
                });
                userNameFrom = tmpFrom[0].username;
                userNameTo = tmpTo[0].username;
            }
            txt += `<tr>
                    <td>`+ newTrans[i].accountId + `</td>
                    <td>` + username + `</td>
                    <td>`+ newTrans[i].type + `</td>
                    <td class="hidden_mobile">`+ newTrans[i].categoryId + `</td>
                    <td class="hidden_mobile">`+ newTrans[i].description + `</td>
                    <td>`+ newTrans[i].amount.toLocaleString("en-US") + `</td>
                    <td class="hidden_mobile">`+ userNameFrom + `</td>
                    <td class="hidden_mobile">`+ userNameTo + `</td>
                </tr>`
        }
    }
    $(".tb_userTrans").append(txt);
    gsap.fromTo($(".tb_userTrans"), { opacity : 0 } , { opacity : 1, duration : 1.5});

}
// User Transaction by Id
function updateUserTransactionById(data, id){
    if( id == 0 ){
        updateUserTransaction(data, "Ironman");
        return;
    }
    let userData = data.filter(function (obj) {
        return obj.id == id;
    });

    let newTrans = userData[0].transactions;
    newTrans.sort((a, b) => b.id - a.id);

    //table 
    $(".tb_userTrans").empty();
    var txt = `<tr><th>Id</th>
     <th>Username</th>
     <th>Transaction Type</th>
     <th class="hidden_mobile">Category</th>
     <th class="hidden_mobile">Description</th>
     <th>Amount</th>
     <th class="hidden_mobile">From</th>
     <th class="hidden_mobile">To</th>
     </tr>`;
    // generate no record 
    if (newTrans.length == 0) {
        txt += `<tr><td colspan="8"> No record </td></tr>`;
    } else {
        for (let i = 0; i < newTrans.length; i++) {
            var userNameFrom = "";
            var userNameTo = "";
            if (newTrans[i].accountIdFrom != null && newTrans[i].accountIdTo != null) {
                let tmpFrom = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdFrom;
                });
                let tmpTo = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdTo;
                });
                userNameFrom = tmpFrom[0].username;
                userNameTo = tmpTo[0].username;
            }
            txt += `<tr>
                    <td>`+ newTrans[i].accountId + `</td>
                    <td>` + "Ironman" + `</td>
                    <td>`+ newTrans[i].type + `</td>
                    <td class="hidden_mobile">`+ newTrans[i].categoryId + `</td>
                    <td class="hidden_mobile">`+ newTrans[i].description + `</td>
                    <td>`+ newTrans[i].amount.toLocaleString("en-US") + `</td>
                    <td class="hidden_mobile">`+ userNameFrom + `</td>
                    <td class="hidden_mobile">`+ userNameTo + `</td>
                </tr>`
        }
    }
    $(".tb_userTrans").append(txt);
    gsap.fromTo($(".tb_userTrans"), { opacity : 0 } , { opacity : 1, duration : 1});


}

function updateUserAccount(data){
    let userData = data.filter(function (obj) {
        return obj.username == username;
    });

    $(".tb_userAccountSummary").empty();
    var txt = `<tr><th>Account</th><th>Balance</th></tr>`;
    for(let i = 0; i <userData.length; i++){
        txt += `<tr><td>` + userData[i].id + `</td><td>` + getBalance(userData[i]).toLocaleString("en-US") + `</td></tr>`
    }
    $(".tb_userAccountSummary").append(txt);
}