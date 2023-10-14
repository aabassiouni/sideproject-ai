'use client'
import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

function OnboardingSubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button className='w-20' type="submit" aria-disabled={pending}>
            {pending ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Submit'}
        </Button>
    )
}

export default OnboardingSubmitButton
