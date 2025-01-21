import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-slate-200">
      <h1 className="font-azeret font-bold text-2xl text-slate-900">sideprojectAI</h1>
      <SignIn redirectUrl={"/dashboard"} />
    </div>
  );
}
