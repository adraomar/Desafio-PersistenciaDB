console.log("Home view cargada correctamente!");

const socketClient = io();

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    };

    socketClient.emit("newProduct", product);
})

const productsContainer = document.getElementById("productsContainer");

socketClient.on("productsAll", async (data) => {
    const tableTemplate = await fetch("./templates/table.handlebars");
    const tableFormat = await tableTemplate.text();
    const template = Handlebars.compile(tableFormat);
    const html = template({products: data});
    productsContainer.innerHTML = html;
})

const chatSystem = document.getElementById("chatSystem");
socketClient.on("srvMessage", (data) => {
    let messages = "";
    data.forEach(element => {
        messages += `<div class="card">
        <div class="card-header d-flex justify-content-between p-3">
        <p>
            <span style="color: blue">${element.user}</span> - <span style="color: brown">[${element.timestamp}]</span>
        </p>    
        </div>
        <div class="card-body">
            <p class="card-text">${element.message}</p>
        </div>
    </div>`;
    });

    chatContainer.innerHTML = messages;
})

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let hoy = new Date();
    let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fechaYHora = fecha + ' ' + hora;

    const message = {
        user:document.getElementById("correo").value,
        timestamp:fechaYHora,
        message:document.getElementById("messageChat").value
    }
    //enviar nuevo mensaje
    socketClient.emit("newMessage", message);
    document.getElementById("messageChat").value = "";
})

