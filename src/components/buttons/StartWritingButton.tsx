'use client';

import React from 'react'
import { Button } from '../ui/button'
import { useValues } from '../context/context'
import SparkleIcon from '../icons/SparkleIcon';

function StartWritingButton({className}: {className?: string}) {
    const { setSelectedRepo, setGeneration } = useValues()
    
    function handleClick() {
        setSelectedRepo({ repo: '', url: '', owner: '', path: '' })
        setGeneration([])
    }

    return <Button  className={className} onClick={handleClick}>Start Writing <span className='ml-2'><SparkleIcon /></span></Button>
}

export default StartWritingButton
