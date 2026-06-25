/*
 * This file creates a very simple chat server for a restaurant ordering flow.
 * It listens for incoming customer messages and responds with the next prompt.
 */
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);
const config = require('./config.json');
console.log("Restaurant loaded:", config.restaurantName);

const PORT = process.env.PORT || 5000;
server.listen(PORT, function ()
{
    console.log("server started at port " + PORT);
});

// Serve the browser files from the public folder.
app.use(express.static('public'));

io.on("connection", (socket) =>
{
    console.log(`connect ${socket.id}`);

    // Track what question the user is on.
    let currentStep = 0;
    // Keep the user's selections .
    let order = {};
    // Count bad inputs so we can restart after too many tries.
    let failCount = 0;

    socket.on("disconnect", (reason) =>
    {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on("question", (data) =>
    {
        console.log("received question: " + data);

        // Normalize the message so keyword matching is easier.
        const text = data.toLowerCase();
        const step = config.steps[currentStep];
        let matched = null;

        // Search all answer choices for a keyword typed.
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
            // Saves the matched answer and move on to the next question.
            order[step.slot] = matched;
            failCount = 0;
            console.log("order so far: ", order);
            currentStep = currentStep + 1;

            if (currentStep < config.steps.length)
            {
                // Asking the next question from the config file.
                const answer = config.steps[currentStep].question;
                socket.emit("answer", answer);
            }
            else
            {
                // after the order is complete finalising the summary message.
                let summary = "Order placed! Here is your order:\n";
                for (const slot in order)
                {
                    summary = summary + slot + ": " + order[slot] + "\n";
                }
                socket.emit("answer", summary);

                // restarts for the next customer.
                currentStep = 0;
                order = {};
            }
        }
        else
        {
            failCount = failCount + 1;
            if (failCount >= 3)
            {
                // After a few failed attempts, clears the current order and starts over.
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
