const { IncomingMessage } = require("http");

let mainNode = document.getElementById("main");



function renderStart() {
    fetchChat().then(IncomingMessage => {
        var chatbox = IncomingMessage.map(message => {
            return `
            <h3>${message.name}</h3>
            <p>${message.text}</p>
            `;
        }).join("");
        mainNode.innerHTML = `
    <h1>Chat Room</h1>
    <div id="chatbox">
    <form>
        <label>Name</label>
        <input id="name"> <br>
        <input id="message">
        <button id="sendMessageButton">Send</button>
    </form>
        <div id="chatField">
        </div>
    </div>
    
`;

let chatFieldNode = document.getElementById("chatField");
chatFieldNode.innerHTML = chatbox;

    })

}

function fetchChat() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch("https://react-workshop-chat.herokuapp.com/chat", requestOptions)
        .then(response => response.json());
}



renderStart();
fetchChat();