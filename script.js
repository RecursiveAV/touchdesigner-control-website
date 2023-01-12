let ws = new WebSocket('wss://test-server-app.herokuapp.com');

window.onload = function () {
  ws.onopen = function () {
    ws.send(JSON.stringify({ 'page loaded': 1}));
  };
};

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

document.getElementById("tick").addEventListener("change", function(){
   var tick = this.checked ? "yes" : "no";
});

var uuid = getUrlParameter('UUID');
document.getElementById("UUIDinput").value = uuid;

let form = document.getElementById("form");
form.addEventListener("submit", event => {event.preventDefault();
    const name = form.elements.name.value;
    const email = form.elements.email.value;
   
    const uuid = form.elements.UUIDinput.value;
    const data = { name, email, tick, uuid };
    ws.send(JSON.stringify(data));
  });

ws.addEventListener('open', (event) => {
  console.log('Socket connection open');
  // alert('Successfully connected to socket server 🎉');
  ws.send('pong');
});

ws.addEventListener('message', (message) => {
  if (message && message.data) {
    if (message.data === "ping") {
      console.log("got ping");
      ws.send("pong");
      return;
    }
    let data = JSON.parse(message.data);
    if (data) {
      if ("slider1" in data) {
        controlledByTD.value = data["slider1"] * 100;
      }
      console.log("got data", data);
    }
  }
  console.log("message", message)
});

ws.addEventListener('error', (error) => {
    console.error('Error in the connection', error);
    alert('error connecting socket server', error);
});

ws.addEventListener('close', (event) => {
    console.log('Socket connection closed');
    alert('closing socket server');
});
