import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

function PriceTier() {
    return (
        <Card className="flex h-96  w-56 flex-col items-center justify-center">
            <CardHeader>
                <CardTitle className="text-center"> Free</CardTitle>
                <CardDescription className="text-center">Card Description</CardDescription>
            </CardHeader>
            <CardContent className="grow flex justify-center items-center">
                <ul className="list-disc">
                    <li>Card Content</li>
                    <li>Card Content</li>
                    <li>Card Content</li>
                    <li>Card Content</li>
                </ul>
            </CardContent>
            {/* <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>
    )
}

function PricingPage() {
    return (
        <div className="mt-10 flex flex-col items-center">
            <h1 className="m-8 text-5xl font-medium">Pricing</h1>
            <div className="flex gap-10">
                <PriceTier />
                <PriceTier />
                <PriceTier />

            </div>
        </div>
    )
}

export default PricingPage
