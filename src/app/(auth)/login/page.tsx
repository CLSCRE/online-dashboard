import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">CLS CRE</h1>
        <p className="mt-1 text-sm text-gray-500">Sign in to your dashboard</p>
      </div>
      <LoginForm />
    </div>
  );
}
