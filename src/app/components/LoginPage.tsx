import { ArrowLeft, FileText } from "lucide-react";

interface LoginPageProps {
  onBack: () => void;
}

export function LoginPage({ onBack }: LoginPageProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6" style={{ backgroundColor: 'var(--background)' }}>
      <button
        onClick={onBack}
        className="absolute top-4 left-4 p-4 rounded-xl border-2 md:border-3 transition-colors"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
      >
        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="w-full max-w-md px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl mb-8 text-center" style={{ color: 'var(--foreground)' }}>
          Log In
        </h1>

        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="block text-lg mb-2" style={{ color: 'var(--foreground)' }}>
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-6 py-4 text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg mb-2" style={{ color: 'var(--foreground)' }}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full px-6 py-4 text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
