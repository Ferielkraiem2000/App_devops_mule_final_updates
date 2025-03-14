import Image from "next/image";
import WorflowImg01 from "@/public/images/workflow-01.png";
import WorflowImg02 from "@/public/images/workflow-02.png";
import WorflowImg03 from "@/public/images/workflow-03.png";
import Spotlight from "@/components/spotlight";

export default function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* <div className="pb-8 md:pb-12"> */}
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 md:pb-20">
          <div className="flex justify-center items-center gap-2 py-4 ">
  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#244d69] to-[#244d69] opacity-80"></div>
  <span className="text-xl font-semibold text-[#244d69] tracking-wide font-bold">
    Pourquoi choisir notre plateforme ?
  </span>
  <div className="h-px w-16 bg-gradient-to-l from-transparent via-gray-600 to-gray-400 opacity-80"></div>
</div>


            <p className="text-lg text-indigo-400 md:py-6">
           Notre solution simplifie et accélère la mise en place de pipelines CI/CD pour vos projets MuleSoft, quel que soit l’environnement utilisé. Automatisez vos déploiements, améliorez la qualité du code et sécurisez la gestion de vos API avec une approche DevOps complète et efficace.
            </p>
            <div className="text-center">
            <h2  className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.400),theme(colors.blue.500),theme(colors.gray.600),theme(colors.blue.600),theme(colors.gray.400))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4.5xl"  >
            Fonctionnalités principales
            </h2> </div>
          </div>
          {/* Spotlight items */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-16 lg:max-w-none lg:grid-cols-2">
            {/* Card 1 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
             
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Arrow */}
       
                {/* Image */}
                {/* <Image
                  className="inline-flex"
                  src={WorflowImg01}
                  width={350}
                  height={200}
                  alt="Workflow 01"
                /> */}
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xl font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent font-bold " >
                      <strong>Génération automatique des pipelines CI/CD</strong>
                      </span>
                    </span>
                  </div>
                  <div className="text-teal-600"> 
  <ul className="space-y-3 text-white dark:text-gray-300">
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Création de pipelines en quelques clics</span>
    </li>
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Intégration avec GitLab, GitHub, Bitbucket, Azure DevOps</span>
    </li>
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Gestion simplifiée des versions</span>
    </li>
  </ul>
</div>

                </div>
              </div>
            </a>
            {/* Card 2 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
              
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Arrow */}

                {/* Image */}
                {/* <Image
                  className="inline-flex"
                  src={WorflowImg02}
                  width={350}
                  height={288}
                  alt="Workflow 02"
                /> */}
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xl font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="font-bold bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                     <strong>Choisissez l'environnement d’hébergement </strong> 
                      </span>
                    </span>
                  </div>
                  <div className="text-teal-600"> 
  <ul className="space-y-3 text-white dark:text-gray-300">
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>CloudHub 2.0 pour un hébergement managé</span>
    </li>
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>On-Premises pour un contrôle total de votre infrastructure</span>
    </li>
  </ul>
</div>
                </div>
              </div>
            </a>
            {/* Card 3 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
             
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">

                {/* Image */}
                {/* <Image
                  className="inline-flex"
                  src={WorflowImg03}
                  width={350}
                  height={288}
                  alt="Workflow 03"
                /> */}
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xl font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="font-bold bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                      <strong>  Surveillez vos performances en temps réel</strong> 
                    </span>
                    </span>
                  </div>
                  <div className="text-teal-600"> 
  <ul className="space-y-3 text-white dark:text-gray-300">
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Grafana</span>
    </li>
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>ELK (Elastic Stack)</span>
    </li>
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Datadog</span>
    </li>
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Splunk</span>
    </li>
  </ul>
</div>

                </div>
              </div>
            </a>
                       {/* Card 4 */}
                       <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
             
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">

                {/* Image */}
                {/* <Image
                  className="inline-flex"
                  src={WorflowImg03}
                  width={350}
                  height={288}
                  alt="Workflow 03"
                /> */}
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xl font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="font-bold bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                      <strong>Gestion avancée des artefacts</strong> 
                    </span>
                    </span>
                  </div>
                  <div className="text-teal-600"> 
  <ul className="space-y-3 text-white dark:text-gray-300">
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>JFrog Artifactory</span>
    </li>
    <li className="flex items-center gap-2">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>Nexus Repository</span>
    </li>
  </ul>
</div>

                </div>
              </div>
            </a>
          </Spotlight>
        </div>
      {/* </div> */}
    </section>
  );
}
