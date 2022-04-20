import React, { useEffect, useState } from 'react';

const GetDataAndPostData2 = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleOnSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email };

        //post the data in our server
        fetch('http://localhost:5000/user', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                const allusers = [...users, data];
                setUsers(allusers);
            })
    }

    return (
        <div>
            <h1>My Own Data: {users.length}</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="name" id="name" placeholder='Your name' required />
                <input type="email" name="email" id="email" placeholder='Your email' required />
                <input type="submit" value="Add users" />
            </form>
            <ul style={{ listStyle: 'none' }}>
                {
                    users.map(user => <li key={user.id}>id:{user.id} name: {user.name} email: {user.email} phone:{user.phone}</li>)
                }
            </ul>
        </div>
    );
};

export default GetDataAndPostData2;