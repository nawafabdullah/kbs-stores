const { GetDatabase } = require("../../../../../mongoDB/containerFiles/mongo");


$(document).ready(function () {

    $("#modify-options").change(function () {
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
                "<option value='display-product'>عرض المنتجـات </option>" +
                "<br /><br />" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#product-choice").change(function () {
                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "add-product") {
                        $("#secondary").load("../Views/add-products.html");
                    } else if (val == "remove-product") {
                        $("#secondary").load("../Views/remove-products.html");
                    } else if (val == "modify-product") {
                        $("#secondary").load("../Views/modify-products.html");
                    } else if (val == "display-product") {
                        $("#secondary").load("../Views/display-products.html");
                    } else {
                        $("#secondary").html("<h1> none </h1>");
                    }
                })
            })




            async function ModifyProducts(productIDj) {
                let database = GetDatabase;
                let product = await database.collection(`${dbConfig.PRODUCTS}`).find(productID);

            }

//async function