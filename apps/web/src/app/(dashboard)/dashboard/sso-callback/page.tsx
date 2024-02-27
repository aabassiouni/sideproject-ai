import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import React from 'react'

function SSOCallbackPage() {
    return <AuthenticateWithRedirectCallback />;
}

export default SSOCallbackPage