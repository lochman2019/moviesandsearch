import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { WithContext as ReactTags } from 'react-tag-input';
import { stringify } from 'postcss';


const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tags({ modelurl, tags, setTags }) {

    const [token, setToken] = useState("");
    const [suggestions, setSuggestions] = useState();
    // const [tags, setTags] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Add token as header
        setToken(token);
        axios.get(modelurl, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(res => {
            console.log(res);
            const sugs = res.data.results.map((t) => {
                return {
                    id: String(t.id),
                    text: t.tag_name
                }
            });
            console.log('suggestions', sugs);
            setSuggestions(sugs);
        }).catch(err => {
            console.log(err);
        })
    }, [])
        

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        for (let s of suggestions) {
            if (s.text === tag.text) {
                console.log(s);
                setTags([...tags, s]);
                return;
            }
        }
        axios.post(modelurl, {
            tag_name: tag.text
        }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(res => {
            const new_tag = {
                id: String(res.data.id),
                text: res.data.tag_name
            }
            setSuggestions([...suggestions, new_tag]);
            setTags([...tags, new_tag]);
        }).catch(err => {
            console.log(err);
        });
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <div className='w-100'>
            <ReactTags
                tags={tags}
                inline
                suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
            />
        </div>
    );
}