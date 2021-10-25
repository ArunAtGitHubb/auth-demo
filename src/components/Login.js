import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import { useAuth } from '../contexts/AuthContext'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const { login, user } = useAuth()
    const [error, setError] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setError('')
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Can't login chech your email or passowrd")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className='text-center mb-4'>Log In</h1>
                    {user && user.email}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className='w-100 mt-4' type="submit">Log in</Button>
                    </Form>
                    <div className='w-100 text-center mt-4'>
                        <Link to="/forgot-password" > Forget Password </Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='text-center mt-4'>
                Didn't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
