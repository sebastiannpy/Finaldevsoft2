async function loadProducts() {
    const res = await fetch("/products");
    const products = await res.json();

    const table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach(p => {
        const row = `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.description || ""}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value)
    };

    const res = await fetch("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    if (res.ok) {
        alert("Producto registrado correctamente");
        e.target.reset();
        loadProducts();
    } else {
        const error = await res.json();
        alert("Error: " + error.error);
    }
});


loadProducts();
