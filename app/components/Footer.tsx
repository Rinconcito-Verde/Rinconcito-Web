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
  </div>
  <div class="max-w-5xl mx-auto mt-6 text-center text-gray-600 text-xs">
    <p>© 2025 Rinconcito Verde.</p>
    <p class="mt-1">
      Hecho con <span class="text-red-500">❤️</span> por Lucia Nishimiya
    </p>
  </div>
</footer>
)
}