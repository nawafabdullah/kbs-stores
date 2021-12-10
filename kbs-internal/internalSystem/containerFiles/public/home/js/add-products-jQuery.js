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
                "<option value='shok'>شك </option>" +
                "<option value='tortor'>ترتر </option>" +
                "<br /><br />" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#fabricSecondaryType").change(function () {

                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "tol") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات التل </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='colored'> ملون  </option>" +
                            "<option value='sadah'>ساده </option>" +
                            "<option value='shok'>شك </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "dantiel") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات الدانتيل </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='sadah'> ساده  </option>" +
                            "<option value='motarraz'>مطرز </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "shok") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات الشك </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='Chiffon'> شيفون </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "tortor") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات الترتر </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='sadah'> ساده  </option>" +
                            "<option value='motarraz'>مطرز </option>" +
                            "</select>" +
                            "</form>");
                    }
                })
            })
        } else if (val == "Sadah") {
            $("#fabricSecondaryType").html("<form>" +
                "<label for='sahrahOptions'> خيارات الساده </label> <br /> " +
                "<select name='sahrahOptions' id='sahrahOptions'>" +
                " <option value='default'> الرجاء الإختيار </option>" +
                "<option value='crepe'>  كريب </option>" +
                "<option value='silk-satin'> حرير ساتان </option>" +
                "<option value='cotton'>قطن  </option>" +
                "<option value='linen'>لنن </option>" +
                "<option value='velvet'>مخمل  </option>" +
                "<option value='denim'>دنم </option>" +
                "<option value='leather'>جلد  </option>" +
                "<option value='gorgette'>جودجيت  </option>" +
                "<option value='chiffon'>شيفون </option>" +
                "<option value='wool'>صوف </option>" +
                "<br /><br />" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#fabricSecondaryType").change(function () {

                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "crepe") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='crepeOptions'> خيارات الكريب </label> <br />" +
                            "<select name='crepeOptions' id='crepeOptions'>" +
                            "<option value='crepe'> كريب  </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "silk-satin") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات حرير ساتان </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='silk-satin-plain'> حرير ساتان ساده  </option>" +
                            "<option value='silk-satin-shine'>حرير ساتان لمعه </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "cotton") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='cottonOptions'> خيارات الشك </label> <br />" +
                            "<select name='cottonOptions' id='cottonOptions'>" +
                            "<option value='cotton-plain'> قطن </option>" +
                            "<option value='cotton-satin'>قطن ساتان </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "linen") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='linenOptions'> خيارات اللنن </label> <br />" +
                            "<select name='linenOptions' id='linenOptions'>" +

                            "<option value='linen'> لنن  </option>" +

                            "</select>" +
                            "</form>");
                    } else if (val == "velvet") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='velvetOptions'> خيارات المخمل </label> <br />" +
                            "<select name='velvetOptions' id='velvetOptions'>" +
                            "<option value='velvet'> مخمل  </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "denim") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='denimOptions'> خيارات الدنم </label> <br />" +
                            "<select name='denimOptions' id='denimOptions'>" +
                            "<option value='denim'> دنم  </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "leather") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='leatherOptions'> خيارات الجلد </label> <br />" +
                            "<select name='leatherOptions' id='leatherOptions'>" +
                            "<option value='leather'> جلد  </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "gorgette") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='gorgetteOptions'> خيارات الجورجيت </label> <br />" +
                            "<select name='gorgetteOptions' id='gorgetteOptions'>" +
                            "<option value='gorgette'> جورجيت  </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "chiffon") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='chiffonOptions'> خيارات الشيفون </label> <br />" +
                            "<select name='chiffonOptions' id='chiffonOptions'>" +
                            "<option value='chiffon'> شيفون  </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "wool") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='woolOptions'> خيارات الصوف </label> <br />" +
                            "<select name='woolOptions' id='woolOptions'>" +
                            "<option value='wool'> صوف  </option>" +
                            "</select>" +
                            "</form>");
                    }
                })


            })

        } else if (val == "مشجر") {
            $("#fabricSecondaryType").html("<form>" +
                "<label for='sahrahOptions'> خيارات المشجر </label> <br /> " +
                "<select name='sahrahOptions' id='sahrahOptions'>" +
                " <option value='default'> الرجاء الإختيار </option>" +
                "<option value='crepe'>  كريب </option>" +
                "<option value='tol'> حرير ساتان </option>" +
                "<option value='shok'>قطن  </option>" +
                "<option value='tortor'>قطن ساتان </option>" +
                "<option value='tortor'>لنن </option>" +
                "<option value='tortor'>مخمل  </option>" +
                "<option value='tortor'>جينز </option>" +
                "<option value='tortor'>كريب ديشين  </option>" +
                "<option value='tortor'>جودجيت  </option>" +
                "<option value='tortor'>شيفون </option>" +
                "<br /><br />" +

                "</select>" +
                "</form>");

            $(document).ready(function () {

                $("#fabricSecondaryType").change(function () {

                    let val = $(this).val();
                    console.log("VAL IS " + val);
                    if (val == "tol") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات التل </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='colored'> ملون  </option>" +
                            "<option value='sadah'>ساده </option>" +
                            "<option value='shok'>شك </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "dantiel") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات الدانتيل </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='sadah'> ساده  </option>" +
                            "<option value='motarraz'>مطرز </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "shok") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات الشك </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='Chiffon'> شيفون </option>" +
                            "</select>" +
                            "</form>");
                    } else if (val == "tortor") {
                        $("#fabricQuality").html("<form>" +
                            "<label for='sahrahOptions'> خيارات الترتر </label> <br />" +
                            "<select name='sahrahOptions' id='sahrahOptions'>" +
                            "<option value='default'> الرجاء الإختيار </option>" +
                            "<option value='sadah'> ساده  </option>" +
                            "<option value='motarraz'>مطرز </option>" +
                            "</select>" +
                            "</form>");
                    }


                })


            })

        }



    })
}


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
)
