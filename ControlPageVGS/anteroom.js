// WEBSOCKETS
let ws = new WebSocket('wss://test-server-app.herokuapp.com:443');

// REBOOT PC FUNCTIONS
const rebootButtons = [
    { id: 'reset_login_1', action: 'VGS_reboot_pc_3' },
    { id: 'reset_login_2', action: 'VGS_reboot_pc_4' },
    { id: 'reset_login_3', action: 'VGS_reboot_pc_5' },
    { id: 'reset_door_1', action: 'VGS_reboot_pc_6' },
    { id: 'reset_door_2', action: 'VGS_reboot_pc_7' },
    { id: 'reset_door_3', action: 'VGS_reboot_pc_8' },
];

rebootButtons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => {
        ws.send(JSON.stringify({ [button.action]: "1" }));
    });
});

let rebootAllLogin = document.getElementById('reboot_login');
rebootAllLogin.addEventListener('click', () => {
    ['VGS_reboot_pc_3', 'VGS_reboot_pc_4', 'VGS_reboot_pc_5'].forEach(action => {
        ws.send(JSON.stringify({ [action]: "1" }));
    });
});

let rebootAllDoors = document.getElementById('reboot_doors');
rebootAllDoors.addEventListener('click', () => {
    ['VGS_reboot_pc_6', 'VGS_reboot_pc_7', 'VGS_reboot_pc_8'].forEach(action => {
        ws.send(JSON.stringify({ [action]: "1" }));
    });
});

// SHUTDOWN PC FUNCTIONS
const shutdownButtons = [
    { id: 'shutdown_login_1', action: 'VGS_shutdown_pc_3' },
    { id: 'shutdown_login_2', action: 'VGS_shutdown_pc_4' },
    { id: 'shutdown_login_3', action: 'VGS_shutdown_pc_5' },
    { id: 'shutdown_door_1', action: 'VGS_shutdown_pc_6' },
    { id: 'shutdown_door_2', action: 'VGS_shutdown_pc_7' },
    { id: 'shutdown_door_3', action: 'VGS_shutdown_pc_8' },
];

shutdownButtons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => {
        ws.send(JSON.stringify({ [button.action]: "1" }));
    });
});

let shutdownAllLogin = document.getElementById('shutdown_login');
shutdownAllLogin.addEventListener('click', () => {
    ['VGS_shutdown_pc_3', 'VGS_shutdown_pc_4', 'VGS_shutdown_pc_5'].forEach(action => {
        ws.send(JSON.stringify({ [action]: "1" }));
    });
});

let shutdownAllDoors = document.getElementById('shutdown_doors');
shutdownAllDoors.addEventListener('click', () => {
    ['VGS_shutdown_pc_6', 'VGS_shutdown_pc_7', 'VGS_shutdown_pc_8'].forEach(action => {
        ws.send(JSON.stringify({ [action]: "1" }));
    });
});

// POWER CYCLE FUNCTIONS
const powerCycleButtons = [
    { id: 'powercycle_login_1', action: 'VGS_powercycle_pc_3' },
    { id: 'powercycle_login_2', action: 'VGS_powercycle_pc_4' },
    { id: 'powercycle_login_3', action: 'VGS_powercycle_pc_5' },
    { id: 'powercycle_door_1', action: 'VGS_powercycle_pc_6' },
    { id: 'powercycle_door_2', action: 'VGS_powercycle_pc_7' },
    { id: 'powercycle_door_3', action: 'VGS_powercycle_pc_8' },
];

powerCycleButtons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => {
        ws.send(JSON.stringify({ [button.action]: "1" }));
    });
});

let powerCycleAllLogin = document.getElementById('powercycle_login');
powerCycleAllLogin.addEventListener('click', () => {
    ['VGS_powercycle_pc_3', 'VGS_powercycle_pc_4', 'VGS_powercycle_pc_5'].forEach(action => {
        ws.send(JSON.stringify({ [action]: "1" }));
    });
});

let powerCycleAllDoors = document.getElementById('powercycle_doors');
powerCycleAllDoors.addEventListener('click', () => {
    ['VGS_powercycle_pc_6', 'VGS_powercycle_pc_7', 'VGS_powercycle_pc_8'].forEach(action => {
        ws.send(JSON.stringify({ [action]: "1" }));
    });
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

        // WRITE PC STATUS
        if (data.hasOwnProperty('VGS_PC3_is_on')) {
            const pc_3_status = document.getElementById('login_1_status');
            pc_3_status.value = data.VGS_PC3_is_on === null ? "0" : data.VGS_PC3_is_on;
        }
        if (data.hasOwnProperty('VGS_PC4_is_on')) {
            const pc_4_status = document.getElementById('login_2_status');
            pc_4_status.value = data.VGS_PC4_is_on === null ? "0" : data.VGS_PC4_is_on;
        }
        if (data.hasOwnProperty('VGS_PC5_is_on')) {
            const pc_5_status = document.getElementById('login_3_status');
            pc_5_status.value = data.VGS_PC5_is_on === null ? "0" : data.VGS_PC5_is_on;
        }
        if (data.hasOwnProperty('VGS_PC6_is_on')) {
            const pc_6_status = document.getElementById('door_1_status'); // Added for door 1
            pc_6_status.value = data.VGS_PC6_is_on === null ? "0" : data.VGS_PC6_is_on;
        }
        if (data.hasOwnProperty('VGS_PC7_is_on')) {
            const pc_7_status = document.getElementById('door_2_status'); // Added for door 2
            pc_7_status.value = data.VGS_PC7_is_on === null ? "0" : data.VGS_PC7_is_on;
        }
        if (data.hasOwnProperty('VGS_PC8_is_on')) {
            const pc_8_status = document.getElementById('door_3_status'); // Added for door 3
            pc_8_status.value = data.VGS_PC8_is_on === null ? "0" : data.VGS_PC8_is_on;
        }
    }
});

ws.addEventListener('error', (error) => {
    console.error('Error in the connection', error);
    alert('Error connecting to socket server: ' + error);
});

ws.addEventListener('close', (event) => {
    console.log('Socket connection closed');
    alert('Closing socket server');
});
