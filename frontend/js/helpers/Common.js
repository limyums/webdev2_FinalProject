// update UI .. select, table 

function initAccountSelectorUI(data) {
    if (data == null) {
        return;
    }
    //remove duplicate account name 
    let newData = [];
    for(let index = 0 ; index < data.length ; index++){
        if (data.map(i => i.username).indexOf(data[index].username) == index) {
            newData.push(data[index]);
        }
    }
    $(".accountSelect").empty();
    const defaultOption = new Option('Choose a Account', '0');
    $(".accountSelect").append(defaultOption);
    newData.forEach((element, index) => {
        const option = new Option(element.username, element.id);
        $(".accountSelect").append(option);
    });

}

function initAccountIdSelectorUI(data) {
    if (data == null) {
        return;
    }
    $(".accountIdSelect").empty();
    const defaultOption = new Option('Choose a Account', '0');
    $(".accountIdSelect").append(defaultOption);
    data.forEach((element) => {
        const option = new Option(element.username + " : " + element.id, element.id);
        $(".accountIdSelect").append(option);
    });

}

// null check confirm
function initCategorySelect(data) {
    if (data == null) {
        return;
    }
    $(".categorySelect").empty();
    const defaultOption = new Option('Choose Category', '0');
    $(".categorySelect").append(defaultOption);
    data.forEach((element) => {
        const option = new Option(element.name, element.id);
        $(".categorySelect").append(option);
    });
}

// null check confirm
function updataAccountSummary(data) {
    $(".tb_Account_summary").empty();
    var txt = `<tr><th>Account</th><th>Balance</th></tr>`;
    for(let i = 0; i <data.length; i++){
        txt += `<tr><td>` + data[i].id + `</td><td>` + getBalance(data[i]).toLocaleString("en-US") + `</td></tr>`
    }
    $(".tb_Account_summary").append(txt);
}

//null check confirm
function updataTransationDetail(data, username) {
    // currentID filter
    let newTrans = [];
    data.forEach(element => {
        if(element.username == username){
            element.transactions.forEach(tran => {
                newTrans.push(tran);
            })   
        }
    })
    newTrans.sort((a, b) => b.id - a.id);
    console.log(newTrans);
    $(".tb_transaction").empty();
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
            var userNameTo = ""
            if( newTrans[i].accountIdFrom != null &&  newTrans[i].accountIdTo != null){
                let tmpFrom = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdFrom ;
                });
                let tmpTo = data.filter(function (obj) {
                    return obj.id == newTrans[i].accountIdTo ;
                });
                console.log(tmpFrom);
                userNameFrom = tmpFrom[0].username;
                userNameTo = tmpTo[0].username;
            } 
            txt += `<tr>
                    <td>`+ newTrans[i].accountId + `</td>
                    <td>` + username +`</td>
                    <td>`+ newTrans[i].type + `</td>
                    <td class="hidden_mobile">`+ categorylist[newTrans[i].categoryId - 1].name + `</td>
                    <td class="hidden_mobile">`+ newTrans[i].description + `</td>
                    <td>`+ newTrans[i].amount.toLocaleString("en-US") + `</td>
                    <td class="hidden_mobile">`+ userNameFrom + `</td>
                    <td class="hidden_mobile">`+ userNameTo + `</td>
                </tr>`
        }
    }
    $(".tb_transaction").append(txt);
}

function updateTableAfterTransaction(data, id){
    let tmpData = data.filter(function (obj) {
        return obj.id == id;
    });
    var username = tmpData[0].username;

    let userData = data.filter(function (obj) {
        return obj.username == username;
    });

    updataTransationDetail(data, username);
    updataAccountSummary(userData);
}

function getBalance(data){
    var balance = 0;
    if(data.transactions.length != 0){
        for(let i = 0; i < data.transactions.length ; i++){
            if(data.transactions[i].type == "Deposit"){
                balance += data.transactions[i].amount;
            }else if(data.transactions[i].type == "Transfer" && data.transactions[i].accountIdTo == data.id){
                balance += data.transactions[i].amount
            }else if(data.transactions[i].type == "Transfer" && data.transactions[i].accountIdFrom == data.id){
                balance -= data.transactions[i].amount
            }else if(data.transactions[i].type == "Withdraw"){
                balance -= data.transactions[i].amount
            }
        }
    }
    return balance;
}

function showSnackbar(str) {
    $("#snackbar").html(str);
    $("#snackbar").fadeIn("slow").delay(3000).fadeOut("slow");
 }
  