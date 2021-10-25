import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPaswordRef = useRef()
    const history = useHistory()
    const { signup, user, googleSignIn } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user !== undefined && user !== null) {
            history.push("/")
        }
    }, [history, user])

    const handleGoogleSignUp = async (e) => {
        await googleSignIn()

    }

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== confirmPaswordRef.current.value) {
            setError("Password do not match!")
        }

        try {
            setLoading(true)
            setError('')
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (error) {
            setError("Account can't be created", error.message)
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className='text-center mb-4'>Sign Up</h1>
                    {user && user.email}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSignUp}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id='confirmPassword'>
                            <Form.Label>Confrim Password</Form.Label>
                            <Form.Control type="password" ref={confirmPaswordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-4' type="submit">Sign Up</Button>
                        <Button className='w-100 mt-4' onClick={handleGoogleSignUp}>Google Sign In</Button>
                    </Form>

                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-4'>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
