import React, { useState } from 'react';


export default function ImgUploader({ selectedImage, setSelectedImage, defaultPhoto }) {

    const src = selectedImage ? URL.createObjectURL(selectedImage) : defaultPhoto;

    return (
        <>
            <label htmlFor="photo" className="block m-auto w-full h-full rounded-md">
                <img src={src} alt="Movie Photo" className="max-h-5/6 max-w-5/6 object-cover m-auto rounded-md overflow-hidden" />
            </label>
            <input type="file" id="photo" name="photo" className="sr-only"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }} />
        </>
    );
}