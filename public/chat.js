const socket = io();

new Vue({
    el: '#app',
    data: {
        step: 'nick',
        nick: null,
        message: {
            username: "",
            msg: "",
            date: ""
        },
        messages: []
    },
    methods: {
        send() {
            socket.emit('chat-message', {
                nick: this.nick,
                message: this.message,
                date: new Date().getTime()
            });

            this.message = null;
        },
        signIn() {
            if (!this.nick) {
                return;
            }

            this.step = 'chat';
        }
    },
    mounted() {
        socket.on('chat-message', (msg) => {
            this.messages.push(msg);

            setTimeout(() => {
                // scroll hacia abajo
                const chatContainer = document.querySelector(".chat-container");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        });
    }
});