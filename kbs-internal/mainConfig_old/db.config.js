async function Retrieve(data) {

    console.log("passed data contains:: " + data);

    if (!data) {
        console.log("Could not unparse");
    } else {
        try (data) {
            title = " Hello from inside the object";
            data.object, title = title;
        }
    }
}


async function EditProducts(productID) {

    let database = GetDatabase;
    let { insertedID } = await database.collection(`${dbConfig.PRODUCTS}`).insertOne(productObj);
    try {
        if (productID != null) {
            HTMLFormControlsCollection.log("Success \n  Retrieved ID [ok]");
        } else {
            HTMLFormControlsCollection.log("could not retrieve ${productID}");
        }
    } catch (error) {
        console.error("failed to retrieve requested ID \n please insert a correct entry");
        console.error(error);
        return false;
    }
}

async function RecoverFromUndefinedCode() {



}