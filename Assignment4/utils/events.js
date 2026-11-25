import EventEmitter from "events";

const eventEmitter = new EventEmitter();

// User registration event
eventEmitter.on("userRegistered", (username) => {
    console.log(`New user registered: ${username}`);
});

// User login event
eventEmitter.on("userLogin", (username) => {
    console.log(`User logged in: ${username}`);
});

// Chat message event
eventEmitter.on("chatMessage", (username, message) => {
    console.log(`[Chat] ${username}: ${message}`);
});

export default eventEmitter;