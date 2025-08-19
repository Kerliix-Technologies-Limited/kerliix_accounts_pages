import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6">
      <img
        src="https://raw.githubusercontent.com/kerliix/.github/main/company/logo.png"
        alt="Company Logo"
        className="mb-8 max-w-lg w-full object-contain"
      />
      <p className="text-white/80 mb-10 max-w-md text-center">
        Welcome back
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
      >
        Dashboard
      </button>
    </div>
  );
}
