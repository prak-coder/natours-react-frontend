import logoGreen from "../../assets/images/logo-green.png";

export default function Footer() {
  return (
    <footer className="bg-white px-16 py-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-100 mt-auto w-full max-w-7xl mx-auto">
      {/* Left Branding Group Block */}
      <div className="flex items-center justify-center mb-6 md:mb-0">
        <img
          src={logoGreen}
          alt="Natours logo"
          style={{ height: "2rem", width: "auto", display: "block" }}
          className="object-contain"
        />
      </div>

      {/* Right Navigation & Attribution Block */}
      <div className="flex flex-col items-center md:items-end space-y-3">
        {/* Navigation Links Row List */}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-natours-grey-dark-1 font-light">
          <li>
            <a href="#" className="hover:text-natours-green transition-colors">
              About us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-natours-green transition-colors">
              Download apps
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-natours-green transition-colors">
              Become a guide
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-natours-green transition-colors">
              Careers
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-natours-green transition-colors">
              Contact
            </a>
          </li>
        </ul>

        {/* Dynamic Legal Copyright Footer Subtext */}
        <p className="text-xs text-natours-grey-dark-2 font-light">
          &copy; {new Date().getFullYear()} by Jonas Schmedtmann.
        </p>
      </div>
    </footer>
  );
}
