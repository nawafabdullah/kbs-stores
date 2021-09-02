const jsdom = require("jsdom");
const { JSDOM } = jsdom;



async function RenderTables(array, dom) {
    let headers = Object.keys(array[0]);
    console.log(headers);
    const testDom = new JSDOM(`<!DOCTYPE html><body><p id="main"> hello there </p></body>`);

    const table = dom.window.document.getElementById("table");

    await GenerateTableHeaders(headers, table, dom);
    await GenerateTable(array, table, dom);

    return;
}

async function GenerateTableHeaders(data, table, dom) {
    let thead = await table.createTHead();
    let row = await thead.insertRow();
    for (let key of data) {
        let th = await dom.window.document.createElement("th");
        let text = await dom.window.document.createTextNode(key);
        await th.appendChild(text);
        await row.appendChild(th);
    }
}

async function GenerateTable(data, table, dom) {
    for (let element of data) {
        let row = await table.insertRow();
        for (key in element) {
            let cell = await row.insertCell();
            let text = await dom.window.document.createTextNode(element[key]);
            await cell.appendChild(text);
        }
    }
}

//let table = document.querySelector("table");





module.exports = { RenderTables }