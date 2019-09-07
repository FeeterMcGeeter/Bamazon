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

function managerTasks() {
    inquirer.prompt([
        {
            name: "tasks",
            type: "list",
            message: "To Do list for today",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (response) {
        switch (response.tasks) {
            case "View Products for Sale":
                displayProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        };
    });
};

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        managerTasks();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5 ", function (err, res) {
        if (err) throw err;

        console.table(res);
        managerTasks();
    });
};

function addToInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var products = [];
        for (var i = 0; i < res.length; i++) {
            products.push(res[i].product_name);
        };

        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: "Choose a product to restock",
                choices: products
            },
            {
                name: "restockAmount",
                type: "input",
                message: "Restock amount?"
            }
        ]).then(function(response) {
            var restockQuantity;
            for (var j = 0; j < res.length; j++) {
                if (res[j].product_name === response.product) {
                    restockQuantity = res[j].stock_quantity;
                }
            };

            connection.query("UPDATE products SET ? WHERE ? ", [{stock_quantity: restockQuantity + parseInt(response.restockAmount)}, {product_name: response.product}], function(err, res) {
                if (err) throw err;

                console.log("Inventory for " + response.product + " has been updated to " + (restockQuantity + parseInt(response.restockAmount)));
                managerTasks();
            })
        })
    });
};

function addNewProduct() {
    var department = [];

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            department.push(res[i].department_name);
        };
    });

    inquirer.prompt([
        {
            name: "addProduct",
            type: "input",
            message: "Product Name to be added?"
        },
        {
            name: "addDepartment",
            type: "input",
            message: "Department new product belongs to?"
        },
        {
            name: "addPrice",
            type: "input",
            message: "Price of new product?"
        },
        {
            name: "addQuantity",
            type: "input",
            message: "Quantity of product?"
        }
    ]).then(function(newItem) {
        connection.query("INSERT INTO products SET ?", {product_name: newItem.addProduct, department_name: newItem.addDepartment, price: newItem.addPrice, stock_quantity: newItem.addQuantity}, function(err, res) {
            if (err) throw err;

            console.log("You have successfully added the new product!");
            managerTasks();
        })
    })
};

managerTasks();
