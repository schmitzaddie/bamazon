var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Luckydog13!!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw (err);
    console.log("connected as id " + connection.threadId + "\n");
    productList();
});

function productList() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw (err);
        console.log("Check out all the products we carry! \n");
        
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].item_id + " | " + data[i].product_name + " | " + data[i].department_name + " | $" + data[i].price + " | In-Stock: " + data[i].stock_quantity);
        }
        console.log("");
        customerShop();
    });
};

function customerShop() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw (err);
        inquirer.prompt([
            {
                type: "input",
                name: "product",
                message: "What would you like to purchase? Please provide the ID #.",
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?"
            }
        ]).then(function (answer) {
            // console.log(answer);

            var quantity = parseInt(answer.quantity);
            var product = parseInt(answer.product);

            // console.log(quantity);
            // console.log(product);

            connection.query('SELECT * FROM products', function (err, data) {
                // console.log(data);
                if (err) throw err;

                for (var i = 0; i < data.length; i++) {
                    if (quantity <= data[i].stock_quantity && product === data[i].item_id) {

                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: (data[i].stock_quantity - quantity)
                                },
                                {
                                    item_id: data[i].item_id
                                }
                            ],
                            function (err, update) {
                                if (err) throw err;
                                console.log("Thanks for purchasing!");
                            }
                        );

                    } else if (quantity > data[i].stock_quantity && product === data[i].item_id) {
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "notEnough",
                                message: "I'm sorry - we don't have enough in stock!",
                                choices: ["Purchase a different quantity", "Purchase a different product", "Stop shopping"]
                            }
                        ]).then(function (tooLittle) {

                            if (tooLittle.notEnough === "Purchase a different quantity" || tooLittle.notEnough === "Purchase a different product") {
                                customerShop();
                            
                            } else {
                                console.log("Thanks for visiting Bamazon!");
                                connection.end();
                            }
                        });
                    }
                }
            });
        });
    });
}