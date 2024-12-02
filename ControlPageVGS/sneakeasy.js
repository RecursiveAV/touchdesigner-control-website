// WEBSOCKETS
let ws = new WebSocket('wss://test-server-app.herokuapp.com:443');

// REBOOT, SHUTDOWN, AND POWER CYCLE FUNCTIONS
let rebootButton = document.getElementById('reboot_sneakeasy');
rebootButton.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_reboot_sneakeasy": "1"}));
});

let shutdownButton = document.getElementById('shutdown_sneakeasy');
shutdownButton.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_shutdown_sneakeasy": "1"}));
});

let powerCycleButton = document.getElementById('powercycle_sneakeasy');
powerCycleButton.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_powercycle_sneakeasy": "1"}));
});

let reset_door = document.getElementById('reset_door_sneakeasy');
reset_door.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_reset_sneakeasy": "1"}));
});

// WEBSOCKET OPEN/CLOSE/ERROR HANDLING
ws.addEventListener('open', (event) => {
    console.log('Socket connection open');
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
        
        // WRITE SNEAKEASY STATUS
        if (data.hasOwnProperty('VGS_PC9_is_on')) {
            const sneakeasyStatus = document.getElementById('sneakeasy_status');
            sneakeasyStatus.value = data.VGS_PC9_is_on === null || data.VGS_PC9_is_on === undefined ? 0 : data.VGS_PC9_is_on;
        }
    }
});

ws.addEventListener('error', (error) => {
    console.error('Error in the connection', error);
    alert('Error connecting to socket server');
});

ws.addEventListener('close', (event) => {
    console.log('Socket connection closed');
    alert('Socket server closed');
});

ping_sneakeasy.addEventListener('click', (event) => {
    document.getElementById('sneakeasy_status').value = "0";
})