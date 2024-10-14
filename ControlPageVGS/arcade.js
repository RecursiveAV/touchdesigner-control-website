// WEBSOCKETS WOOOOO
let ws = new WebSocket('wss://test-server-app.herokuapp.com:443');


// REBOOT PC FUNCTIONS
let reboot_1 = document.getElementById('reboot_pc_1')
reboot_1.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_reboot_pc_1":"1"}))
})
let reboot_2 = document.getElementById('reboot_pc_2')
reboot_2.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_reboot_pc_2":"1"}))
})

// SHUTDOWN PC FUNCTIONS
shutdown_1 = document.getElementById('shutdown_pc_1')
shutdown_1.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_shutdown_pc_1":"1"}))
})
shutdown_2 = document.getElementById('shutdown_pc_2')
shutdown_2.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_shutdown_pc_2":"1"}))
})

// POWER CYCLE FUNCTIONS
powercycle_1 = document.getElementById('powercycle_pc_1')
powercycle_1.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_powercycle_pc_1":"1"}))
})
powercycle_2 = document.getElementById('powercycle_pc_2')
powercycle_2.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_powercycle_pc_2":"1"}))
})

// CAMERAS FUNCTIONS
let camera_1 = document.getElementById('restart_cam_1')
camera_1.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_camera_1_reset":"1"}))
})
let camera_2 = document.getElementById('restart_cam_2')
camera_2.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_camera_2_reset":"1"}))
})
let camera_3 = document.getElementById('restart_cam_3')
camera_3.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_camera_3_reset":"1"}))
})
let camera_4 = document.getElementById('restart_cam_4')
camera_4.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_camera_4_reset":"1"}))
})
let camera_5 = document.getElementById('restart_cam_5')
camera_5.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_camera_5_reset":"1"}))
})

// START-STOP GAME FUNCTIONS
let start_goal = document.getElementById('start_game_goal')
start_goal.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_start_game_goal":"1"}))
})
let start_drive = document.getElementById('start_game_drive')
start_drive.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_start_game_drive":"1"}))
})
let start_run = document.getElementById('start_game_run')
start_run.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_start_game_run":"1"}))
})
let unload_game = document.getElementById('unload_game')
unload_game.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_unload_game":"1"}))
})

// CALIBRATE GAME FUNCTIONS
let cal_floor = document.getElementById('cal_floor')
cal_floor.addEventListener('click', (event) => {
    ws.send(JSON.stringify({"VGS_cal_floor":"1"}))
})

// WebSocket message received
ws.addEventListener('message', (message) => {
    if (message && message.data) {
        if (message.data === "ping") {
            console.log("got ping");
            ws.send("pong");
            return;
        }
        let data = JSON.parse(message.data);

        // WRITE CAMERA STATUS ON RESET
        if (data.hasOwnProperty('VGS_entrance_orbbec_active')) {
            const camera_1_status = document.getElementById('camera_1_status');
            camera_1_status.value = data.VGS_entrance_orbbec_active ?? 0;
        }
        if (data.hasOwnProperty('VGS_screen_orbbec_active')) {
            const camera_2_status = document.getElementById('camera_2_status');
            camera_2_status.value = data.VGS_screen_orbbec_active ?? 0;
        }
        if (data.hasOwnProperty('VGS_down_orbbec_active')) {
            const camera_3_status = document.getElementById('camera_3_status');
            camera_3_status.value = data.VGS_down_orbbec_active ?? 0;
        }
        if (data.hasOwnProperty('VGS_side_1_active')) {
            const camera_4_status = document.getElementById('camera_4_status');
            camera_4_status.value = data.VGS_side_1_active ?? 0;
        }
        if (data.hasOwnProperty('VGS_side_2_active')) {
            const camera_5_status = document.getElementById('camera_5_status');
            camera_5_status.value = data.VGS_side_2_active ?? 0;
        }

        // WRITE CAMERA STATUS ON PING
        if (data.hasOwnProperty('VGS_entrance_orbbec_on')) {
            const camera_1_status = document.getElementById('camera_1_status');
            camera_1_status.value = data.VGS_entrance_orbbec_on ?? 0;
        }
        if (data.hasOwnProperty('VGS_screen_orbbec_on')) {
            const camera_2_status = document.getElementById('camera_2_status');
            camera_2_status.value = data.VGS_screen_orbbec_on ?? 0;
        }
        if (data.hasOwnProperty('VGS_down_orbbec_on')) {
            const camera_3_status = document.getElementById('camera_3_status');
            camera_3_status.value = data.VGS_down_orbbec_on ?? 0;
        }
        if (data.hasOwnProperty('VGS_side_1_on')) {
            const camera_4_status = document.getElementById('camera_4_status');
            camera_4_status.value = data.VGS_side_1_on ?? 0;
        }
        if (data.hasOwnProperty('VGS_side_2_on')) {
            const camera_5_status = document.getElementById('camera_5_status');
            camera_5_status.value = data.VGS_side_2_on ?? 0;
        }

        // WRITE PC STATUS
        if (data.hasOwnProperty('VGS_PC1_is_on')) {
            const pc_1_status = document.getElementById('pc_1_status');
            pc_1_status.value = data.VGS_PC1_is_on ?? 0;
        }
        if (data.hasOwnProperty('VGS_PC2_is_on')) {
            const pc_2_status = document.getElementById('pc_2_status');
            pc_2_status.value = data.VGS_PC2_is_on ?? 0;
        }

        // WRITE CURRENT ACTIVE GAME
        if (data.hasOwnProperty('VGS_goal_active')) {
            const goal_loaded = document.getElementById('goal_loaded');
            goal_loaded.value = "Loaded";
            document.getElementById('drive_loaded').value = "0";
            document.getElementById('run_loaded').value = "0";
            document.getElementById('active_game').value = "GOAL";
        }

        if (data.hasOwnProperty('VGS_drive_active')) {
            const drive_loaded = document.getElementById('drive_loaded');
            drive_loaded.value = "Loaded";
            document.getElementById('goal_loaded').value = "0";
            document.getElementById('run_loaded').value = "0";
            document.getElementById('active_game').value = "DRIVE";
        }

        if (data.hasOwnProperty('VGS_run_active')) {
            const run_loaded = document.getElementById('run_loaded');
            run_loaded.value = "Loaded";
            document.getElementById('goal_loaded').value = "0";
            document.getElementById('drive_loaded').value = "0";
            document.getElementById('active_game').value = "RUN";
        }

        if (data.hasOwnProperty('VGS_games_unloaded')) {
            const unload_game = document.getElementById('unload_game');
            unload_game.value = "0";
            document.getElementById('goal_loaded').value = "0";
            document.getElementById('drive_loaded').value = "0";
            document.getElementById('run_loaded').value = "0";
            document.getElementById('active_game').value = "None";
        }
    }
});
  
  ws.addEventListener('error', (error) => {
      console.error('Error in the connection', error);
      alert('error connecting socket server', error);
  });
  
  ws.addEventListener('close', (event) => {
      console.log('Socket connection closed');
      alert('closing socket server');
  });
  