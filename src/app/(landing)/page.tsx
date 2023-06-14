import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const runtime = 'edge'

export default async function Home() {
    return (
        <>
            <div className="bg-contain bg-center flex grow flex-col justify-center gap-5 p-12 sm:min-h-[450px] ">
                <p className=" text-4xl font-extrabold sm:max-w-md">
                    Supercharge Your Resume with Your GitHub Achievements
                </p>
                <p className="text-medium text-xl!">
                    Transform your GitHub projects into compelling resume content - instantly!
                </p>
                <Link className="w-fit" href="/signin">
                    <Button size="lg" className="mt-4 text-lg">
                        Get Started for Free!
                    </Button>
                </Link>
            </div>
            <div className="flex grow flex-col items-center justify-evenly gap-5 bg-white p-8 shadow-md shadow-black">
                <p className="text-center text-5xl font-extrabold">How it Works</p>
                <div className="flex flex-row flex-wrap justify-around sm:flex-nowrap">
                    <Card className="m-4 flex-auto mt-2 sm:w-1/2  sm:min-w-0 sm:max-w-sm">
                        <CardHeader>
                            <Image src="/images/1.svg" alt="Picture of the author" width={200} height={200} />

                            <CardTitle>1. Create an account</CardTitle>
                            <CardDescription>
                                Getting started is easy. You can either sign up using your email address or simply log
                                in with your GitHub account.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="m-4 flex-auto mt-2 sm:w-1/2  sm:min-w-0 sm:max-w-sm">
                        <CardHeader>
                            <Image src="/images/1.svg" alt="Picture of the author" width={200} height={200} />

                            <CardTitle>2. Select a Repository</CardTitle>
                            <CardDescription>
                                Choose a repository to showcase. From personal passion projects to major
                                collaborative efforts, select the work that best represents your skills and experience.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="m-4 flex-auto mt-2  sm:w-1/2  sm:min-w-0 sm:max-w-sm">
                        <CardHeader>
                            <Image src="/images/1.svg" alt="Picture of the author" width={200} height={200} />

                            <CardTitle>3. Generate your Bullet Points</CardTitle>
                            <CardDescription>
                                With one click, generate a resume section that highlights your repository's achievements
                                in 3-4 bullet points.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                  
                </div>
            </div>
        </>
    )
}
