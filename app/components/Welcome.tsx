export function Welcome() {
    return (
        <div class="relative flex flex-col md:flex-row w-full justify-evenly items-center px-8 py-4 top-0 pb-0">
            <div class="absolute inset-0 md:hidden z-0 flex justify-center items-start left-[50%] opacity-60">
                <img
                    src="/img/welcome.webp"
                    alt="Welcome Background"
                    class=" max-w-[200px] object-contain mt-[-160px]"
                />
            </div>
            <div class="md:w-[61%] relative z-10">
                <h1 class="text-4xl font-bold mb-4">Rinconcito Verde</h1>
                <p class="text-lg mb-8">
                    Aunque vivas entre paredes, siempre hay un espacio para hacer crecer algo
                    bonito. En Rinconcito Verde encontrarás todo lo que necesitas para llenar
                    tu hogar de verde y empezar a comer más rico y saludable. Desde macetas y
                    semillitas hasta kits sencillos y muchas otras cositas pensadas para
                    espacios chiquitos con mucho corazón. Cultivar no es cuestión de metros,
                    es cuestión de ganas…
                </p>
            </div>
            <div class="hidden md:flex w-[50%] max-w-[250px] h-[250px] justify-center items-center">
                <img
                    src="/img/welcome.webp"
                    alt="Welcome Image"
                    class="h-[550px] object-contain mt-[-220px]"
                />
            </div>
        </div>
    );
}