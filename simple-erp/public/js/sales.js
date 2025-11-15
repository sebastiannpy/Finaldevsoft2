console.log("sales.js cargado correctamente");

async function loadClients() {
    const res = await fetch("/clients");
    const clients = await res.json();

    const select = document.getElementById("client_id");
    select.innerHTML = "<option value=''>Seleccione un cliente</option>";

    clients.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = c.name;
        select.appendChild(option);
    });
}

let productosCache = []; 

async function loadProducts() {
    const res = await fetch("/products");
    const products = await res.json();

    productosCache = products;
    const select = document.getElementById("product_id");
    select.innerHTML = "<option value=''>Seleccione un producto</option>";

    products.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = `${p.name} - $${p.price}`;
        select.appendChild(option);
    });
}


document.getElementById("quantity").addEventListener("input", calculateTotal);
document.getElementById("product_id").addEventListener("change", calculateTotal);

function calculateTotal() {
    const productId = document.getElementById("product_id").value;
    const quantity = parseInt(document.getElementById("quantity").value) || 0;

    if (!productId || quantity <= 0) {
        document.getElementById("total").value = "";
        return;
    }

    const producto = productosCache.find(p => p._id === productId);
    if (producto) {
        document.getElementById("total").value = producto.price * quantity;
    }
}

document.getElementById("salesForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const saleData = {
    client_id: Number(document.getElementById("client_id").value),
    product_id: Number(document.getElementById("product_id").value),
    quantity: Number(document.getElementById("quantity").value)
};


    const res = await fetch("/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData)
    });

    if (res.ok) {
        alert("Venta registrada exitosamente");
        loadSales();
    } else {
        alert("Error al registrar la venta");
    }
});


async function loadSales() {
    const res = await fetch("/sales");
    const sales = await res.json();

    const table = document.getElementById("salesTable");
    table.innerHTML = "";

    sales.forEach(s => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${s._id}</td>
            <td>${s.client_id?.name || "No disponible"}</td>
            <td>${s.product_id?.name || "No disponible"}</td>
            <td>${s.quantity}</td>
            <td>${s.total}</td>
        `;

        table.appendChild(tr);
    });
}

loadClients();
loadProducts();
loadSales();
