import React, { Dispatch } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { PlusIcon } from 'lucide-react'

function KeywordInput({
    keywords,
    setKeywords,
}: {
    keywords: string[]
    setKeywords: Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <div className="flex gap-2">
            <div className='flex gap-2 items-center'>
                <Input placeholder="Keyword" className="text-center sm:w-56" />
                <Button size={'sm'}>
                    <PlusIcon size={16} />
                </Button>
            </div>
            <div className="grow">
                {/* <p>asdf</p> */}
            </div>
        </div>
    )
}

export default KeywordInput
