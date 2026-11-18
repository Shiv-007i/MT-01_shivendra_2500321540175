
let editId = null;

function showProducts() {

    fetch("/products")
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(p => {
            rows += `
                <li>
                    ID: ${p.id} <br>
                    Name: ${p.name} <br>
                    Category: ${p.category} <br>
                    Price: ${p.price} <br>

                    <button onclick="editProduct(${p.id})">Edit</button>

                    <button onclick="deleteProduct(${p.id})">Delete</button>
                    <br><br>
                </li>
            `;
        });

        document.getElementById("list").innerHTML = rows;
    });
}

function saveProduct() {

    let product = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        price: Number(document.getElementById("price").value)
    };

    let url = editId ? "/products/" + editId : "/products";
    let method = editId ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        editId = null;
        showProducts();
    });
}

function editProduct(id) {

    fetch("/products")
    .then(res => res.json())
    .then(data => {

        let p = data.find(p => p.id == id);

        document.getElementById("name").value = p.name;
        document.getElementById("category").value = p.category;
        document.getElementById("price").value = p.price;

        editId = id;
    });
}

function deleteProduct(id) {

    fetch("/products/" + id, {
        method: "DELETE"
    })
    .then(() => showProducts());
}

showProducts();
