$(document).ready(function () {
    $('input[type="checkbox"]').click(function () {
        if ($(this).is(":checked")) {
            console.log("Checkbox is checked.");
            //$("#primary").load("../Views/add-companies.html");
            const addCompanyApi = "../Views/add-companies.html";
            let win = window.open(addCompanyApi, '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
        } else if ($(this).is(":not(:checked)")) {
            console.log("Checkbox is unchecked.");
        }
    });
});



$(document).ready(function () {

    $("#fabricPrimaryType").change(function () {
        let val = $(this).val();
        console.log("VAL IS " + val);
        if (val == "Sahrah") {
            $("#fabricSecondaryType").html("<form>" +
                "<label for='sahrahOptions'> خيارات السـهرة </label> <br /> " +
                "<select name='sahrahOptions' id='sahrahOptions'>" +
                " <option value='default'> الرجاء الإختيار </option>" +
                "<option value='dantiel'> دانتيل  </option>" +
                "<option value='tol'>تل  </option>" +
                "<option value='modify-product'>دانتيل </option>" +
                "<option value='display-product'>دانتيل </option>" +
                "<br /><br />" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#fabricSecondaryType").change(function () {

                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "dantiel") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات الدانتيل </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='dantiel'> دانتيل  </option>" +
                            "<option value='tol'>دانتيل </option>" +
                            "<option value='modify-product'>دانتيل </option>" +
                            "<option value='display-product'>دانتيل </option>" +


                            "</select>" +
                            "</form>");


                    } else if (val == "modify-product") {
                        let win = window.open(modifyProducts, '_blank');
                        if (win) {
                            //Browser has allowed it to be opened
                            win.focus();
                        } else {
                            //Browser has blocked it
                            alert('Please allow popups for this website');
                        }
                    } else if (val == "display-product") {
                        let win = window.open(displayProducts, '_blank');
                        if (win) {
                            //Browser has allowed it to be opened
                            win.focus();
                        } else {
                            //Browser has blocked it
                            alert('Please allow popups for this website');
                        }
                    } else if (val == "remove-product") {
                        let win = window.open(removeProducts, '_blank');
                        if (win) {
                            //Browser has allowed it to be opened
                            win.focus();
                        } else {
                            //Browser has blocked it
                            alert('Please allow popups for this website');
                        }
                    } else {
                        $("#secondary").html("<h1> none </h1>");
                    }

                })
            })
        } else if (val == "Sadah") {
            $("#primary").html("<form>" +
                "<label for='companies'> خيارات الشركات </label>" +
                "<select name='company-choice' id='company-choice'>" +
                " <option value='company-options'> الرجاء الإختيار </option>" +
                "<option value='add-company'>إضافة شركة جديدة   </option>" +
                "<option value='modify-company'>التعديـل على شركة موجودة </option>" +
                "<option value='display-company'>عرض الشركات المسجلة في النظام </option>" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#company-choice").change(function () {
                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "add-company") {
                        $("#secondary").load("../Views/add-companies.html");
                    } else if (val == "modify-company") {
                        $("#secondary").load("../Views/modify-companies.html");
                    } else if (val == "display-company") {
                        $("#secondary").load("../Views/display-companies.html");
                    } else {
                        $("#secondary").html("<h1> none </h1>");
                    }
                })
            })
        } else {
            $("#secondary").html("<h1> none </h1>");
        }


    });
});




/*
      if($('#companyForm').submit)(function() {
          location.reload();
      })
  }*/


/*
$(document).ready(function () {

    $("#product-choice").change(function () {

        let val = $(this).val();
        console.log("VAL IS " + val);
        if (val == "add-product") {
            $("#secondary").load("../Views/add-products.html");
            /*
             $.ajax({
                 type: 'get',
                 url: serverLocation + "/signin",
                 success: function(data, textStatus) {
                     if (data.redirect) {
                         // data.redirect contains the string URL to redirect to
                         console.log("redirecting...");
                         window.location.href = data.redirect;
                     } else {
                         // data.form contains the HTML for the replacement form
                         //$("#myform").replaceWith(data.form);
                         console.log("Could not redirect");
                     }
                 }
                 ,
                 error: function (textStatus, errorThrown) {
                     console.log('Err');

                 }
             });
        */


$(document).ready(function () {

    $(function () {
        $("#testField").val('gateway_2');
    })
})