/*
 * Import packages
 */
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);
const config = require('./config.json');
console.log("Restaurant loaded:", config.restaurantName);

server.listen(5000, function ()
{
    console.log("server started at port 5000");
});

app.use(express.static('public'));

io.on("connection", (socket) =>
{
    console.log(`connect ${socket.id}`);

    let currentStep = 0;
    let order = {};
    let failCount = 0;

    socket.on("disconnect", (reason) =>
    {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on("question", (data) =>
    {
        console.log("recieved question: " + data)
        const text = data.toLowerCase();
        const step = config.steps[currentStep];
        let matched = null;

        for (const option of step.options)
        {
            for (const keyword of option.keywords)
            {
                if (text.includes(keyword.toLowerCase()))
                {
                    matched = option.name;
                }
            }
        }

        if (matched !== null)
        {
            order[step.slot] = matched;
            failCount = 0; // Reset fail count on successful match
            console.log("order so far: ", order);
            currentStep = currentStep + 1;

            if (currentStep < config.steps.length)
            {
                const answer = config.steps[currentStep].question;
                socket.emit("answer", answer);
            }
            else
            {
                let summary = "Order placed! Here is your order:\n";
                for (const slot in order)
                {
                    summary = summary + slot + ": " + order[slot] + "\n";
                }
                socket.emit("answer", summary);
                currentStep = 0;
                order = {};
            }
        }
        else
        {
            failCount = failCount + 1;
            if (failCount >= 3)
            {
                currentStep = 0;
                order = {};
                failCount = 0;
                socket.emit("answer", "I'm having trouble understanding you. Let's start over! " + config.steps[0].question);
            }
            else
            {
                socket.emit("answer", "Sorry, I didn't understand that. Please choose one of the options: " + step.options.map(o => o.name).join(", "));
            }
        }
    });
});
