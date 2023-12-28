import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import AppBody from "@/components/AppBody";


async function getInfos() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const header = {
    'Authorization': `Token ${token}`
  };
  var repoonse = await axios.get("/api/users/?username=" + username, {
    headers: header
  });
  const user_info = repoonse.data.results[0];
  repoonse = await axios.get("/api/friends/", {
    headers: header
  });
  const friend_num = repoonse.data.results.length;
  repoonse = await axios.get("/api/postmovies/?username=" + username, {
    headers: header
  });
  const records = repoonse.data.results;
  return [user_info, friend_num, records];
}

const PostGallary = ({ title, records }) => {


  return (
    <div className="flex flex-col w-full h-full px-10 py-6 m-2 overflow-x-auto shadow-sm rounded-lg bg-gray-200 bg-opacity-20 backdrop-blur-lg">
      <div className="text-lg text-gray-700 sticky left-0">
        <p>{title}</p>
      </div>
      <div className="flex grow gap-4">
      {records.map((record, index) => {
        return <div className="flex flex-col items-center w-auto h-full p-6 flex-shrink-0">
          <img src={record.avatar} className="w-auto h-48 rounded-lg flex-shrink-0"></img>
          <p>{record.title}</p>
        </div>;
      })}

      </div>
    </div>
  );
}


export default function Account() {
  const [avatar, setAvatar] = useState("Loading...");
  const [username, setUsername] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [favorite, setFavorite] = useState("Not set");
  const [records, setRecords] = useState([]);
  const [latest_post, setLatestPost] = useState({
    title: "Upload your first movie!",
    introduction: "",
    avatar: "",
    tag_list: [],
    location_tag_list: [],
    friend_list: []
  });
  const [frineds_cnt, setFriendsCnt] = useState(0);

  // Get the token from local storage
  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username);
    getInfos().then(res => {
      console.log(res);
      const user_info = res[0];
      const friend_num = res[1];
      const records = res[2];
      setEmail(user_info.email);
      if (user_info.avatar) {
        setAvatar(user_info.avatar);
      } else {  
        setAvatar("https://img.redbull.com/images/c_crop,x_1494,y_0,h_2133,w_1706/c_fill,w_790,h_878/q_auto:low,f_auto/redbullcom/2022/2/20/y4ekokg7ltty4mo68cgv/jason-paul-freerunning-hamburg");
      }
      setFriendsCnt(friend_num);
      setRecords(records);
      if (records.length > 0) {
        setLatestPost(records[records.length - 1]);
      }
    }).catch(err => {
      console.log(err);
    });
  }, [])

  const tags = latest_post.tag_list.map((tag, index) => {
    return (
      <span key={index} className="px-2 py-1 mx-1 bg-blue-200 rounded-full text-gray-800 text-sm hover:bg-blue-400">{tag.tag_name}</span>
    )
  });

  const location = latest_post.location_tag_list.map((tag, index) => {
    return (
      <span key={index} className="px-2 py-1 mx-1 bg-blue-200 rounded-full text-gray-800 text-sm hover:bg-blue-400">{tag.tag_name}</span>
    )
  });

  const friends = latest_post.friend_list.map((tag, index) => {
    return (
      <span key={index} className="px-2 py-1 mx-1 bg-blue-200 rounded-full text-gray-800 text-sm hover:bg-blue-400">{tag.tag_name}</span>
    )
  });

  const current = (
    <div className="w-full h-full flex flex-col">
      <div className="w-auto h-1/2 flex px-8 py-4">
        <div className="w-2/5 h-full p-2 m-2 flex grow-0 overflow-hidden shadow-sm rounded-lg bg-gray-200 bg-opacity-20 backdrop-blur-lg">
          <div className="flex h-full w-1/2 p-3">
            <img src={avatar} className="h-full w-full object-contain rounded-lg" />
          </div>
          <div className="flex flex-col w-1/2 gap-4 px-4 my-8 justify-center">
              <p className="text-gray-800 text-lg">
                <span className="font-semibold" >Name:</span>
                <span className="text-gray-700 font-sans"> {username}</span></p>
              <p className="text-gray-800 font-semibold text-lg">Email:</p>
              <p className="text-gray-700">{email}</p>
              {/* <p className="text-gray-800 font-semibold text-lg">Favorite Movie:</p>
              <p className="text-gray-700">{email}</p> */}
              <p className="text-gray-800 text-lg">
                <span className="font-semibold" >Friends:</span>
                <span className="text-gray-700 font-sans"> {frineds_cnt}</span></p>
          </div>

        
        </div>
        <div className="flex flex-col w-3/5 h-full p-2 m-2 shadow-sm rounded-lg bg-gray-200 bg-opacity-20 backdrop-blur-lg">
          <div className="flex p-3 h-1/4"><span className="text-3xl text-gray-600">LATEST POST</span></div>
          <div className="flex h-3/4 w-full gap-4 justify-between">
            <div className="w-2/5 h-full flex justify-center items-center py-4">
                <img src={latest_post.avatar} className="h-full w-auto rounded-lg"></img>
            </div>
            <div className="h-full w-3/5 flex flex-col gap-4">
              <h1 className="text-sxl text-gray-600">{latest_post.title}</h1>
              <p className="h-1/3 overflow-auto">{latest_post.introduction}</p>
              <div>{tags}{location}{friends}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-1/2 w-full">
        <div className="w-1/2 px-8 py-4">
          <PostGallary title="LIKED MOVIES" records={records} />
        </div>
        <div className="w-1/2 p-4">
          <PostGallary title="RECENT POST" records={records} />
        </div>
      </div>
    </div>
  )

  return (
    <AppBody current={current} />
  )
}