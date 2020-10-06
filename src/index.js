const { IncomingMessage } = require("http");
const { setInterval } = require("timers");

function renderHome() {
    setInterval(() => updateChat(), 1000);
}

function updateChat() {
    fetchChat().then(IncomingMessage => {
        var chatbox = IncomingMessage.map(message => {
            return `
            <div>
            <h3>${message.name}</h3>
            <p>${message.text}</p>
            </div>
            `;
        }).join("");

        let chatFieldNode = document.getElementById("chatField");
        chatFieldNode.innerHTML = chatbox;
    })}

function fetchChat() {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            return fetch("https://react-workshop-chat.herokuapp.com/chat", requestOptions)
                .then(response => response.json());
        }

function postMessage() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let name = document.getElementById("name").value
    let message = document.getElementById("message").value
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({"name":name,"text":message}),
      redirect: 'follow'
    };
    console.log(name)
    console.log(message)
    console.log("message")
    
    return fetch("https://react-workshop-chat.herokuapp.com/chat", requestOptions)


}

let buttonNode = document.getElementById("sendMessageButton");
buttonNode.addEventListener('click', (event) => {
    event.preventDefault();
     postMessage().catch(error => console.log(error.message))
})


renderHome();
