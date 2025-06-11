export default function Footer() {
  return (
<footer class="mt-8 py-8 px-4">
  <div
    class=""
  >
    {/* Sección 1: Logo */}
    <div class="flex items-center gap-[1px] flex-shrink-0">
      <img
        class="w-[50px] h-[50px] object-contain"
        src="/img/logo.webp"
        alt="Logo Rinconcito Verde"
      />
      <p
        class="flex flex-col text-[1rem] font-semibold text-green-800 m-0 leading-none"
      >
        Rinconcito
        <span class="text-green-600 font-bold leading-none m-0">Verde</span>
      </p>
    </div>
    {/* Sección 2: Navegación */}
    <nav
      class="flex flex-col md:flex-row gap-2 md:gap-6 text-gray-700 text-sm text-center md:text-left"
    >
      <a href="/" class="hover:text-green-700 transition-colors">Inicio</a>
      <a href="/about" class="hover:text-green-700 transition-colors"
        >Sobre Nosotros</a
      >
      <a href="/contact" class="hover:text-green-700 transition-colors"
        >Contacto</a
      >
      <a href="/privacy" class="hover:text-green-700 transition-colors"
        >Privacidad</a
      >
      <a href="/terms" class="hover:text-green-700 transition-colors"
        >Términos</a
      >
      <a href="/faq" class="hover:text-green-700 transition-colors">FAQ</a>
    </nav>
    {/* Sección 3: Redes y contacto */}
    <div class="flex flex-col items-center md:items-end gap-2">
      <div class="flex gap-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
          class="text-gray-500 hover:text-green-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
            ><path
              d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12"
            ></path></svg
          >
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          class="text-gray-500 hover:text-green-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
            ><path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.98.98-1.263 2.092-1.322 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.342 2.393 1.322 3.373.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.342 3.374-1.323.98-.98 1.263-2.092 1.322-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.342-2.393-1.322-3.373-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
            ></path></svg
          >
        </a>
        <a
          href="mailto:contacto@rinconcitoverde.com"
          aria-label="Email"
          class="text-gray-500 hover:text-green-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
            ><path
              d="M12 13.065L2.4 6.6A2 2 0 0 1 4 4h16a2 2 0 0 1 1.6 2.6l-9.6 6.465zm9.6 1.335l-7.197 4.848a2 2 0 0 1-2.806 0L2.4 14.4V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3.6z"
            ></path></svg
          >
        </a>
      </div>
      <span class="text-xs text-gray-500 mt-2"
        >contacto@rinconcitoverde.com<br />+52 55 1234 5678</span
      >
    </div>
  </div>
  <div class="max-w-5xl mx-auto mt-6 text-center text-gray-600 text-xs">
    <p>© 2025 Rinconcito Verde. Todos los derechos reservados.</p>
    <p class="mt-1">
      Hecho con <span class="text-red-500">❤️</span> por Lucia Nishimiya
    </p>
  </div>
</footer>
)
}