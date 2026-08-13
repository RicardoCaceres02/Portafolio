# ⚡ Portafolio Harry Potter — Ricardo

## Cómo abrir

1. Descomprime la carpeta `portafolio-hp`
2. Abre el archivo `index.html` directamente en tu navegador (Chrome, Firefox, Edge)
3. ¡Listo! No necesitas instalar nada ni usar un servidor.

## Archivos incluidos

| Archivo    | Descripción                              |
|------------|------------------------------------------|
| index.html | Estructura principal del portafolio      |
| style.css  | Todos los estilos (tema Harry Potter)    |
| app.js     | Lógica, navegación, proyectos, partículas|
| README.txt | Este archivo                             |

## Personalizar tu información

Abre `index.html` con cualquier editor de texto (Notepad, VS Code, etc.) y busca:

- **Tu nombre** → busca "Ricardo" y reemplaza con tu nombre completo
- **Tu correo** → busca "tu@correo.com"
- **GitHub** → busca "github.com/ricardo"
- **LinkedIn** → busca "linkedin.com/in/ricardo"
- **Casa de Hogwarts** → busca "Gryffindor" para cambiarla
- **Trayectoria** → busca las secciones con clase "tl-item"

## Subir proyectos

1. Haz clic en "Subir Proyecto" en el menú izquierdo
2. Completa el formulario (nombre, descripción, tecnologías)
3. Opcionalmente sube una imagen de portada
4. Haz clic en "⚡ Publicar en Grimorio"

Los proyectos se guardan automáticamente en el navegador (localStorage),
por lo que persistirán aunque cierres y vuelvas a abrir la página.

## Agregar habilidades

Abre `index.html` y busca la sección de habilidades. Cada habilidad tiene esta estructura:

```html
<div class="skill-row">
  <span class="skill-name">Nombre de la habilidad</span>
  <div class="skill-bar-bg">
    <div class="skill-bar-fill" style="width:0%" data-w="85"></div>
  </div>
  <span class="skill-pct">85%</span>
</div>
```

Cambia `data-w="85"` y `85%` por el porcentaje que desees.

## Tecnologías usadas

- HTML5 + CSS3 + JavaScript vanilla (sin frameworks)
- Google Fonts: Cinzel + Inter
- Font Awesome 6 (iconos, via CDN)
- Canvas API (partículas doradas)
- localStorage (persistencia de proyectos)

## Requisitos

- Navegador moderno (Chrome 90+, Firefox 88+, Edge 90+)
- Conexión a internet solo para cargar las fuentes y los iconos
  (si no hay internet, se usan fuentes del sistema igualmente)

---
Creado con ⚡ y magia CSS
