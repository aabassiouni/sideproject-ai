import React from 'react'
import { Button } from '../ui/button'

function BuyButton({item}: {item: string}) {
    return (
        <form className='w-full' action="/api/checkout" method="POST">
            <input type="hidden" name="item" value={item} />
            <Button
                type="submit"
                className='w-full'
            >
                Buy Now!
            </Button>
        </form>
    )
}

export default BuyButton
