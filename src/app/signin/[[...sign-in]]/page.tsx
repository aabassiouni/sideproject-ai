import { SignIn } from "@clerk/nextjs";

export const runtime = "edge";
export default function SignInPage() {
	console.log("Sign in page")
	return (
		<div className="flex flex-col gap-5 justify-center h-screen w-screen bg-slate-200 items-center">
			<h1 className="font-necto font-bold text-2xl">sideproject.ai</h1>
			<SignIn redirectUrl={"/dashboard"}/>
		</div>
	);
}
