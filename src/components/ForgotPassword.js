import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [message, setMessage] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setMessage("")
            await resetPassword(emailRef.current.value)
            setMessage("Check your email to reset password")
        } catch {
            setError("Can't reset password")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className='text-center mb-4'>Log In</h1>
                    {message && <Alert variant="info">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button
                            className='w-100 mt-4 '
                            type="submit"
                        >Get Reset Link</Button>

                        <div className='w-100 text-center mt-4'>
                            <Link to="/login">Switch to Log In? </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
