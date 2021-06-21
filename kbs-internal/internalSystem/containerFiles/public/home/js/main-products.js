//const mainCatagories = ["", "", ""]

//const $ = require("jquery");

 
console.log("function called");
$(document).ready(function () {

    $("#product-action").change(function () {
        let val = $(this).val();
        console.log("VAL IS " + val);
        if (val == "products-options") {
            $("#size").html("<form>" +
                                "<label for='products'> خيارات المنتـجات </label>" +
                                    "<select name='product-action' id='product-action'>" +                                
                                        "<option value='add-product'>إضافة قماش جديد   </option>" +
                                        "<option value='remove-product'>حذف قماش  </option>" +
                                        "<option value='modify-product'>التعديـل على قطعة موجودة </option>" + 
                                        "<br /><br />" + 
                                        "<input type = 'submit' value = 'تنفيذ'>  </input>" +
                                    "</select>" +
                                    "<br><br>" + 
                            "</form>");
        } else {
            $("#size").html("<h1> none </h1>");

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
