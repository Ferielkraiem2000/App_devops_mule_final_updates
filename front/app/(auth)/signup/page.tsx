"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';  // Import the necessary styles
import Logo from "../../../components/ui/logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";
const metadata = {
  title: "Sign Up - Open PRO",
  description: "Page description",
};

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phoneNumber: "",
    workEmail: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePhoneChange = (value: any) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (!formData.name || !formData.companyName || !formData.workEmail || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await axios.post("https://devopsmule.cweave.fr/api/signup", formData);
      
      // Display success message
      setSuccessMessage("Utilisateur créé avec succès !");
      setErrorMessage("");
      
      // Log the user in by sending a signin request right after signup
      const signinResponse = await fetch("https://devopsmule.cweave.fr/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workEmail: formData.workEmail,
          password: formData.password,
        }),
      });
  
      const signinData = await signinResponse.json();
  
      if (!signinResponse.ok) {
        setErrorMessage(signinData.message || "An error occurred");
      } else {
        const token = signinData.token;
        
        if (token) {
          localStorage.setItem('token', token);
  
          // Fetch user profile to get customerId
          const profileResponse = await fetch("https://devopsmule.cweave.fr/api/profile", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
  
          const profileData = await profileResponse.json();
          const customerId = profileData._id;
          localStorage.setItem('customerId', customerId);
  
          // Redirect to the appropriate page based on the user role
          if (formData.workEmail === "admin@admin.com") {
            window.location.href = "/orders";
          } else {
            window.location.href = "/bookOrder";
          }
        }
      }
    } catch (error) {
      setErrorMessage("Erreur serveur, veuillez réessayer.");
      console.log(error);
    }
  };
  
  return (
    <div className="min-h-screen">

    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="py-8 md:py-17">
      <div className="pb-12 text-center">
          <h1  className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.400),theme(colors.blue.500),theme(colors.gray.600),theme(colors.blue.600),theme(colors.gray.400))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4.5xl">
          Créer un compte
            </h1>
</div>        
       
          <form className="mx-auto max-w-[400px] shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-blue-900" htmlFor="name">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-input w-full bg-white text-black"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-blue-900" htmlFor="companyName">
                  Nom de l'entreprise <span className="text-red-500">*</span>
                </label>
                <input
                  id="companyName"
                  type="text"
                  className="form-input w-full bg-white text-black"
                  placeholder="Le nom de votre entreprise"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-blue-900" htmlFor="phoneNumber">
                  Numéro de téléphone <span className="text-red-500">*</span>
                </label>
                <input
                id="phoneNumber"
                type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-input w-full bg-white text-black"
                  placeholder="Votre numéro"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-blue-900" htmlFor="workEmail">
                  Email professionnel<span className="text-red-500">*</span>
                </label>
                <input
                  id="workEmail"
                  type="email"
                  className="form-input w-full bg-white text-black"
                  placeholder="Votre email professionnel"
                  value={formData.workEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900" htmlFor="password">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full bg-white text-black"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <button
                className="btn w-full bg-gradient-to-t bg-[rgb(82,146,158)] bg-[length:100%_100%] bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                type="submit"
              >
                S'inscrire
              </button>
              {errorMessage && (
                <div className="text-center text-sm text-red-500 mt-2">{errorMessage}</div>
              )}
              {successMessage && (
  <div className="text-center text-sm text-teal-600 rounded-lg p-2 mt-2">
  {successMessage}
</div>)}
            
     </div>
          </form>

          <div className="mt-6 text-center text-sm text-blue-900">
            Vous avez déjà un compte ?{" "}
            <Link className="font-medium  text-teal-500" href="/signin">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
          <section className="flex flex-col items-center justify-between border-t py-6 px-2 sm:px-10 sm:flex-row">
          <div className="mb-4 sm:mb-2">
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
