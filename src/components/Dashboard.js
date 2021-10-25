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
    let photoURL = ""
    let displayName = ""
    let isVerfiedEmail = false

    if (user !== undefined && user.email !== undefined) {
        console.log(user);

        username = user.email.split("@")[0]
        username = username.charAt(0).toUpperCase() + username.slice(1)
        email = user.email
        isVerfiedEmail = user.emailVerified
        displayName = user.displayName
        photoURL = user.photoURL
    }

    console.log(photoURL);

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
                {isVerfiedEmail ? <Card.Img src={photoURL} alt="not-found" /> : null}
                <Card.Body>
                    <h1 className="w-100 mt-5 mb-5 text-center">Home</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h2
                        className="w-100 mt-2 mb-2 text-center">
                        Welcome {isVerfiedEmail ? displayName : username}
                    </h2>
                    <strong>Email: </strong> {email}
                    <Button type="link" className='w-100 mt-5' onClick={handleLogout}>Log Out</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}
