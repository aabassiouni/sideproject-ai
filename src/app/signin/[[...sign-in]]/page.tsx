import { SignIn } from "@clerk/nextjs";

export const runtime = "edge";
export default function SignInPage() {
	console.log("Sign in page")
	return (
		<div className="flex justify-center h-screen w-screen bg-slate-200 items-center">
			<SignIn redirectUrl={"/dashboard"}/>
		</div>
	);
}
