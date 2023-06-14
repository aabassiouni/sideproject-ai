import React from 'react'
import { Button } from '../ui/button'

function BuyButton({item}: {item: string}) {
    console.log(item)
    return (
        <form className='w-full' action="/api/checkout" method="POST">
            <input type="hidden" name="item" value={item} />
            <Button
                type="submit"
                // className="flex w-full items-center justify-center border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                className='w-full'
            >
                Buy Now!
            </Button>
        </form>
    )
}

export default BuyButton
