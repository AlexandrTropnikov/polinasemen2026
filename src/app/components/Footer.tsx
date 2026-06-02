import { Heart, Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl font-serif">П</span>
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-3xl font-serif">С</span>
          </div>
          <p className="text-sm opacity-80 mb-6">
            Мы будем рады видеть вас на нашем особенном дне!
          </p>

          {/* {/* Social Links 
          <div className="flex items-center justify-center gap-6 mb-6">
            <a
              href="#"
              className="hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:opacity-70 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="mailto:wedding@example.com"
              className="hover:opacity-70 transition-opacity"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div> */}
        </div>

        <div className="text-center text-sm opacity-60 border-t border-primary-foreground/20 pt-6">
          <p>© 2026 Полина & Семён. С любовью создано для нашего особенного дня.</p>
        </div>
      </div>
    </footer>
  );
}
