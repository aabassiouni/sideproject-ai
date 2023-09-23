import { SignIn } from "@clerk/nextjs";

export const runtime = "edge";
export default function SignInPage() {
	return (
		<div className="flex flex-col gap-5 justify-center h-screen w-screen bg-slate-200 items-center">
			<h1 className="font-necto font-bold text-2xl">sideprojectAI</h1>
			<SignIn redirectUrl={"/dashboard"}/>
		</div>
	);
}