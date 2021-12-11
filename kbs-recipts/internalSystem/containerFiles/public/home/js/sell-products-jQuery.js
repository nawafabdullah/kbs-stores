$(document).ready(function(){  
    let i=1;  
    $('#add').click(function(){  
         i++;  
         $('#dynamic_field').append('<tr id="row'+i+'"><td><input type="text" name="productCode[]" placeholder="كود القطعه" class="form-control name_list" /></td>id="row'+i+'"><td><input type="text" name="metersSold[]" placeholder="عدد الأمتار المباعة" class="form-control name_list" /></td><td><input type="text" name="meterPrice[]" placeholder="سعر المتر" class="form-control name_list" /></td><td><button type="button" name="remove" id="'+i+'" class="btn btn-danger btn_remove">X</button></td></tr>');  
         $('#dynamic_field').append(' ');
        });  
    $(document).on('click', '.btn_remove', function(){  
         var button_id = $(this).attr("id");   
         $('#row'+button_id+'').remove();  
    });  
     
});   