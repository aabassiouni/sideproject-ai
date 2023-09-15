// @ts-nocheck
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useValues } from './context/context'
import { Separator } from './ui/separator'
import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'
import CopyToClipboardButton from './buttons/CopyToClipboardButton'
import RatingButton from './buttons/RatingButton'

//for testing
// const generation = [
//     'listenin',
//     'Developed a full-stack music sharing application using React, Node.js, Express, MongoDB and Firebase to allow users to connect with friends and share their music listening history.',
//     'Built responsive frontend using React with components like Tabs, Modals and Scroll Areas to provide a polished user experience across different devices.',
//     'Employed Spotify Web API to retrieve user profiles, playback data and track metadata to power core application features and integrated third party APIs like Firebase.',
//     'Implemented authentication with Spotify OAuth and generated custom authentication tokens with Firebase Admin SDK to securely store user accounts and profile data in NoSQL database.',
//     'Wrote RESTful APIs with Express.js to handle CRUD operations for user and friend data along with real-time messaging capabilities with WebSockets.',
// ]

function Generation() {
    const { generation } = useValues()
    // console.log("generation", generation)
    return generation ? (
        <Card className=" m-4 mt-0 h-max border-2 border-sky-600 sm:min-w-0 ">
            <div className={`flex h-full items-start justify-start rounded-lg p-2 sm:p-5`}>
                <div className=" h-full w-full space-y-2 rounded-md  bg-slate-100 p-2 text-lg  sm:p-10">
                    <div className='flex justify-between'>
                        <p className=" my-1 font-bold">{generation.name}</p>
                        <RatingButton />
                    </div>
                    <Separator className="" />
                    {generation.bullets.map((bullet, i) => (
                        <motion.div
                            initial={{
                                opacity: 0,
                                translateY: 50,
                                // translateY: i % 2 === 0 ? -50 : 50,
                                // translateX: -50,
                            }}
                            key={i}
                            className="w-full"
                            animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.3 }}
                        >
                            <Card>
                                <CardHeader className="flex-row items-center justify-between">
                                    <ul className="my-2 ml-6 list-disc [&>li]:mt-2 ">
                                        <li className="list-disc">{bullet}</li>
                                    </ul>
                                    <CopyToClipboardButton textToCopy={bullet} />
                                    {/* <Copy className="m-3 w-7 h-7 bg-slate-500 text-slate-400" /> */}
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Card>
    ) : (
        <Card className="m-4 mt-2 h-full sm:min-w-0 ">
            <div className={`flex h-full items-start justify-start rounded-lg p-5`}>
                <p className="mx-auto my-auto text-slate-400">Your Generation will appear here!</p>
            </div>
        </Card>
    )
}

export default Generation
