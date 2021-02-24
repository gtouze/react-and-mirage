import { history } from 'helpers/history'
import { useClient, useMutation, useQuery } from 'jsonapi-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function IndexIdUser({ match }) {
    const [user, setUser] = useState({})
    const { data, error, isLoading, errors } = useQuery(match.params?.id !== "new" && ['users', match.params?.id])
    const [mutate, { isLoading: isLoadingMutate }] = useMutation('users')
    const client = useClient()

    useEffect(
        () => {
            if (!!error)
                console.error(error)
            if (!!errors)
                console.error(errors)
        },
        [error, errors]
    )

    useEffect(
        () => {
            console.log(data)
            if (!!data)
                setUser(/** @type {any[]} */(data))
        },
        [data]
    )

    const onSubmit = useCallback(
        async () => {
            await mutate(user)
            history.push('/user')
        },
        [user]
    )

    const onDelete = useCallback(
        async () => {
            await client.delete(['user', match.params?.id])
            history.push('/user')
        },
        [user]
    )

    return (
        <main>
            <b>User:</b>
            <br />
            <br />
            {isLoading || isLoadingMutate
                ? <p>Loading...</p> :
                <>
                    <form
                        onSubmit={ev => {
                            ev.preventDefault()
                            onSubmit()
                        }}
                    >
                        <label>UserName</label>
                        <br />
                        <input
                            type="text"
                            defaultValue={user?.['first-name']}
                            onChange={ev => setUser({ ...user, 'first-name': ev.target.value })}
                        />
                        <br />
                        <br />
                        <label>LastName</label>
                        <br />
                        <input
                            type="text"
                            defaultValue={user?.['last-name']}
                            onChange={ev => setUser({ ...user, 'last-name': ev.target.value })}
                        />
                        <br />
                        <br />
                        <button
                            type="submit"
                        >
                            {match.params?.id === "new" ? "Create" : "Save"}
                        </button>
                    </form>
                </>
            }
            {match.params?.id !== "new" &&
                <button
                    type="button"
                    onClick={() => onDelete()}
                >
                    Delete
                </button>
            }
            <br />
            <Link to="/user">Go to users</Link>

        </main>
    )
}