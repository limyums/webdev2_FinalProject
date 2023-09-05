const categoryUrl = "http://localhost:3002/categories"
const categorylist = [];

// initialize Category
function initCategory() {
    $.ajax({
        url: categoryUrl,
        type: 'GET',
        success: function (response) {
            console.log(response);
            while (categorylist.length) {
                categorylist.pop();
            }
            response.forEach(element => {
                categorylist.push(element);
            });
            initCategorySelect(response);
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}


//check duplicate and null check confirm
function addCategory(category) {
    $.ajax({
        type: "POST",
        url: categoryUrl,
        data: JSON.stringify({ newCategory: category }),
        contentType: 'application/json',
        success: function (response) {
            showSnackbar("creat Category : " + category);
            initCategory();
        },
        error: function (error) {
            alert.log("Error Creating user" + error);
        }
    });
}

//null check confirm
function checkDuplicateCategory(category) {
    $.ajax({
        url: categoryUrl,
        type: 'GET',
        success: function (response) {
            var index = response.map(i => i.name).indexOf(category);
            if(index == -1){
                addCategory(category);
            }else{
                showSnackbar(category + " alrady exsist");
            }
        },
        error: function (error) {
            console.error('Error retrieving user details:', error);
        }
    });
}