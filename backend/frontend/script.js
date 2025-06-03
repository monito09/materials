// Cargar materiales al iniciar
document.addEventListener("DOMContentLoaded", loadMaterials);

// Función para agregar un material
async function addMaterial() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (title && description) {
        const material = { title, description };
        
        // Enviar datos al backend (POST)
        await fetch("/materials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(material)
        });

        // Limpiar formulario
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        // Recargar lista de materiales
        loadMaterials();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Función para cargar y mostrar materiales
async function loadMaterials() {
    // Obtener datos del backend (GET)
    const response = await fetch("/materials");
    const materials = await response.json();

    const materialsList = document.getElementById("materials");
    materialsList.innerHTML = ""; // Limpiar lista

    materials.forEach(material => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${material.title}</strong>: ${material.description}`;
        materialsList.appendChild(li);
    });
}