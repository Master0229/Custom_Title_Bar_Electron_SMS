var express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')
const robot = require("robotjs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(cors());
// const fs = require('fs');

// fs.readdir(__dirname, (err, files) => {
//     console.log(__dirname)
//     files.forEach(file => {
//         console.log(file);
//     });
// });

// fs.readdir(path.join(__dirname, '../'), (err, files) => {
//     console.log(path.join(__dirname, '../'))
//     files.forEach(file => {
//         console.log(file);
//     });
// });

// fs.readdir(path.join(__dirname, '../node_modules/'), (err, files) => {
//     console.log(path.join(__dirname, '../'))
//     files.forEach(file => {
//         console.log(file);
//     });
// });

// fs.readdir(path.join(__dirname, '../../'), (err, files) => {
//     console.log(path.join(__dirname, '../../'))
//     files.forEach(file => {
//         console.log(file);
//     });
// });

// fs.readdir(path.join(__dirname, '../../../'), (err, files) => {
//     console.log(path.join(__dirname, '../../../'))
//     files.forEach(file => {
//         console.log(file);
//     });
// });

// const webview = require("webview");
// // webview.binaryPath = "E:\\Work\\eXPERIMENT\\auto\\node_modules\\webview\\bin\\windows-amd64\\launcher.exe"
// const child = webview.spawn({
//   // options for webview
//   title: "SMS",
//   width: 1024,
//   height: 768,
//   url: "https://screen-share-2k21-p2p.herokuapp.com",

//   // options for child_process.spawn
//   cwd: process.cwd(),
// });
// Speed up the mouse.
// robot.setMouseDelay(2);

// var url = 'https://screen-share-2k21-p2p.herokuapp.com';
// var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
// require('child_process').exec(start + ' ' + url);

const io = require("socket.io-client");

const socket = io("https://screen-share-2k21-p2p.herokuapp.com/", {
    reconnectionDelayMax: 1000,
    query: {
        "my-key": "my-value"
    }
});
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("mousemove", (data) => {
    console.log(data); // x8WIv7-mJelg7on_ALbx
    robot.moveMouse(data.x, data.y)
});

socket.on("mousedown", (data) => {
    console.log(data)
    robot.mouseToggle("down", "left")
})

socket.on("mouseup", (data) => {
    console.log(data)
    robot.mouseToggle("up", "left")
})

// socket.on("onwheel", (data) => {
//     console.log(data)
//     try {
//         robot.scrollMouse(data.x, data.y);
//     } catch (err) {
//         console.log(err)
//     }
// })

socket.on("keypress", (data) => {
    try {
        robot.keyTap(data.key, data.modifiers)
    } catch (err) {
        console.log(err); // x8WIv7-mJelg7on_ALbx
        console.log("keypress", data); // x8WIv7-mJelg7on_ALbx
    }
    console.log("keypress", data); // x8WIv7-mJelg7on_ALbx
});

socket.on("keydown", (data) => {
    try {
        robot.keyToggle(data.key, 'down', data.modifiers)
    } catch (err) {
        console.log(err); // x8WIv7-mJelg7on_ALbx
        console.log("keydown", data); // x8WIv7-mJelg7on_ALbx
    }
    console.log("keydown", data); // x8WIv7-mJelg7on_ALbx
});

socket.on("keyup", (data) => {
    try {
        robot.keyToggle(data.key, 'up', data.modifiers)
    } catch (err) {
        console.log(err); // x8WIv7-mJelg7on_ALbx
        console.log("keyup", data); // x8WIv7-mJelg7on_ALbx
    }
    console.log("keyup", data); // x8WIv7-mJelg7on_ALbx
});

socket.on("click", (data) => {
    console.log(data); // x8WIv7-mJelg7on_ALbx
    robot.mouseClick(data.btn, data.dblcl)
});

socket.on("disconnect", () => {
    console.log("disconnected"); // undefined
});

socket.on("connect_error", (error) => {
    console.log("error", error); // undefined
});

// const server = app.listen(2357, function () {
//     const host = server.address().address
//     const port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
//     app.emit('appstarted', server.address())
// });
