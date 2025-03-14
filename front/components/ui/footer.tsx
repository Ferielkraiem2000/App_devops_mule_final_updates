import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";

export default function Footer() {
  return (
    <div className="w-full relative w-full px-2 sm:px-10">
      {/* Illustration de pied de page */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={FooterIllustration}
          width={1076}
          height={378}
          alt="Footer illustration"
        />
      </div>

      <section className="grid grid-cols-1 justify-between gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Bloc 4 : Contact */}
        <div className="lg:col-span-1">
                   <div className="mb-6 text-2xl font-bold bg-gradient-to-r from-blue-900 to-cyan-600 text-transparent bg-clip-text">
            Contact
          </div>
          <ul className="space-y-5">
            {/* Lien vers le site web avec icône Globe */}
            <li className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-teal-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.05 12a9.96 9.96 0 011.66-5.15M21.95 12a9.96 9.96 0 01-1.66 5.15M2.05 12h4.2m11.5 0h4.2M12 2.05v4.2m0 11.5v4.2"
                />
              </svg>
              <a
                className="ml-4 text-indigo-400 hover:text-teal-600 transition"
                href="https://www.cweave.fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.cweave.fr
              </a>
            </li>

            {/* Lien pour l'email avec icône Enveloppe */}
            <li className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-teal-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0a2 2 0 00-2-2H5a2 2 0 00-2 2m18 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8"
                />
              </svg>
              <a
                className="ml-4 text-indigo-400 hover:text-teal-600 transition"
                href="mailto:contact@cweave.fr"
              >
                contact@cweave.fr
              </a>
            </li>

            {/* Lien vers LinkedIn avec icône LinkedIn */}
            <li className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-teal-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.3 8h4.4v16H.3V8zm7.7 0h4.2v2.16h.06c.59-1.1 2.03-2.26 4.18-2.26 4.46 0 5.3 2.94 5.3 6.76V24h-4.4v-7.08c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.74V24H8V8z" />
              </svg>
              <a
                className="ml-4 text-indigo-400 hover:text-teal-600 transition"
                href="https://www.linkedin.com/company/comweave/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comweave LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Bloc final avec logo et réseaux sociaux */}
      <section className="flex flex-col items-center justify-between border-t py-8 sm:flex-row">
        <div className="mb-4 sm:mb-0">
          <Logo />
        </div>
        <p className="mb-3 text-sm text-indigo-400/65 sm:mb-0">
          © 2025 Comweave
          <span className="text-gray-700"> · </span>
        </p>
        <ul className="inline-flex gap-4">
          {/* Exemple d'icône LinkedIn */}
          <li>
            <a
              className="flex items-center justify-center text-teal-500 transition hover:text-teal-600"
              href="https://www.linkedin.com/company/comweave"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                className="h-8 w-8 fill-current"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M29 0H3C1.35 0 0 1.35 0 3v26c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3ZM9.339 27H5.667V12.667h3.672V27ZM7.503 10.5c-1.173 0-2.125-.953-2.125-2.125 0-1.173.952-2.125 2.125-2.125 1.172 0 2.125.952 2.125 2.125 0 1.172-.953 2.125-2.125 2.125ZM27 27h-3.671V19.333c0-1.835-.037-4.2-2.557-4.2-2.56 0-2.953 2-2.953 4.066V27h-3.673V12.667h3.526v2.057h.05c.492-.933 1.697-1.917 3.495-1.917 3.737 0 4.423 2.463 4.423 5.663V27Z" />
              </svg>
            </a>
          </li>
          {/* Vous pouvez ajouter d'autres icônes si nécessaire */}
        </ul>
      </section>
    </div>

  );
}

