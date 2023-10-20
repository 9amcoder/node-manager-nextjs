import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <p>
        Go back to{' '}
        <Link href="/" className="text-blue-500 hover:underline">
          Home Page
        </Link>
      </p>
    </div>
  );
}