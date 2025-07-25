import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { Socket } from 'socket.io-client';

const Chat = () => {
    const connections = useSelector((store) => store.connections);
    const user = useSelector((store) => store.user);
    const [userName, setUserName] = useState('');
    const [userPhotoUrl, setUserPhotoUrl] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let userId = user?._id;
    let targetUserId = useParams()?.targetUserId;
    const colors = [
        "chat-bubble-primary",
        "chat-bubble-secondary",
        "chat-bubble-accent",
        "chat-bubble-info",
        "chat-bubble-success",
        "chat-bubble-warning",
        "chat-bubble-error"
    ];

    const getColorForUser = (userId) => {
        const index = userId.charCodeAt(0) % colors.length;
        return colors[index];
    };

    useEffect(() => {
        
        
        if (!userId || !targetUserId) return;

        const Socket = createSocketConnection();
        Socket.emit("join", {
            userId,
            targetUserId
        });

        Socket.on("messageReceived", (data) => {
            setMessages((messages) => [...messages, {
                data, color: getColorForUser(data.senderId)
            }]);
        })

        return () => {   //disconnect on unmount
            Socket.disconnect();
        }
    }, [userId, targetUserId]);


    const fetchCurrentUserData = async () => {
        try {           
            const userData = connections.find(connection => connection.data._id === targetUserId);

            setUserName(userData.data.firstName + " " + userData.data.lastName);
            setUserPhotoUrl(userData.data.photourl);

        } catch (error) {
            console.error(error);
        }
    }

    const handleSend = () => {
        const Socket = createSocketConnection();
        Socket.emit("sendMessage", {
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessage('');
    }

    useEffect(() => {
        if (connections.length) {
            fetchCurrentUserData();
        }
    }, [targetUserId, connections]);

    return (
        <div className="items-center my-10 flex">
            <ul className="list bg-base-300 rounded-box shadow-md min-w-2xl max-w-4xl m-auto p-8">
                <li className="flex flex-col gap-2">
                    <div className='flex  flex-row gap-4 max-w-8xl items-center'>
                        <div className="avatar">
                            <div className="w-14 rounded-full">
                                {userPhotoUrl && (
                                    <img className="size-10 rounded-box" src={userPhotoUrl} alt="User" />
                                )}

                            </div>
                        </div>
                        <h1 className="font-bold text-xl">{userName}</h1>
                    </div>
                    <div
                        className='h-100 overflow-y-scroll hide-scrollbar'
                        style={{ backgroundImage: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb_9Hh9lA99ULreznlxJE1MWmjwg_qZgTzBg&s"})` }}>

                        {messages &&
                            messages.map((message,index) => {
                                const tempClass = message.data.senderId === userId ? "chat-end" : "chat-start";
                                                                
                                return (
                                    <div key={index} className={`chat ${tempClass}`}>
                                        <div className={`chat-bubble ${message.color}`}>
                                            {message.data.text}
                                        </div>
                                    </div>
                                );
                        })}
                    </div>
                    <div className="flex gap-2 mt-1">
                        <input
                            type="text"
                            placeholder="Type here..."
                            className="input input-accent w-full rounded-xl"
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                        <button
                            onClick={handleSend}
                            className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 text-black">
                            Send
                        </button>
                    </div>

                </li>
            </ul>
        </div>
    )
}

export default Chat;