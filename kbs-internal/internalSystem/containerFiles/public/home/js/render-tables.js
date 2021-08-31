async function RenderTables(array, table) {
    let headers = Object.keys(array[0]);
    console.log(headers);

    await GenerateTableHeaders(headers, table);
    await GenerateTable(array);

    return;
}

async function GenerateTableHeaders(data, table) {
    let thead = await table.createTHead();
    let row = await thead.insertRow();
    for (let key of data) {
        let th = await document.createElement("th");
        let text = await document.createTextNode(key);
        await th.appendChild(text);
        await row.appendChild(th);
    }
}

async function GenerateTable(data, table) {
    for (let element of data) {
        let row = await table.insertRow();
        for (key in element) {
            let cell = await row.insertCell();
            let text = await document.createTextNode(element[key]);
            await cell.appendChild(text);
        }
    }
}

//let table = document.querySelector("table");





module.exports = { RenderTables };