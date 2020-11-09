import React from 'react'
import { useAuth } from '../../hooks/use-auth';

const LoginRedirect = () => {
    const auth = useAuth()
    window.location.href = auth.createAuthUrl().toString()
    return null;
}

export default LoginRedirect;