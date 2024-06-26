const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "",
    key: "",
    secret: "",
    cluster: "us2",
    useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:3001']
}))

app.use(express.json())

app.post('/api/messages', async (req, res) => {
    await pusher.trigger("my-channel", "my-event", {
        username: req.body.username,
        message: req.body.message
    });

    res.json([]);
})

console.log('listening to port 8000');
app.listen(8000)