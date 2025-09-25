import React, {useState} from 'react';
import axios from 'axios';

const Chat = () => {
    // array of messages
    const [messages, setMessages] = useState([]);

    // current input in the text box
    const [input, setInput] = useState('');

    // loading state
    const[loading, setLoading] = useState(false);

    // message sending function
    const sendMessage = async() => {
        // preventing form submission reload
        if (!input) return; // ignoring empty input here

        // adding user's message to chat
        setMessages(prev => [...prev, {sender: 'user', text: input}]);

        // try catch for message send error handling
        try {
            const response = await axios.post('/api/chat', {message: input});

            setMessages(prev => [...prev, {sender: 'ai', text: response.data.reply}])
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, {sender: 'ai', text: 'Error: Could not reach the server.'}]);
        }

        setInput(''); // clearing input box
        setLoading(false);
    };
    return (
        <div style={{maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif'}}>
            <div style={{border: '1px solid gray', padding: '10px', height: '300px', overflowY: 'scroll'}}>
                {messages.map((msg, idx) => (
                    <p key={idx}>
                        <b>{msg.sender==='user' ? 'You' : 'AI'}:</b> {msg.text}
                    </p>
                ))}
                {loading && <p><i>AI is typing...</i></p>}
            </div>
            <form onSubmit={sendMessage} style={{display: 'flex', marginTop: '10px'}}>
                <input
                    style={{flex: 1, padding: '5px'}}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder='Type your message...'/>
                    <button style={{marginLeft: '5px'}} onClick={sendMessage}>Send</button>    
            </form>
           
        </div>
    );


};

export default Chat;