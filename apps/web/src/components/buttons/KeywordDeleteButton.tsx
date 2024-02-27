'use client'

import { X } from 'lucide-react'
import React from 'react'
import { useValues } from '../context/context'

function KeywordDeleteButton({ currKeyword }: { currKeyword: string }) {
    const { keywords, setKeywords } = useValues()
    console.log('curr keyword is ', currKeyword)

    function handleClick() {
        console.log('delete button clicked')
        setKeywords(keywords.filter((keyword) => keyword !== currKeyword))
    }

    return (
        <button onClick={handleClick} className="rounded-full p-1 hover:bg-slate-300">
            <X size={12} />
        </button>
    )
}

export default KeywordDeleteButton
