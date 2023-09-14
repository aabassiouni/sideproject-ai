import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import Balancer from 'react-wrap-balancer'
import exampleImg from '/public/example.png'
import step1Img from '/public/step1.png'
import step2Img from '/public/step2.png'
import step3Img from '/public/step3.png'
import { UserCircle2, Wand2, Zap } from 'lucide-react'

export const runtime = 'edge'

export const metadata = {
    title: 'sideproject.ai',
    description: 'Transform your GitHub projects into impressive resume bullet points!',
}
export default async function Home() {
    return (
        <>
            <div className="  flex grow flex-col items-center justify-center gap-5 bg-contain bg-center p-12 sm:min-h-[450px]  sm:pb-0 ">
                <div className="mx-auto w-52 rounded-full border-2 border-blue-500 bg-white">
                    <p className="text-center font-necto">Now in beta! 🎉</p>
                </div>
                <div className='sm:w-2/3 bg-gradient-to-r bg-clip-text from-cyan-500/90 to-blue-500'>
                    <span className="  text-center text-4xl font-extrabold text-transparent sm:text-5xl">
                        <Balancer>Transform Your GitHub Projects Into Impressive Resume Sections!</Balancer>
                    </span>
                </div>
                <p className="text-medium text-center text-xl font-medium ">
                    Stop thinking about your resume. Just build.
                    {/* Transform your GitHub projects into a compelling resume section in seconds! */}
                </p>
                <Link className="w-fit" href="/signin">
                    <Button size="lg" className="mt-4 text-lg">
                        Get Started for Free!
                    </Button>
                </Link>
                <div className="hidden sm:block sm:w-3/4">
                    <Image
                        className="rounded-3xl rounded-b-none border-4 border-b-0 border-white shadow-md "
                        src={exampleImg}
                        alt="example pic"
                        priority
                        placeholder="blur"
                    />
                </div>
            </div>

            <div className="z-20 flex grow flex-col items-center justify-evenly gap-5 bg-white p-8  shadow-black">
                <p className="text-center text-4xl font-extrabold">How it Works</p>
                <div className="p- flex flex-row flex-wrap justify-around gap-10 lg:flex-nowrap">
                    <Card className="mt-2 flex-auto sm:m-4 sm:w-1/2  sm:min-w-0 sm:max-w-sm">
                        <CardHeader>
                            <div className="mx-auto my-2 h-36 w-80 rounded-lg bg-slate-200 ">
                                <Image src={step1Img} alt="example pic" />
                            </div>
                            <CardTitle>1. Create an account</CardTitle>
                            <CardDescription>
                                Getting started is easy. You can either sign up using your email address or simply log
                                in with your GitHub account.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="mt-2 flex-auto sm:m-4 sm:w-1/2  sm:min-w-0 sm:max-w-sm">
                        <CardHeader>
                            <div className="mx-auto my-2 h-36 w-80 rounded-lg bg-slate-200 ">
                                <Image src={step2Img} alt="example pic" />
                            </div>
                            <CardTitle>2. Select a Repository</CardTitle>
                            <CardDescription>
                                Choose a repository to showcase. From personal passion projects to major collaborative
                                efforts, select the work that best represents your skills and experience.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="mt-2 flex-auto sm:m-4 sm:w-1/2  sm:min-w-0 sm:max-w-sm">
                        <CardHeader>
                            <div className="mx-auto my-2 h-36 w-80 rounded-lg bg-slate-200 ">
                                <Image src={step3Img} alt="example pic" />
                            </div>

                            <CardTitle>3. Generate your Bullet Points</CardTitle>
                            <CardDescription>
                                With one click, generate a resume section that highlights your repository's achievements
                                in 3-4 bullet points.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col items-center gap-5 bg-white p-8  shadow-black">
                <Separator className="" />
                <p className="text-center text-4xl font-extrabold">Features</p>
                <div className="flex flex-row flex-wrap justify-around gap-10 lg:flex-nowrap">
                    {/* <div className="grid grid-rows-3 justify-evenly gap-10 sm:gap-44 sm:grid-cols-3 sm:grid-rows-none"> */}
                    <Card className="w-80">
                        <CardHeader>
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-blue-500">
                                <UserCircle2 strokeWidth={1.5} className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold">One-Click Login</CardTitle>
                            <CardDescription className="">
                                Seamlessly sign up with your GitHub account. No need to remember another password!
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-80">
                        <CardHeader>
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-blue-500">
                                <Zap strokeWidth={1.5} className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold">Easy to Use</CardTitle>
                            <CardDescription className="">
                                You can generate a resume section in seconds with just one click.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-80">
                        <CardHeader>
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-blue-500">
                                <Wand2 strokeWidth={1.5} className="h-6 w-6 text-slate-100" />
                            </div>
                            <CardTitle className="text-xl font-bold">AI-Driven Analysis</CardTitle>
                            <CardDescription className="">
                                Harness the power of AI to interpret and translate your GitHub projects into
                                resume-worthy bullet points, ensuring your code's essence is captured perfectly.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <Separator className="my-5" />
                <h1 className="text-center text-4xl font-extrabold">Frequently Asked Questions</h1>
                <Accordion orientation="horizontal" type="multiple" className="sm:w-2/5">
                    <AccordionItem value="item1">
                        <AccordionTrigger className="">
                            <p className="text-center text-xl ">Is sideproject.ai free? </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-base text-slate-600">
                                Sideproject.ai is currently in beta. During this time, all credits are free. There are
                                plans to add pricing in the future.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item2">
                        <AccordionTrigger className="">
                            <p className="text-xl">Who is sideproject.ai for?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-base text-slate-600">
                                Sideproject.ai is designed for developers, engineers, and tech enthusiasts aiming to
                                showcase their GitHub projects on their resumes. Whether you're a seasoned pro or a
                                budding coder, our platform translates your coding efforts into impactful resume bullet
                                points. Perfect for anyone proud of their code and eager to highlight it!
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item3">
                        <AccordionTrigger className="">
                            <p className="text-xl">Is my GitHub data safe with sideproject.ai?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-base">
                                Absolutely. Your data's security and privacy are our top priority. We only access the
                                data required to generate the bullet points and never store any of your code or personal
                                information beyond the duration of the process.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item4">
                        <AccordionTrigger className="">
                            <p className="text-xl">Does this work with private repositories?</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-base">
                                Yes! Sideproject.ai can work with private repositories, just login with your GitHub
                                account. After the bullet points are generated, we don’t retain any details or data from
                                your private repositories, ensuring the utmost confidentiality and respect for your
                                privacy.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}
