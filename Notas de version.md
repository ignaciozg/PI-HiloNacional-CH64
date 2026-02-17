📋 Notas de Version: Hilo Nacional v1.2

🛠️ Sistema y Lógica (JavaScript)

Refactorización de main.js: Se eliminaron 80 líneas de código redundante. Se unificó la lógica en una función maestra runAppLogic() para evitar conflictos de carga.



Carga Inteligente del Navbar: El script ahora detecta automáticamente si debe inyectar el menú (para index.html) o usar el menú existente (para acerca-de y contactenos), evitando errores de "null" en la consola.



Corrección del Toggle Dark Mode: Se solucionó el bug donde el icono (Sol/Luna) no cambiaba visualmente al hacer clic. Se implementó un clonado de nodo para limpiar eventos previos.



Validaciones: Se corrigió la sintaxis en Validaciones.js para asegurar que los mensajes de error del formulario aparezcan correctamente.



🎨 Estilos y Diseño (CSS)

Optimización de Archivos: Se eliminaron más de 150 líneas de código duplicado en acercade.css y contactenos.css. Ahora heredan correctamente las variables globales de main.css.



Corrección de Logo en Dark Mode: Se eliminó el filtro CSS (invert) que oscurecía el logo blanco. Ahora el logo se renderiza con su color original y JavaScript gestiona el cambio de imagen (.svg vs .png).



Variables Globales: Se consolidaron los colores del Modo Oscuro en :root para asegurar consistencia en todas las páginas (fondos, textos y tarjetas).



🧩 Componentes UI (Interfaz de Usuario)

Barra de Búsqueda Unificada:



Se reemplazó el icono de fuente (*) por un SVG en línea para mayor nitidez.*



*Se integró el botón y el input en un solo contenedor con borde redondeado continuo.*



*Se corrigió el color de la lupa para adaptarse automáticamente al texto (currentColor).*



*Tarjetas Interactivas ("Ver más"):*



*Lógica Híbrida: Las tarjetas ahora reaccionan tanto al Hover (vista previa) como al Clic (acción inmediata).*



*Corrección de Colapso: Se solucionó el conflicto donde el texto no se cerraba si el mouse seguía encima. Ahora el botón actúa como un interruptor inmediato.*



*📂 Estructura de Archivos*

*Archivo Faltante: Se creó componentes/navbar.html, necesario para que la página de inicio pudiera cargar el menú.*



*Limpieza HTML: Se eliminaron scripts duplicados en index.html y contenedores vacíos (<div id="footer">) en páginas que ya tenían el footer hardcoded.*

