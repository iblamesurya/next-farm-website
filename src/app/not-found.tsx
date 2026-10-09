import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
          404
        </div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-6 text-sm">
          The pond formulation, diagnostic tool, or page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition text-sm text-center"
          >
            Return to Storefront
          </Link>
          <Link
            href="/pond-doctor"
            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition text-sm text-center"
          >
            Pond Doctor Diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}
