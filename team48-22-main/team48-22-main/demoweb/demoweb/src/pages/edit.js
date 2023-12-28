import { useEffect } from "react";
import { useState } from "react";
import Router from "next/router";


import AppBody from "@/components/AppBody";
import Tags from "@/components/tags";
import ImgUploader from "@/components/img";
import axios from "axios";


export default function Edit() {

    // Get the token from local storage
    const [token, setToken] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [curImg, setCurImg] = useState("");
    const [userId, setUserId] = useState("");
    // const [tags, setTags] = useState([]);
    // const [location_tags, setLocationTags] = useState([]);
    // const [friends, setFriends] = useState([]);
    useEffect(() => {
        const username = localStorage.getItem("username");
        setToken(localStorage.getItem("token"));
        axios.get("/api/users/?username=" + username, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(res => {
            console.log(res);
            const user_avatar = res.data.results[0].avatar;
            setUserId(res.data.results[0].id);
            if (user_avatar !== null) {
                setCurImg(res.data.results[0].avatar);
            } else {
                setCurImg("https://img.redbull.com/images/c_crop,x_1494,y_0,h_2133,w_1706/c_fill,w_790,h_878/q_auto:low,f_auto/redbullcom/2022/2/20/y4ekokg7ltty4mo68cgv/jason-paul-freerunning-hamburg");
            }
        }).catch(err => {
            console.log(err);
        });
    })
    const submitPhoto = () => {
        const form_data = new FormData();
        form_data.append("avatar", selectedImage);
        axios.put("/api/users/" + userId, form_data, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            alert("Avatar changed successfully!");
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const changePassword = () => {
        const new_password = document.getElementById("password").value;
        const confirm_password = document.getElementById("confirm_password").value;
        if (new_password !== confirm_password) {
            alert("New password and confirm password do not match!");
            return;
        }
        axios.put("/api/users/" + userId, {
            password: new_password
        }, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert("Password changed successfully!");
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const current = <>
        <div className="flex h-full w-full">
            <div className="flex flex-col w-1/2 gap-4 p-10 backdrop-blur-sm bg-white bg-opacity-20 shadow-md rounded-md justify-between">
                <div className="w-full text-gray-600 font-semibold text-3xl">Change Avatar</div>
                <div className="flex flex-shrink-2 overflow-hidden rounded-lg">
                    <ImgUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage}
                        defaultPhoto={curImg} />
                </div>
                <div className="w-full flex justify-end">
                    <button
                        type="submit"
                        className="w-24 ml-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => {submitPhoto()}}
                    >Confirm</button></div>
            </div>
            <div className="flex flex-col w-1/2 p-10 mx-6 backdrop-blur-sm bg-white bg-opacity-20 shadow-md rounded-md gap-4">
                <div className="flex flex-col w-full">
                    <div className="h-14 w-full text-gray-600 font-semibold text-3xl">Change Password</div>
                    <label className="block font-thin text-lg my-2">
                        New Password
                    </label>
                    <input type="password" id="password" name="password"
                        className="w-full rounded-md border-gray-300 bg-transparent px-4 py-2 mb-4 hover:border-blue-300 focus:border-blue-300"
                        placeholder="..." />
                    <label className="block font-thin text-lg my-2">
                        Confirm Password
                    </label>
                    <input type="password" id="confirm_password" name="confirm_password"
                        className="w-full rounded-md border-gray-300 bg-transparent px-4 py-2 mb-4 hover:border-blue-300 focus:border-blue-300"
                        placeholder="..." />
                    <div className="flex my-2">
                        <button className="bg-blue-400 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-blue-700 ml-auto"
                            onClick={() => {changePassword()}}>
                            Submit
                        </button>
                    </div>

                </div>
                {/* <div className="flex flex-col w-full">
                    <div className="h-24 w-full text-gray-600 font-semibold text-3xl">Manage Your Tags</div>
                    <div className="w-full pr-4 my-2">
                        <label htmlFor="movie-tags" className="block -medium my-6 text-lg">Movie Tags</label>
                        <Tags modelurl="/api/movie_tags/" tags={tags} setTags={setTags} />
                    </div>
                    <div className="w-full pr-4 my-2">
                        <label htmlFor="movie-tags" className="block -medium my-6 text-lg">Location Tags</label>
                        <Tags modelurl="/api/location_tags/" tags={location_tags} setTags={setLocationTags} />
                    </div>
                    <div className="w-full pr-4 my-2">
                        <label htmlFor="movie-tags" className="block -medium my-6 text-lg">Friends</label>
                        <Tags modelurl="/api/friends/" tags={friends} setTags={setFriends} />
                    </div>
                </div> */}


            </div>
        </div>
    </>

    return (
        <AppBody current={current} />
    )
}