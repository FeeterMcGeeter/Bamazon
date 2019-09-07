// ===== REQUIRED DEPENDENCIES =====
var mysql = require("mysql");
var inquirer = require("inquirer");

// ===== SQL CONNECTION =====
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

// ===== CONNECTING TO SERVER =====
connection.connect(function (err) {
    if (err) throw err;
});

// ===== FUNCTION TO SHOW THE AVAILABLE PRODUCTS =====
function showProducts() {
    // ===== QUERYING THE MYSQL DATABASE =====
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);

        // ===== INQUIRING THE USER ABOUT BUYING PRODUCTS =====
        inquirer.prompt([
            {
                name: "productID",
                type: "input",
                message: "Please enter the product ID.",
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity.",
            }
        ]).then(function (data) {
            var productChosen = data.productID;
            var quantityChosen = data.quantity;
            purchaseProduct(productChosen, quantityChosen);
        })
    });
};

// ===== FUNCTION TO PLACE THE ORDER =====
function purchaseProduct(product, quantityRequested) {
    connection.query("SELECT * FROM products WHERE id = " + product, function (err, res) {
        if (err) throw err;

        if (quantityRequested <= res[0].stock_quantity) {
            var totalAmount = res[0].price * quantityRequested;

            console.log("Your total is: $" + totalAmount);

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantityRequested + " WHERE id = " + product);

            // ===== ASKS THE USER IF THEY WISH TO CONTINUE SHOPPING =====
            inquirer.prompt([
                {
                    name: "continue",
                    message: "Continue shopping?",
                    choices: ["yes", "no"]
                }
            ]).then(function (response) {
                console.log(response);
                if (response.continue == "yes") {
                    showProducts();
                } else {
                    console.log('Thank You for your purchase!')
                    return
                }
            })
        } else {
            console.log("Sorry.. We do not have enough in our inventory to complete your order.");
        };
    });
};

showProducts();