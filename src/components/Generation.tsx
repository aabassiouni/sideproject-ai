// @ts-nocheck
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useValues } from './context/context'
import { Separator } from './ui/separator'

function Generation() {
    const { generation } = useValues()
    // generation.name = 'Nextjs app router component helper'

    console.log('Generation', generation)
    return (
        <Card className={`m-4 mt-2 h-fit sm:min-w-0 ${generation.length > 1 ? 'border-2 border-sky-600' : ''}`}>
            <div className={`flex h-full items-start justify-start rounded-lg p-5`}>
                {generation.length > 1 ? (
                    <div className={`flex h-full items-start justify-start rounded-lg p-5`}>
                        <div className=" w-full rounded-md  bg-slate-100 p-10 font-serif text-lg">
                            <p className=" my-1 font-bold">{generation[0]}</p>
                            <Separator className="bg-black p-[1px]" />
                            <ul className="my-2 ml-6 list-disc [&>li]:mt-2 ">
                                {/* <li contentEditable="true">{rows[0].generated_text.firstBullet}</li>
                            <li>{rows[0].generated_text.secondBullet}</li>
                            <li>{rows[0].generated_text.thirdBullet}</li>
                            <li>{rows[0].generated_text.fourthBullet}</li>
                            <li>{rows[0].generated_text.fifthBullet}</li> */}
                                {generation.slice(1).map((bullet: any) => (
                                    <li>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="mx-auto my-auto text-slate-400">Your Generation will appear here!</p>
                )}
            </div>
            {/* </CardContent> */}
        </Card>
    )
}

export default Generation
