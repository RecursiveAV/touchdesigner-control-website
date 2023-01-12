let ws = new WebSocket('wss://test-server-app.herokuapp.com');

window.onload = function () {
  ws.onopen = function () {
    ws.send(JSON.stringify({ 'page loaded': 1}));
  };
};


let controllTD = document.querySelector('.controllTD') ;
controllTD.addEventListener('input', (event) => {
  ws.send(JSON.stringify({ 'slider1': controllTD.value / 100 }));
}, false);

let controlledByTD = document.querySelector('.controlledByTD');

let form = document.getElementById("form");
form.addEventListener("submit", event => {event.preventDefault();
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const tick = form.elements.tick.value;
    const data = { name, email, tick };
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
