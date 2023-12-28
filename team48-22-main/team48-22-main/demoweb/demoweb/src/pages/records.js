import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useTable } from 'react-table';

import AppBody from '@/components/AppBody';


const Table = ({ data }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Image',
                accessor: 'avatar',
                Cell: ({ value }) =>
                <img src={value} alt="Product Image"
                        className="max-w-7xl w-64 rounded-lg mx-auto" />,
            },
            {
                Header: 'Title',
                accessor: 'title',
                className: 'w-1/8 px-4 py-2 text-gray-800 font-semibold',
                width: '12.5%'
            },
            {
                Header: 'Introduction',
                accessor: 'introduction',
                className: 'w-1/8 px-4 py-2 text-gray-600',
            },
            {
                Header: 'Tags',
                accessor: 'tag_list',
                Cell: ({ value }) => (
                    <div className='w-1/8 '>
                        {value.map((tag) => (
                            <span className="px-2 py-1 mx-1 bg-blue-200 rounded-full text-gray-800 text-sm hover:bg-blue-400 m-auto">{tag.tag_name}</span>
                        ))}
                    </div>
                ),
            },
            {
                Header: 'Location',
                accessor: 'location_tag_list',
                Cell: ({ value }) => (
                    <div className='w-1/8 mx-auto items-center'>
                        {value.map((tag) => (
                            <span className="px-2 py-1 mx-1 bg-blue-200 rounded-full text-gray-800 text-sm hover:bg-blue-400">{tag.tag_name}</span>
                        ))}
                    </div>
                ),
            },
            {
                Header: 'Friends',
                accessor: 'friend_list',
                Cell: ({ value }) => (
                    <div className='w-1/8 '>
                        {value.map((tag) => (
                            <span className="px-2 py-1 mx-1 bg-blue-200 rounded-full text-gray-800 text-sm hover:bg-blue-400">{tag.tag_name}</span>
                        ))}
                    </div>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()} className="w-full">
            <thead className='sticky top-0 bg-opacity-20 backdrop-blur-lg bg-gray-300 h-16 rounded-lg shadow-md w-full'>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="content-center text-center m-auto">
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} className="w-1/8">{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}
                                    className="w-1/8 px-4 py-2 m-auto text-center text-gray-600"
                                >{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}


export default function Records() {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // const username = localStorage.getItem("username");
        axios.get("/api/postmovies/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(res => {
            console.log(res);
            setRecords(res.data.results);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const current = (
        <div className='p-8 m-8 rounded-lg flex justify-between backdrop-blur-sm bg-white bg-opacity-20 shadow-md
         overflow-y-auto w-full '>
            <Table data={records} />
        </div>
    )

    return (
        <AppBody current={current} />
    )
}