async function loadClients() {
    const res = await fetch("/clients");
    const clients = await res.json();

    const table = document.getElementById("clientTable");
    table.innerHTML = "";

    clients.forEach(c => {
        const row = `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.phone || ""}</td>
                <td>${c.created_at}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}


document.getElementById("clientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const client = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    const res = await fetch("/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client)
    });

    if (res.ok) {
        alert("Cliente registrado correctamente");
        e.target.reset();
        loadClients();
    } else {
        const error = await res.json();
        alert("Error: " + error.error);
    }
});

loadClients();
