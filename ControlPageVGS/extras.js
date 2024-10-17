// WEBSOCKETS
let ws = new WebSocket('wss://test-server-app.herokuapp.com:443');

// REBOOT, SHUTDOWN, AND POWER CYCLE FUNCTIONS
let rebootButton = document.getElementById('reboot_admin');
rebootButton.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_reboot_admin": "1"}));
});

let shutdownButton = document.getElementById('shutdown_admin');
shutdownButton.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_shutdown_admin": "1"}));
});

let powerCycleButton = document.getElementById('powercycle_admin');
powerCycleButton.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_powercycle_admin": "1"}));
});

let lightMode1 = document.getElementById('mode_1');
lightMode1.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_Lights": "1"}));
})

let lightMode2 = document.getElementById('mode_2');
lightMode2.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_Lights": "2"}));
})


let lightMode3 = document.getElementById('mode_3');
lightMode3.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_Lights": "3"}));
})

let lightMode4 = document.getElementById('mode_4');
lightMode4.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_Lights": "4"}));
})

let lightMode5 = document.getElementById('mode_5');
lightMode5.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_Lights": "5"}));
})

let lightMode6 = document.getElementById('mode_6');
lightMode6.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_Lights": "6"}));
})

let lightMode7 = document.getElementById('mode_7');
lightMode7.addEventListener('click', () => {
    ws.send(JSON.stringify({"VGS_Lights": "7"}));
})



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
        if (data.hasOwnProperty('VGS_PC10_is_on')) {
            const adminStatus = document.getElementById('admin_status');
            adminStatus.value = data.VGS_PC10_is_on === null || data.VGS_PC10_is_on === undefined ? 0 : data.VGS_PC10_is_on;
        }
        if (data.hasOwnProperty('VGS_PC11_is_on')) {
            const entranceStatus = document.getElementById('entrance_status');
            entranceStatus.value = data.VGS_PC11_is_on === null || data.VGS_PC11_is_on === undefined ? 0 : data.VGS_PC11_is_on;
        }

        if (data.hasOwnProperty('VGS_Light_State')) {
            const lightStatus = document.getElementById('lighting_state');
            lightStatus.value = data.VGS_Light_State;
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

ping_admin.addEventListener('click', (event) => {
    document.getElementById('admin_status').value = "0";
})

ping_entrance.addEventListener('click', (event) => {
    document.getElementById('entrance_status').value = "0";
})

ping_accessories.addEventListener('click', (event) => {
    document.getElementById('accessories_status').value = "0";
})