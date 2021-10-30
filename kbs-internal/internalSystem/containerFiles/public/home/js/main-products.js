//const mainCatagories = ["", "", ""]

//const $ = require("jquery"); 

const addProducts = "products/add-product"; 
const modifyProducts = "products/modify-products";
const displayProducts = "products/display-products";
const removeProducts = "../Views/remove-products.html";
const addCompanies = "products/add-company";
const modifyCompanies = "../Views/modify-companies.html";
const displayCompanies = "products/display-companies";
const removeCompanies = "../Views/remove-companies.html";


const url = "http://localhost:8123/";

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
                "<option value='display-product'>عرض المنتجـات </option>" +
                "<br /><br />" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#product-choice").change(function () {

                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "add-product") {
                        let win = window.open(url+addProducts, '_blank');
                        if (win) {
                            //Browser has allowed it to be opened
                            win.focus();
                        } else {
                            //Browser has blocked it
                            alert('Please allow popups for this website');
                        }

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



$(document).ready(function () {

    $("#companies").change(function () {
        let select = document.getElementById("select"),
            arr = ["html", "css", "java", "javascript", "php", "c++", "node.js", "ASP", "JSP", "SQL"];

        for (var i = 0; i < arr.length; i++) {
            var option = document.createElement("OPTION"),
                txt = document.createTextNode(arr[i]);
            option.appendChild(txt);
            option.setAttribute("value", arr[i]);
            select.insertBefore(option, select.lastChild);
        }
    });
});


