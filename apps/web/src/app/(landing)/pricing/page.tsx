import React from 'react'
import { stripe } from '@/lib/stripe'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import BuyButton from '@/components/buttons/BuyButton'
import { Badge } from '@/components/ui/badge'


async function PurchasePage() {
    const products = await stripe.products.list({
        expand: ['data.default_price'],
    })

    if (typeof products.data[0].default_price === 'string') {
        return
    } else if (products.data[0].default_price === null) {
        return
    }

    products.data.sort((a, b) => {
        //@ts-ignore
        if (a.default_price.unit_amount > b.default_price.unit_amount) {
            return 1
            //@ts-ignore
        } else if (a.default_price.unit_amount < b.default_price.unit_amount) {
            return -1
        } else {
            return 0
        }
    })
    // if (typeof products.data[0].default_price === 'string') {
    //     // console.log(products.data[0].default_price?.unit_amount)
    //     throw new Error('default_price is a string')
    // }

    return (
        <div className="flex flex-col justify-center">
            <div className="my-10">
                <h1 className="text-center text-4xl font-bold">Purchase Credits</h1>
                <p className="text-center text-xl">Select the amount of credits you would like to purchase.</p>
            </div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-10">

                <Card className="mx-3 flex min-h-[350px] w-full flex-col border-2 border-blue-400 sm:mx-0 sm:w-64">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">{products.data[0].name}</CardTitle>
                        <CardTitle className="text-center text-6xl font-bold">
                            {/* @ts-ignore */}
                            ${products.data[0].default_price?.unit_amount / 100}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className=" grow">
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>Great to try out!</li>
                        </ul>
                        {/* <Button className="w-full">Sign up</Button> */}
                    </CardContent>
                    <CardFooter>
                        {/* @ts-ignore */}
                        <BuyButton item={products.data[0].default_price.id}/>
                    </CardFooter>
                </Card>
                <Card className="mx-3 flex min-h-[350px] w-full flex-col border-2 border-blue-400 sm:w-64">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">{products.data[1].name}</CardTitle>
                        <CardTitle className="text-center text-6xl font-bold">
                            {/* @ts-ignore */}
                            ${products.data[1]?.default_price?.unit_amount / 100}
                        </CardTitle>
                        <Badge className='self-center my-5 w-max'>Recommended</Badge>
                    </CardHeader>
                    <CardContent className=" grow">
                        <ul className=" ml-6 list-disc [&>li]:mt-2">
                            <li> Perfect for developers with multiple projects</li>
                            <li>Save 16%!</li>
                        </ul>
                        {/* <Button className="w-full">Sign up</Button> */}
                    </CardContent>
                    <CardFooter>
                        {/* @ts-ignore */}
                        <BuyButton item={products.data[1].default_price.id} />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default PurchasePage
