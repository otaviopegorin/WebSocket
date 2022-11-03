const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client connected!");
  ws.send("Welcome new client");

  ws.on("message", function message(data) {
    console.log("received: %s", data);

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
  });

});

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () => console.log("Listening on port:3000"));
