const accountUrl = "http://localhost:3002/accounts"

// initialize Account & null check confirm
function initAccount() {
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            console.log(response);
            initAccountSelectorUI(response);
            initAccountIdSelectorUI(response);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}
//check duplicate and null check confirm
function addNewAccount(username) {
    $.ajax({
        type: "POST",
        url: accountUrl,
        data: JSON.stringify({newAccount: username}),
        contentType: 'application/json',
        success: function (response) {
            showSnackbar("creat account : " + username);
            initAccount();
        },
        error: function (error) {
            alert.log("Error Creating user" + error);

        }
    });
}

//null check confirm
function getAccountSummary(username) {
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            let newData = response.filter(function (obj) {
                return obj.username == username;
            });
            console.log(newData);
            updataAccountSummary(newData);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}

//null check confirm
function getTransationDetail(username){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            updataTransationDetail(response, username);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}
//null check confirm 
function checkMaximumAccount(username) {
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            let newData = response.filter(function (obj) {
                return obj.username == username;
            });
            if(newData.length < 5){
                addNewAccount(username);
            }else{
                showSnackbar(username + " : maximum account is 5");
            }
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}

function checkBalance(transData){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            var index = -1;
            if(transData.type == "Withdraw"){
                index = transData.accountId - 1;
            }else if( transData.type == "Transfer"){
                index = transData.accountIdFrom - 1;
            }
            if(getBalance(response[index]) < parseFloat(transData.amount)){
                alert("Fail : current Balance _ " + getBalance(response[index]))
            }else{
                addTransaction(transData);
            }
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}

function getAccountAfterTransaction(transaction){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            console.log(transaction.accountId);
            if(transaction.accountId != null){
                updateTableAfterTransaction(response, transaction.accountId);
            }else if(transaction.accountIdFrom != null){
                updateTableAfterTransaction(response, transaction.accountIdFrom);    
            }
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}

//For User Page  
function getUserDashInfo(){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            updateUserDashboard(response);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}

function getUserTransfer(){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            updateUserTransfer(response);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });

}

function getUserTransaction(){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            updateUserTransaction(response);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}

function getTransationById(id){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            updateUserTransactionById(response, id);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}

function getUserAccount(){
    $.ajax({
        url: accountUrl,
        type: 'GET',
        success: function (response) {
            updateUserAccount(response);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}