import React, { useEffect, useState } from "react";
import Avatar from "../../assets/profile.webp";
import Input from "../../components/Input";
import { io } from "socket.io-client";

const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [users, setUsers] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  console.log(messages, "yeh messages");
  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    if (!socket) return; // Exit if socket is not initialized

    socket.emit("addUser", user?.id);

    socket.on("getUsers", (users) => {
      console.log("Active users:", users);
    });

    socket.on("getMessage", (data) => {
      console.log("New message received:", data);
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...(prev?.messages || []),
          { user: data.user, message: data.message },
        ],
      }));
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("getUsers");
      socket.off("getMessage");
    };
  }, [socket, user]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversation = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/conversations/${loggedInUser?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res, "res conversation");

        const resData = await res.json(); // Parse JSON response
        console.log(resData, "resData conversation");

        setConversation(resData); // Set the conversation data
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversation();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      const resData = await res.json();
      console.log("resData:->", resData);
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    console.log("resData:->", resData);
    setMessages({ messages: resData, receiver, conversationId });
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      message,
      user: { id: user?.id },
    };

    try {
      socket?.emit("sendMessage", {
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      });

      const res = await fetch(`http://localhost:8000/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: messages?.conversationId,
          senderId: user?.id,
          message,
          receiverId: messages?.receiver?.receiverId,
        }),
      });

      if (res.ok) {
        console.log("Message sent successfully");

        // Add the message only locally; socket listener handles duplicates
        setMessages((prev) => ({
          ...prev,
          messages: [...(prev?.messages || []), newMessage],
        }));

        setMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-screen flex">
      <div className="w-[25%] h-screen bg-light">
        <div className="flex items-center my-8 mx-14">
          <div className="border border-primary p-[2px] rounded-full ">
            <img src={Avatar} alt="User Avatar" width={75} height={75} />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user?.fullName}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10">
          <div className="text-primary text-lg">Message</div>

          <div>
            {conversation?.length > 0 ? (
              conversation.map(({ conversationId, user }) => {
                return (
                  <div className="flex items-center py-8 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div>
                        <img
                          src={Avatar}
                          alt="User Avatar"
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">
                          {user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No conversation
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[75%] bg-light h-[80px] my-14 rounded-full flex items-center px-14 ">
            <div className="cursor-pointer">
              <img src={Avatar} alt="User Avatar" width={60} height={60} />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg ">{messages?.receiver?.fullName}</h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 5h6" />
                <path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5" />
              </svg>
            </div>
          </div>
        )}
        <div className="h-[75%]  w-full overflow-y-scroll shadow-sm ">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <div
                    className={`max-w-[40%] rounded-b-xl p-4 mb-6 
                      ${
                        id === user?.id
                          ? "bg-primary  text-white rounded-tl-xl ml-auto"
                          : "bg-light  rounded-tr-xl "
                      }`}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Messages or no conversation selected
              </div>
            )}
          </div>
        </div>

        {messages?.receiver?.fullName && (
          <div className="p-14 w-full flex items-center">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
              inputClassName="p-4 border-0 shadow-md rounded-full 
          bg-light focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-send"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="w-[25%] h-screen bg-light px-8 py-16">
        <div className="text-primary text-lg">People</div>
        <div>
          {users?.length > 0 ? (
            users.map(({ userId, user }) => {
              return (
                <div className="flex items-center py-8 border-b border-b-gray-300">
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => fetchMessages("new", user)}
                  >
                    <div>
                      <img
                        src={Avatar}
                        alt="User Avatar"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        {user?.fullName}
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-semibold mt-24">
              No conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
