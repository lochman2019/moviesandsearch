import { useEffect } from "react";
import { useState } from "react";
import Router from "next/router";


import AppBody from "@/components/AppBody";
import Tags from "@/components/tags";
import ImgUploader from "@/components/img";
import axios from "axios";


export default function Upload() {

    // Get the token from local storage
    const [title, setTitle] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [token, setToken] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [location_tags, setLocationTags] = useState([]);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        setToken(localStorage.getItem("token"));

    })
    const submit = () => {
        const tag_list = tags.map((t) => t.id);
        const location_list = location_tags.map((t) => t.id);
        const friend_list = friends.map((t) => t.id);
        const form_data = new FormData();

        form_data.append("title", title);
        form_data.append("introduction", introduction);
        form_data.append("tag_list", tag_list);
        form_data.append("location_tag_list", location_list);
        form_data.append("friend_list", friend_list);
        form_data.append("avatar", selectedImage);

        axios.post("/api/postmovies/", form_data, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res);
            Router.push("/records");
        }).catch(err => {
            console.log(err);
        }
        )
    }

    const current = <>
        <div className="flex h-full w-full grow">
            <div className="flex-col w-1/2 p-16 mx-6 backdrop-blur-sm bg-white bg-opacity-20 shadow-md rounded-md">
                <ImgUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} 
                defaultPhoto="https://via.placeholder.com/640x360.png?text=Upload+Photo"/>
            </div>
            <div className="flex-col w-1/2 p-16 mx-6 backdrop-blur-sm bg-white bg-opacity-20 shadow-md rounded-md">
                <label htmlFor="title" className="block font-medium mb-2 text-lg">
                    Title
                </label>
                <input type="text" id="title" name="title"
                    className="w-full rounded-md border-gray-300 bg-transparent px-4 py-2 mb-4 hover:border-blue-300 focus:border-blue-300"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                <label htmlFor="intro" className="block font-medium mb-2 text-lg">
                    Introduction
                </label>
                <textarea id="intro" name="intro" className="w-full rounded-md border-gray-300 bg-transparent px-4 py-2 mb-4"
                    placeholder="How to you like the movie?"
                    value={introduction}
                    onChange={(event) => setIntroduction(event.target.value)} />
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
                <div className="flex">
                    <button className="bg-blue-400 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-blue-700 ml-auto"
                        onClick={submit}>
                        Submit
                    </button>

                </div>

            </div>
        </div>
    </>

    return (
        <AppBody current={current} />
    )
}