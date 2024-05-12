import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
        <div className="relative z-10 px-6 py-8 sm:px-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Sign in</h2>
              <p className="text-gray-500 dark:text-gray-400">Enter your email and password to access your account.</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}