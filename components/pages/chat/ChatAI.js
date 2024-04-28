import { React } from "react";
import Image from "next/image";
import classes from "./ChatAI.module.css";
import { useState, useRef, useEffect } from "react";
import TypingIndicator from "@/components/TypingIndicator";
import Layout from "@/components/Layout";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import SideBar from "@/components/SideBar";
import Credits from "@/components/Credits";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
//import { MainContainer, ChatContainer, Message, MessageList, TypingIndicator, MessageInput } from "@chatscope/chat-ui-kit-react";
export default function Chat() {
    const { data: session } = useSession();
    const signedIn = session?.user;
    const user_id = session?.user?.id;
    const router = useRouter();
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");
    const [storedSession, setStoredSession] = useState(null);
    const chatBodyRef = useRef(null);
    const [messages, setMessages] = useState([
        {
            isUser: false,
            content: "Hello, I'm dAIgnosis, your personal healthcare professional. Let me know any health-related difficulty and I will do a quick check on you :)"
        }
    ]);
    useEffect(() => {
        if (session) {
            localStorage.setItem("session", JSON.stringify(session.user));
        }else {
            localStorage.removeItem("session");
        }
    }, []);


    // Retrieve session data from localStorage on initial load
    useEffect(() => {
        const storedSessionData = localStorage.getItem("session");
        if (session) {
            if(storedSessionData){
                try {
                    const parsedSession = JSON.parse(storedSessionData);
                    console.log(parsedSession);
                    setStoredSession(parsedSession);
                    console.log(storedSession);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }, []);

    // Retrieve messages from localStorage on initial load
    useEffect(() => {
        if (signedIn) {
            fetchMessages();
        } 
        else {
            setMessages([ {
                isUser: false,
                content: "Hello, I'm dAIgnosis, your personal healthcare professional. Let me know any health-related difficulty and I will do a quick check on you :)"
            }]);
        }
    }, [signedIn]);
    useEffect(() => {
        if (session) {
            localStorage.setItem("messages", JSON.stringify(messages));
        } else {
            localStorage.removeItem("messages");
        }
    }, [session, messages]);

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
      }, [messages]);


    //session handling

 




    const fetchMessages = async () => {
        if (signedIn) {
            try {
                const response = await fetch(`/api/get_messages?user_id=${user_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    const { messages } = data;
    
                    // Modify the structure of messages
                    const formattedMessages = messages.map((message) => ({
                        isUser: message.isUser,
                        content: message.content // Assuming your backend sends the message text under 'text'
                    }));
    
                    setMessages(formattedMessages);
                    localStorage.setItem("messages", JSON.stringify(formattedMessages));
                } else {
                    console.error("Failed to fetch messages..");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };
    
    

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const ref = useRef(null);
    const handleKeyUp = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            ref.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
        }
    }
    /*const handleSendMessage = async (message) => {
        const userMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }
        const newUserMessages = [...messages, userMessage];
        setMessages(newUserMessages);
        setTyping(true);
        await sendMessageTodAIgnosis();
    }*/
    const sendMessageTodAIgnosis = async () => {
        if (input.trim() === "") return;
    
        const newUserMessage = { isUser: true, content: input.trim() };
        setMessages((prevMessages) => [...prevMessages, newUserMessage])
        setInput("");
        setTyping(true);
    
        try {
            const response = await fetch("http://localhost:3007", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: input, isUser: true })
            });
    
            const responseData = await response.json();
            const dAIgnosis_Message = responseData.message || "Sorry, I couldn't understand your message, please retry.. ._.";
            const newMessage = { isUser: false, content: dAIgnosis_Message };
    
            // Update the messages array with the new message
            setMessages(prevMessages => [...prevMessages, newMessage]);
    
            // Post the AI message to the database only if the user is authenticated
            if (session) {
                const user_messages = await fetch("/api/messages/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ content: input, receiver: session?.user?.id, isUser: true })
                });
    
                if (user_messages.ok) {
                    const data_user_messages = await user_messages.json();
                    console.log("SUCCESS ", user_messages, " ", data_user_messages);
                } else {
                    console.error("ERR!");
                }
    
                // Post the AI message to the database
                const message_to_DB = await fetch("/api/messages/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: dAIgnosis_Message,
                        receiver: session?.user?.id,
                        isUser: false
                    })
                });
    
                if (!message_to_DB.ok) {
                    throw new Error("Failed to send message...");
                }
            } else {
                console.log("No session found - resorting to default storage..");
            }
    
            setTyping(false);
        } catch (err) {
            console.error(err);
        }
    };
    
    
    return (
        <div className={classes.main}>
            <SideBar />
            <div className={classes.chat_container}>
                {/*<div style={{ position: "relative", height: "800px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Send Message..." onSend={sendMessageTodAIgnosis} />
                    </ChatContainer>
                </MainContainer>
                        </div>*/}
{!messages.length && <Spinner />}


                        {/*ONLY FOR LOGGED IN USERS */}
                <div className={classes.chat_header}>
                    <div className={classes.innerHeaderContent}>
                        <h2 className={classes.heading}>dAIgnosis - ChatBot</h2>
                        <span className={classes.desc}>Chat with our knowledgeable AI - Assistant in real-time</span>
                    </div>
                </div>
                    <div className={classes.chat_body} id="chat_body" ref={chatBodyRef}>
    {messages.map((message, index) => (
        <div key={index} className={`${message.isUser ? classes.user_message : classes.ai_message}`}>
            <div className={classes.message_user_identification}>
                <p>
                    {" "}
                    <span>&#x1F7E2;</span>
                    {message.isUser ? " user" : " dAIgnosis"}
                </p>
            </div>
            <div className={classes.typingAnimation}>
                <p>
                    {message.content && message.content.split(" ").map((char, charIndex) => (
                        <span key={charIndex} style={{ animationDelay: charIndex * 0.1 + "s" }}>{char} <span></span></span>
                    ))}
                </p>
            </div>
        </div>
    ))}
</div>





                <form className={classes.chat_input} onSubmit={ sendMessageTodAIgnosis} ref={ref}>

                    {typing && <TypingIndicator />}
                    <textarea className={classes.txt} type="text" placeholder="Send message..." value={input} onKeyUp={(e) => handleKeyUp(e)} onChange={(e) => setInput(e.target.value)} >

                    </textarea>
                    <button className={classes.btn} type="submit">
                        <svg width={45} height={45} fill="none" style={{ position: "relative", left: "100px" }}
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a58585" className={classes.sendMsg}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>

                    </button>

                </form>
            </div >
            <Credits />
        </div>
    )
        ;
    /*
    //prompt engineering
    const systemMessage = {
        role: "system",
        content: "First of all, always introduce yourself as 'dAIgnosis - Assistant' who is willing to help others and keep the conversation nice and enthusiastic. Give a full diagnosis on symptoms provided by the user and also give tips on how to avoid those symptoms to recover quickly. Don't overexaggerate though.",

    }
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });


        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);

            });
    }

    return (
        <div className="App">
            <div style={{ position: "relative", height: "800px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                console.log(message)
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )*/
}