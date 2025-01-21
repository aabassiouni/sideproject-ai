import { RedirectToSignIn, SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";

async function ProfilePage() {
  return (
    <>
      <div className="flex min-h-screen justify-center bg-slate-200 p-4 dark:bg-gray-900">
        <SignedIn>
          <div className="leading-none">
            <UserProfile />
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </>
  );
}

export default ProfilePage;
