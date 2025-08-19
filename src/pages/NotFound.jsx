import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6">
      <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
      <p className="text-white/80 text-center mb-8 max-w-md">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
