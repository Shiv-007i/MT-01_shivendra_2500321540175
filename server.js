
const express = require("express");
const http = require("http");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 1500 },
    { id: 2, name: "Chair", category: "Furniture", price: 500 },
    { id: 3, name: "Mouse", category: "Accessories", price: 300 }
];

let id = 4;


app.get("/products", (req, res) => {
    res.send(products);
});

app.post("/products", (req, res) => {

    if (products.length >= 3) {
        return res.send("Only 3 products allowed");
    }

    let product = {
        id: id++,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    };

    products.push(product);

    res.send("Product added");
});

app.put("/products/:id", (req, res) => {

    let product = products.find(p => p.id == req.params.id);

    if (!product) {
        return res.send("Product not found");
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;

    res.send("Product updated");
});

app.delete("/products/:id", (req, res) => {

    products = products.filter(p => p.id != req.params.id);

    res.send("Product deleted");
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Server running at: http://localhost:3000");
});
