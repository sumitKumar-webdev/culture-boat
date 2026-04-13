import { pageContent, site } from "../../content/siteData";
import { socialIcons } from "../../component/Custom Icons/social-icons";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full text-white leading-relaxed">
      <div className="relative mt-30 z-30 md:mt-40 text-white w-full px-4 md:px-8 lg:px-16 mb-20 md:mb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="lg:pr-8">
            <h2 className="font-luxury text-3xl md:text-4xl lg:text-6xl mb-8 md:mb-12 leading-tight md:leading-normal tracking-[0.08em] font-light">
              {pageContent.contact.headline}
            </h2>
            <div className="mb-8 md:mb-12">
              <div className="mb-4">
                <h3 className="font-luxury text-lg md:text-xl mb-3 uppercase tracking-[0.14em] text-white/90">
                  {site.office.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  {site.office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              {site.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl"
                  aria-label={link.label}
                >
                  {socialIcons[link.label] ?? (
                    <span className="text-xs text-black">{link.label}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-8">
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs md:text-sm text-white">
                  EMAIL ID:
                </label>
                <input
                  id="email"
                  className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-black bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  type="email"
                  name="email"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-xs md:text-sm text-white">
                  NAME
                </label>
                <input
                  id="name"
                  className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-black bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="name"
                />
              </div>
              <div>
                <label htmlFor="companyName" className="block text-xs md:text-sm text-white">
                  COMPANY NAME
                </label>
                <input
                  id="companyName"
                  className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-black bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="companyName"
                />
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-xs md:text-sm text-white">
                  CONTACT NUMBER
                </label>
                <input
                  id="contactNumber"
                  className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-black bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  type="tel"
                  name="contactNumber"
                />
              </div>
              <div>
                <label htmlFor="designation" className="block text-xs md:text-sm text-white">
                  PROFESSIONAL DESIGNATION
                </label>
                <input
                  id="designation"
                  className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-black bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="designation"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-xs md:text-sm text-white">
                  BUDGET YOU INTEND TO COMMIT TO THE PROJECT
                </label>
                <input
                  id="budget"
                  className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-black bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="budget"
                />
              </div>
              <div>
                <label
                  htmlFor="projectDescription"
                  className="block text-xs md:text-sm text-white"
                >
                  DESCRIBE YOUR PROJECT
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-black bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="font-luxury uppercase tracking-[0.2em] px-6 py-3 md:px-8 md:py-3 text-sm md:text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
