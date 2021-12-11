let data = {
    "documentTitle": "فاتورة شراء", //Defaults to INVOICE
    //"locale": "ar-AR",
    "currency": "SAR",
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "",
        "address": "",
      //"zip": "-",
        "city": "",
        "country": "السـعودية"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
        "company": "مبيـعات المعرض",
        "address": "-",
        "zip": "-",
        "city": "الريـاض",
        "country": "السـعودية"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "",
    "invoiceDate": "",
    "products":
        [
            {
                "description": "",
                "quantity": "",
                "price": "",
                "VAT": ""
            },
        ],

    "translate": {
        "vat": "ضريبة القيمة المضافة",
        "invoiceNumber": "رقم الفاتورة ",
        "invoiceDate": "تاريخ الفاتورة",
        "products": "المشتريات",
        "quantity": "عدد الأمتار",
        "price": "السعر",
        "subtotal": "المجموع الفرعي",
        "total": "المجموع"
    },


    "bottomNotice": "Kindly pay your invoice within 15 days.",


};