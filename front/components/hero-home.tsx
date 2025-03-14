import VideoThumb from "@/public/images/devops_mule.png"; 
import ModalVideo from "@/components/modal-video";

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:py-7">
        {/* Contenu principal */}
        <div className="py-12 md:py-4">
          {/* En-tête de la section */}
          <div className="pb-12 text-center md:pb-20">
            <h1
              // className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.blue.300),theme(colors.gray.50),theme(colors.blue.400),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4.5xl"
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.400),theme(colors.blue.500),theme(colors.gray.600),theme(colors.blue.600),theme(colors.gray.400))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4.5xl"

              data-aos="fade-up"
            >

Optimisez vos pipelines CI/CD, déployez vos APIs MuleSoft et surveillez-les en temps réel avec notre plateforme DevOps.                </h1>
            <div className="mx-auto max-w-3xl">
              {/* <p
                className="mb-8 text-xl text-blue-200/65"
                data-aos="fade-up"
                data-aos-delay={200}
              >
              </p> */}
              <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                {/* <div data-aos="fade-up" data-aos-delay={400}>
                  <a
                    className="btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#commencer"
                  >
                    <span className="relative inline-flex items-center">
                      Commencer avec DevOps
                      <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                </div> */}
                {/* <div data-aos="fade-up" data-aos-delay={600}>
                  <a
                    className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                    href="#demo"
                  >
                    Demander une Démo
                  </a>
                </div> */}
              </div>
            </div>
          </div>
                  {/* Video & Vertical Text Container */}

          {/* <div className="flex justify-center">

          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={600}
            thumbHeight={225}
            thumbAlt="Vidéo sur l'automatisation DevOps"
            video="videos/video.mp4"
            videoWidth={1280}
            videoHeight={720}
          />
          </div> */}
          {/* <div className="flex flex-col items-center space-y-3 max-w-2xl mx-auto bg-[linear-gradient(to_right,#1e3c5a,#2a5d78)] p-4 rounded-lg text-gray-200 text-xl mt-9"> */}
  {/* <p>🚀 Automatisez et sécurisez vos déploiements MuleSoft</p>
  <p>🔹 Pourquoi choisir notre plateforme ?</p>
  <p>Notre solution simplifie et accélère la mise en place de pipelines CI/CD pour vos projets MuleSoft, quel que soit l’environnement utilisé. Automatisez vos déploiements, améliorez la qualité du code et sécurisez la gestion de vos API avec une approche DevOps complète et efficace.</p>
  
  <p>⚙️ <strong>Fonctionnalités principales</strong></p>
   <strong>🔗 Génération automatique des pipelines CI/CD</strong>
  <ul className="list-disc pl-5">
    <li>Création de pipelines en quelques clics</li>
    <li>Intégration avec GitLab, GitHub, Bitbucket, Azure DevOps</li>
    <li>Gestion simplifiée des versions</li>
  </ul>
  
  <strong>☁️ Choisissez votre environnement d’hébergement</strong>
  <ul className="list-disc pl-5">
    <li>CloudHub 2.0 pour un hébergement managé</li>
    <li>On-Premises pour un contrôle total de votre infrastructure</li>
  </ul>
  
  <strong>📊 Surveillez vos performances en temps réel</strong>
  <ul className="list-disc pl-5">
    <li>Grafana</li>
    <li>ELK (Elastic Stack)</li>
    <li>Datadog</li>
    <li>Splunk</li>
  </ul>
  
  <strong>📦 Gestion avancée des artefacts</strong>
  <ul className="list-disc pl-5">
    {/* <li>Hébergement sécurisé de vos fichiers JAR via :</li> */}
    {/* <li>JFrog Artifactory</li>
    <li>Nexus Repository</li>
  </ul>*/}
  {/* <p>🔥 <strong>Pourquoi adopter notre solution ?</strong> </p>
    ✅ Gain de temps : Moins d’effort manuel, plus de productivité <br/>
    ✅ Sécurité & conformité : Respect des bonnes pratiques DevOps<br/>
    ✅ Scalabilité : Adapté aux petites et grandes entreprises<br/>
    ✅ Interopérabilité : Compatible avec l’écosystème MuleSoft
  
  <p>📢 <strong>Essayez dès maintenant !</strong></p>
  <p>🚀 Démarrez votre premier pipeline dès aujourd’hui et accélérez votre transformation DevOps avec MuleSoft.</p>
  <p>🔗 <strong>Contactez-nous pour une démo ou plus d’informations.</strong></p> */}
{/* </div> */}


        </div>
      </div>
    </section>
  );
}
