'use client';

import React from 'react'
import { Button } from './ui/button'
import { useValues } from './context/context'

function StartWritingButton() {
    const { setSelectedRepo, setGeneration } = useValues()
    function handleClick() {
        setSelectedRepo({ repo: '', url: '', owner: '', path: '' })
        setGeneration('')
        console.log('Start Writing')
    }

    return <Button onClick={handleClick}>Start Writing</Button>
}

export default StartWritingButton
