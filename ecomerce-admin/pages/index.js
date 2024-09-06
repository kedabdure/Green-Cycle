import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  // grab the session object from the hook
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-blue-900">
        <div className="text-center f-width">
          <button
            // pass a provider name (google) to the sign in to use our own custom Sign in button
            onClick={() => signIn('google')}  className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-900">
      <div className="text-center f-width">
        <h1 className="text-white text-2xl">Welcome {session.user.name}</h1>
        <button
          onClick={() => signOut() } className="bg-white text-black px-4 py-2 rounded-lg"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
