const transactionUrl = "http://localhost:3002/transactions"

function addTransaction(data) {
    var tmpData = {
        newTransaction: {
            accountId: parseFloat(data.accountId),
            accountIdFrom: parseFloat(data.accountIdFrom),
            accountIdTo: parseFloat(data.accountIdTo),
            type: data.type,
            amount: parseFloat(data.amount),
            categoryId: parseFloat(data.categoryId),
            description: data.description
        }
    }
    $.ajax({
        type: "POST",
        url: transactionUrl,
        data: JSON.stringify(tmpData),
        contentType: 'application/json',
        success: function (response) {
            console.log(response)
            showSnackbar("success transacion : " + tmpData.newTransaction.type)
            getAccountAfterTransaction(tmpData.newTransaction);
        },
        error: function (error) {
            alert.log("Error Creating user" + error);

        }
    });
}

// no use now 
function getAllTransaction() {
    $.ajax({
        url: transactionUrl,
        type: 'GET',
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}