import React, { useEffect, useState } from 'react'
import {useQuery} from 'jsonapi-react';
import { Link } from 'react-router-dom'

export default function User() {
    const [users, setUsers] = useState([])
    const { data, meta, error, isLoading, isFetching } = useQuery ( 'users')

    useEffect(
        () => {
            if (!!error)
                console.error(error)
        },
        [error]
    )

    useEffect(
        () => {
            if (!!data)
                setUsers(/** @type {any[]} */(data))
        },
        [data]
    )
    
    return (
        <div>
        <ul>
        {users.map((user, i) => (
            <li
                key={`user_${i}`}>
                <Link
                    to={`/user/${user.id}`}
                >
                    {user?.['first-name']} {user?.['last-name']}
                </Link>
            </li>
        ))
        }
    </ul>
      <Link
      to="user/new"
  >
      Create a new
  </Link>
  </div>
    )
}