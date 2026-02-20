# Documentación Viva - TECHNOULTRA

## 1. Visión del Producto
TECHNOULTRA es una firma de arquitectura digital y crecimiento estratégico. 
La plataforma web debe reflejar solidez, modernidad y confianza, diferenciándose de freelancers y plantillas genéricas. 
El objetivo es convertir visitantes en leads cualificados mediante una experiencia de usuario premium y fluida.

## 2. Stack Tecnológico
- **Frontend**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion
- **Iconos**: React Icons
- **Estado/Lógica**: React Hooks, Context API
- **Formularios**: React Hook Form + Zod

## 3. Arquitectura y Seguridad (Zero Trust/Strict Mode)
- **Validación Estricta**: Todo input de usuario se valida con Zod.
- **Renderizado**: Server Components por defecto para seguridad y SEO.
- **No-Trust Client**: El cliente solo visualiza; la lógica crítica reside en el servidor.
- **Documentación**: Todo cambio se documenta en español.
- **Accesibilidad**: Etiquetas ARIA y navegación semántica.

## 4. Sistema de Diseño (Tokenización)
- **Colores**:
  - `bg-primary`: #F7F8FA
  - `bg-secondary`: #E9EBEF
  - `text-primary`: #1E293B
  - `text-secondary`: #64748B
  - `accent`: #F4A261
- **Tipografía**: Inter / Outfit.

## 5. Decisiones Técnicas Clave
- Uso de **Lenis** para scroll suave premium.
- Integración de **WhatsApp** flotante para conversión directa.
- **Responsive** Mobile-first con enfoque en Touch targets.

## 6. Estado del Proyecto
- [x] Inicialización del repositorio.
- [x] Configuración de Tailwind y Fuentes.
- [x] Implementación de Componentes Core (Navbar, Footer, UI).
- [x] Desarrollo de Secciones (Hero, Stats, Servicios, Metodología, Contacto).
- [ ] Validación final y despliegue.

## 7. Componentes Clave Implementados
- **Hero**: Animaciones Framer Motion + Imagen Aérea.
- **Autoridad**: Contadores CountUp sobre fondo corporativo.
- **Servicios**: Grid con efecto Glassmorphism y Hover.
- **Metodología**: Sistema Ultra de 5 pasos visualizado.
- **WhatsApp**: Botón flotante persistente y animado.
- **Scroll**: Scroll suave gestionado por Lenis.
