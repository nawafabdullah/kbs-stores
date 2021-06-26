//const mainCatagories = ["", "", ""]

//const $ = require("jquery"); 


console.log("function called");
$(document).ready(function () {

    $("#product-action").change(function () {
        let val = $(this).val();
        console.log("VAL IS " + val);
        if (val == "products-options") {
            $("#primary").html("<form>" +
                "<label for='products'> خيارات المنتـجات </label>" +
                "<select name='product-choice' id='product-choice'>" +
                " <option value='products-options'> الرجاء الإختيار </option>" +
                "<option value='add-product'>إضافة قماش جديد   </option>" +
                "<option value='remove-product'>حذف قماش  </option>" +
                "<option value='modify-product'>التعديـل على قطعة موجودة </option>" +
                "<br /><br />" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#product-choice").change(function () {
                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "add-product") {
                        $("#secondary").load("../Main-Products/Products/Add-Products/index.html");
                    } else if (val == "remove-product") {
                        $("#secondary").load("../Main-Products/Products/Remove-Products/index.html");
                    } else if (val == "modify-product") {
                        $("#secondary").load("../Main-Products/Products/Modify-Products/index.html");
                    } else if (val == "display-product") {
                        $("#secondary").load("../Main-Products/Products/Display-Products/index.html");
                    } else {
                        $("#secondary").html("<h1> none </h1>");
                    }
                })
            })

        } else if (val == "company-options") {
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
                        $("#secondary").load("../Main-Products/Companies/Add-Companies/index.html");
                    } else if (val == "modify-company") {
                        $("#secondary").load("../Main-Products/Companies/Modify-Companies/index.html");
                    } else if (val == "display-company") {
                        $("#secondary").load("../Main-Products/Companies/Display-Companies/index.html");
                    } else {
                        $("#secondary").html("<h1> none </h1>");
                    }
                })
            })
        } else {
            $("#secondary").html("<h1> none </h1>");
        }



        /*
        else if (val == "companies-options") {
            $("#size").html("<option value='test'>item2: test 1</option><option value='test2'>item2: test 2</option>");
        }
/*
 
 
        /*
        else if (val == "item3") {
            $("#size").html("<option value='test'>item3: test 1</option><option value='test2'>item3: test 2</option>");
        } else if (val == "item0") {
            $("#size").html("<option value=''>--select one--</option>");
        }
 
*/

    });
});



