import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-50 to-zinc-100 font-sans dark:from-black dark:to-zinc-900">
      <main className="flex w-full max-w-2xl flex-col items-center justify-center gap-8 px-8 py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="rounded-full bg-linear-to-r from-blue-600 to-purple-600 p-1">
            <div className="rounded-full bg-white dark:bg-black px-8 py-3">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Laboratorio 11
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            ¡Bienvenido!
          </h1>
          
          <p className="text-2xl font-medium text-zinc-600 dark:text-zinc-400">
            Luis Diego Quintana Granados
          </p>
          
          <p className="max-w-md text-lg leading-relaxed text-zinc-500 dark:text-zinc-500">
            Sistema de gestión de proyectos y tareas desarrollado con Next.js y Shadcn UI
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Link
            href="/dashboard"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-6 text-lg font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
          >
            Ir al Dashboard
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
