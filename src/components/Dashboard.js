import React, { useState } from 'react'
import { Alert, Button, Card, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {

    const { user, logout } = useAuth()
    const history = useHistory()
    const [error, setError] = useState()
    let username = ""
    let email = ""

    if (user !== undefined && user.email !== undefined) {
        username = user.email.split("@")[0]
        username = username.charAt(0).toUpperCase() + username.slice(1)
        email = user.email
    }


    const handleLogout = async (e) => {
        e.preventDefault()

        try {
            setError("")
            await logout()
            history.push("/login")
        } catch {
            setError("Can't login chech your email or passowrd")
        }
    }

    return (
        <Container className='d-flex align-items-center justify-content-center'>
            <Card>
                <Card.Body>
                    <h1 className="w-100 m-5">Home</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h2>Welcome {username}</h2>
                    <strong>Email: </strong> {email}
                    <Button type="link" className='w-100 mt-5' onClick={handleLogout}>Log Out</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}
