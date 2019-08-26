var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as Id " + connection.threadId + "\n");
    showProducts();
});

function showProducts() {
    connection.query("SELECT id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
};

function inquireProductPurchase() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the ID of the product you'd like to purchase from the list above.",
            name: "productId"
        },
        {
            type: "input",
            message: "Please enter the quantity.",
            name: "quantity"
        }
        
    ]).then(function(inquirerResponse) {
        console.log(inquirerResponse);
    })
};

inquireProductPurchase();