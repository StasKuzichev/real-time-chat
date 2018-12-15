const socketioCDN = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"
let script = document.createElement('script');
script.type = 'text/javascript';
script.src = socketioCDN;
document.head.appendChild(script);



const socket = io ( 'http://localhost:8080' );
socket.emit('message', 'Hello!');