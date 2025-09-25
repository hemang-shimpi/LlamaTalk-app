import React, {useState} from 'react';

const Chat = () => {
    // array of messages
    const [messages, setMessages] = useState([]);

    // current input in the text box
    const [input, setInput] = useState('');

    // message sending function
    const sendMessage = async() => {
        // preventing form submission reload
        if (!input) return; // ignoring empty input here

        // adding user's message to chat
        setMessages(prev => [...prev, {sender: 'user', text: input}]);

        // sample response
        const botResponse = `${input}`;

        // adding bot's response to chat
        setMessages(prev => [...prev, {sender: 'bot', text: botResponse}]);

        // clearing input box here
        setInput('');
    };
    return (
        <div style={{maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif'}}>
            <div style={{border: '1px solid gray', padding: '10px', height: '300px', overflowY: 'scroll'}}>
                {messages.map((msg, idx) => (
                    <p key={idx}>
                        <b>{msg.sender==='user' ? 'You' : 'AI'}:</b> {msg.text}
                    </p>
                ))}
            </div>

            <div style={{display: 'flex', marginTop: '10px'}}>
                <input
                    style={{flex: 1, padding: '5px'}}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder='Type your message...'/>
                    <button style={{marginLeft: '5px'}} onClick={sendMessage}>Send</button>
                
            </div>

        </div>
    );


};

export default Chat;