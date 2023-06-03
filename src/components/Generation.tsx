'use client'

import { Input } from './ui/input'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import GithubIcon from './icons/GithubIcon'
import { useValues } from './context/context'

function Generation() {
    const { generation } = useValues()

    return (
        <Card className=" m-4 mt-2 h-52 sm:h-full sm:min-w-0">
            {/* <CardHeader>
				<CardTitle>
					<GithubIcon className="inline-block mr-2" size={16} />
					aabassiouni/framebound
				</CardTitle>
				<CardDescription>
					<p>38 files, </p>
				</CardDescription>
			</CardHeader> */}
            <CardContent className='h-full'>
                <div className="flex h-full items-center justify-center">
                    {generation ? (
                        <>
                            <p className="max-w-[350px]">{generation}</p>
                        </>
                    ) : (
                        <p className="text-slate-400">Your Generation will appear here!</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default Generation
