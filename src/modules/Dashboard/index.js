import React, { useEffect, useState } from 'react';
import Avatar from '../../assets/profile.webp';
import Input from '../../components/Input';


const Dashboard = () => {



  const contacts = [
    {
      name: "johan",
      status: "Available",
      img: Avatar
    },
    {
      name: "rohan",
      status: "Available",
      img: Avatar
    },
    {
      name: "shruti",
      status: "Available",
      img: Avatar
    },
    {
      name: "afzal",
      status: "Available",
      img: Avatar
    },
    {
      name: "saurabh",
      status: "Available",
      img: Avatar
    },
  ]
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user:detail")));
  const [conversation, setConversation] = useState([]);


  console.log(user, "user");
  console.log(conversation, "user conversation");
  
  
  // useEffect(() => {
  //   const loggedInUser = JSON.parse(localStorage.getItem("user:deatil"))
  //   const fetchConversation = async () => {
  //     const res = await fetch(`http://localhost:8000/api/conversation/${loggedInUser?.id}`, {
  //       methd: "GET",
  //       header: {
  //         "Content-Type": "application/json",
  //       }, 
  //     });
  //     const resData =  await res.json();
  //     console.log(resData, "resData conversation");

  //     setConversation(resData);
  //   }
  //   fetchConversation();
  // }, [])

  useEffect(() => {
  const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));  
  const fetchConversation = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res, "res conversation");

      const resData = await res.json();
      console.log(resData, "resData conversation");

      setConversation(resData); // Set the conversation state if data is returned
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  fetchConversation();
}, []);


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
            {conversation.map(({ conversationId, user}) => {
              // console.log(conversations,"kya hai");
              return (
                <div className="flex items-center py-8 border-b border-b-gray-300">
                  <div className="cursor-pointer flex items-center">
                    <div><img src={Avatar} alt="User Avatar" width={60} height={60} /></div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">{user?.fullName}</h3>
                      <p className="text-sm font-light text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        <div className="w-[75%] bg-light h-[80px] my-14 rounded-full flex items-center px-14 ">
          <div className="cursor-pointer"><img src={Avatar} alt="User Avatar" width={60} height={60} /></div>
          <div className="ml-6 mr-auto">
            <h3 className="text-lg ">Alexa</h3>
            <p className="text-sm font-light text-gray-600">Online</p>
          </div>
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 5h6" /><path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5" /></svg>
          </div>
        </div>
        <div className="h-[75%]  w-full overflow-y-scroll shadow-sm ">
          <div className="p-14">
            <div className=" max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4  text-white">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className=" max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4  text-white">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className=" max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4  text-white">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className=" max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4  text-white">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className=" max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4  text-white">
              lorem sdafghjk asdbhsandj asduwq ajsdioasnd ajsndklsandi dnwq
            </div>
          </div>
        </div>
        <div className="p-14 w-full flex items-center">
          <Input placeholder="Type a message..." className="w-full" inputClassName="p-4 border-0 shadow-md rounded-full 
          bg-light focus:ring-0 focus:border-0 outline-none" />
          <div className="ml-4 p-2 cursor-pointer bg-light rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
          </div>
          <div className="ml-4 p-2 cursor-pointer bg-light rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
          </div>
        </div>
      </div>

      <div className="w-[25%] h-screen bg-light"></div>

    </div>
  )
}

export default Dashboard
