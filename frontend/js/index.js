
$(() => {
  //init sequence - animation and get init data
  logoAnimation();
  //radio button toggle;
  checkRadioButton();
  //update selector
  initAccount();
  initCategory();

  // button click and select change
  // current Account summary
  $("#currentAccount").on("change", function () {
    var username = "";
    $("#currentAccount option:selected").each(function () {
      username = $(this).text();
    });
    if (username != "") {
      getAccountSummary(username);
    }
  })

  // selected Account transation
  $("#currentDetailAccount").on("change", function () {
    var username = "";
    $("#currentDetailAccount option:selected").each(function () {
      username = $(this).text();
    });
    if (username != "") {
      getTransationDetail(username);
    }
  })
  // button New Account 
  $("#btnNewAccount").on("click", function () {
    let username = $("input[name=txtNewAccount]").val();
    if (username == "") {
      showSnackbar("please enter the text");
    } else {
      checkMaximumAccount(username);
    }
  });
    // button New Category 
  $("#btnNewCategory").on("click", function () {
    let category = $("input[name=txtNewCategory]").val();
    if (category == "") {
      showSnackbar("please enter the text");
    } else {
      checkDuplicateCategory(category);
    }
  });
    // button New Transaction 
  $("#btnAddTrans").on("click", function(){
    let flag = true;
    let formData = {
        accountId: $("select[name=accountSelect").val(),
        accountIdFrom: $("select[name=fromSelect]").val(),
        accountIdTo: $("select[name=toSelect]").val(),
        type: $('input[type=radio][name=transType]:checked').val(),
        amount: $('input[type=number][name=amount]').val(),
        categoryId: $(".categorySelect").val(),
        description: $('input[type=text][name=description]').val()
    }
    if (formData.type == "Withdraw" || formData.type == "Deposit") {
      if (formData.accountId == null) {
        showSnackbar("please select account ID");
        flag = false;
      }
      formData.accountIdFrom = null;
      formData.accountIdTo = null;
    } else if (formData.type == "Transfer") {
      if (formData.accountIdFrom == null || formData.accountIdTo == null) {
        showSnackbar("please select account ID");
        flag = false;
      }
      if(formData.accountIdFrom ==formData.accountIdTo){
        showSnackbar("select different ID");
        flag = false;
      }
    }
    if (formData.categoryId == null) {
      showSnackbar("please select category");
      flag = false;
    }
    if (formData.amount == "") {
      showSnackbar("please write amount");
      flag = false;
    }
    if(flag) {
      checkTransaction(formData);
      $("#transForm")[0].reset();
    }
  })
  $("#btnAdminLogout").on("click", function () {
    sessionStorage.clear();
    window.location = "./login.html";
  })
});

function checkRadioButton() {
  $('input[type=radio][name=transType]').change(function () {
    if (this.value == 'Withdraw') {
      $(".account").show();
      $(".from").hide();
      $(".to").hide();
    } else if (this.value == 'Deposit') {
      $(".account").show();
      $(".from").hide();
      $(".to").hide();
    } else if (this.value == 'Transfer') {
      $(".account").hide();
      $(".from").show();
      $(".to").show();
    }
  });
}

function checkTransaction(formData) {
  if(formData.type == "Withdraw" || formData.type == "Transfer"){
    checkBalance(formData);
  }else{
    addTransaction(formData);
  }
}

function logoAnimation() {
  gsap.set(".logo", {
    gsap: "preserve-3d"
  });
  gsap.set([".frontlogo"], {
    backfaceVisibility: "hidden"
  });

  var tl = gsap.timeline({
    repeat: -1,
    yoyo: true
  })
  tl
    .to(".logo", 4, {
      top: -25
    })
    .to(".logo", 2, {
      rotationY: -40
    }, "-=.2")
    .to(".logo", 4, {
      rotationY: -180,
    }, "-=.2")
    .to(".logo", 2, {
      rotationY: -380,
    }, "-=.2");

}
