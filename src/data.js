export const asset = (path) => encodeURI(import.meta.env.BASE_URL + path);

export const contacto = {
  email: 'lucianadanizapaz@hotmail.com',
  github: 'https://github.com/LuPaz-GH',
  linkedin: 'https://www.linkedin.com/in/daniza-paz-67920a415',
  whatsapp: 'https://wa.me/5493815192208',
};

/* Servicios externos. Mientras estén vacíos, no se muestra ni se carga nada. */
export const config = {
  // Estadísticas de visitas con Umami (gratis, sin cookies): https://cloud.umami.is
  // Crear el sitio en Umami y pegar acá su "Website ID".
  umamiWebsiteId: '',
  // Link para agendar llamadas con Calendly (gratis): https://calendly.com
  // Ej.: 'https://calendly.com/tu-usuario/15min'
  calendly: '',
};

export const whatsappMsg = (texto) => `${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;

/* ------------------------------------------------------------------
   Datos que no cambian con el idioma (links, imágenes, colores, stack)
   ------------------------------------------------------------------ */

const badgesExperiencia = [
  [['HTML', '#E34F26'], ['CSS', '#2e8bf0'], ['JavaScript', '#F7DF1E'], ['React', '#61DAFB'], ['Vite', '#a78bff']],
  [['Node.js', '#5FBF4A'], ['Express', '#d6d6e0'], ['C#', '#b18cff'], ['MySQL', '#4FA3D1'], ['MongoDB', '#47A248']],
  [['UTN-FRT', '#3D8BD9'], ['Git', '#F05033'], ['GitHub', '#e8e8f0'], ['VS Code', '#2E9BF0']],
];

const proyectosBase = [
  {
    id: 'mujeres',
    nombre: 'Mujeres en Red',
    categoria: 1,
    cliente: true,
    destacado: true,
    imagen: 'Imagenes/proyectos/mujeres-en-red.jpg',
    dominio: 'mujeresenred.com.ar',
    demo: 'https://mujeresenred.com.ar',
    repo: 'https://github.com/LuPaz-GH/Mujeres_en_red',
    stack: ['React', 'Vite', 'Three.js', 'WordPress API'],
  },
  {
    id: 'syncra',
    nombre: 'Syncra Studios',
    categoria: 1,
    cliente: true,
    imagen: 'Imagenes/proyectos/syncra.jpg',
    dominio: 'syncrastudios.com.ar',
    demo: 'https://syncrastudios.com.ar',
    repo: 'https://github.com/LuPaz-GH/SYNCRAstudios',
    stack: ['React', 'Vite', 'CSS'],
  },
  {
    id: 'malfi',
    nombre: 'Malfi Veterinaria',
    categoria: 2,
    imagen: 'Imagenes/proyectos/malfi.jpg',
    dominio: 'malfi-veterinaria.netlify.app',
    demo: 'https://malfi-veterinaria.netlify.app/login',
    // tiene botón "Ver demo sin registrarse" (solo lectura): se destaca en la tarjeta
    demoAbierta: true,
    repo: 'https://github.com/LuPaz-GH/ProyectoFinal-fullstack',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
  },
  {
    id: 'cainzo',
    nombre: 'Panificadora Cainzo',
    categoria: 2,
    imagen: 'Imagenes/proyectos/cainzo.jpg',
    dominio: 'panaderiacainzo.netlify.app',
    demo: 'https://panaderiacainzo.netlify.app',
    repo: 'https://github.com/LuPaz-GH/Panaderia_Cainzo_PC',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Chart.js'],
  },
  {
    id: 'margarita',
    nombre: 'Margarita Clothes',
    categoria: 3,
    imagen: 'Imagenes/proyectos/margarita.jpg',
    dominio: 'margaritaclothes.netlify.app',
    demo: 'https://margaritaclothes.netlify.app/login',
    demoAbierta: true,
    // usuario demo con rol Admin (puede editar: se restaura con seedDemoUser.js y seed)
    credenciales: { email: 'demo@margarita.com', clave: 'Demo1234' },
    repo: 'https://github.com/LuPaz-GH/Margarita_Clothes',
    stack: ['React', 'Node.js', 'Express', 'Prisma', 'MySQL', 'JWT'],
  },
];

const iconosServicios = ['globe', 'rocket', 'chart', 'cart'];
const iconosEnfoque = ['search', 'layers', 'db', 'check', 'doc'];

/* ------------------------------------------------------------------
   Textos por idioma
   ------------------------------------------------------------------ */

const es = {
  meta: { title: 'Luciana Daniza Paz | Desarrolladora Web', lang: 'es' },
  skip: 'Saltar al contenido',
  cv: 'Documentos/CV_Luciana_Daniza_Paz.pdf',
  nav: { inicio: 'Inicio', 'sobre-mi': 'Sobre mí', servicios: 'Servicios', proyectos: 'Proyectos', experiencia: 'Experiencia', contacto: 'Contacto', menu: 'Abrir menú' },

  hero: {
    foto: 'Foto de Luciana Daniza Paz',
    rolesSr: 'Desarrolladora web y de software: sitios web, sistemas de gestión a medida. React, Node.js, C# y MySQL.',
    hola: 'Hola, soy',
    disponible: 'Disponible para trabajar',
    busco: 'Frontend / Full Stack Jr · Remoto o híbrido',
    roles: ['Desarrolladora web y de software', 'Sitios web para marcas y organizaciones', 'Sistemas de gestión a medida', 'React · Node.js · C# · MySQL'],
    desc: ['Programadora egresada de la UTN. Creo ', 'sitios web', ' y ', 'sistemas a medida', ' para marcas, emprendimientos y organizaciones.'],
    verTrabajos: 'Ver trabajos',
    cv: 'Descargar CV',
    bajar: 'Bajar a Sobre mí',
  },

  about: {
    tag: 'sobre mí',
    title: 'Conoce a Lu',
    text: [
      'Soy programadora egresada de la ', 'UTN-FRT', ' y hoy trabajo como ', 'desarrolladora web',
      ' en la Fundación Mujeres en Red, donde creé los sitios de la fundación y de Syncra Studios. Me apasiona transformar ideas en ',
      'software real', ': desde sitios web modernos hasta sistemas de gestión y aplicaciones de escritorio. Si se puede imaginar, se puede programar.',
    ],
    code: {
      variable: 'luciana',
      rol: ['rol', 'Desarrolladora Web'],
      titulo: ['titulo', 'Téc. Univ. en Programación · UTN'],
      trabajo: ['trabajaEn', 'Fundación Mujeres en Red'],
      ubicacion: ['ubicacion', 'Tucumán, Argentina'],
      lema: ['lema', 'Si se puede imaginar, se puede programar'],
    },
    cards: [
      { icono: 'laptop', titulo: 'Frontend & Diseño', texto: 'Interfaces modernas, responsivas y animadas con React y Vite. Sitios rápidos que se ven bien en cualquier pantalla.' },
      { icono: 'server', titulo: 'Backend & Datos', texto: 'APIs REST con Node.js y Express, autenticación y bases de datos relacionales y NoSQL. Aplicaciones de escritorio en C#.' },
      { icono: 'grad', titulo: 'Formación', texto: 'Egresada de la Tecnicatura Universitaria en Programación (UTN-FRT). Inglés intermedio con foco en lectura técnica.' },
    ],
  },

  services: {
    tag: 'servicios',
    title: '¿Qué puedo hacer por vos?',
    subtitle: 'Soluciones digitales a medida para tu marca, emprendimiento u organización',
    consultar: 'Consultar',
    mensaje: (s) => `Hola Luciana, quiero consultar por: ${s}.`,
    items: [
      { titulo: 'Sitios web institucionales', texto: 'Para fundaciones, empresas y profesionales. Diseño a medida, animaciones y contenido fácil de actualizar.', ejemplo: 'Ej.: Mujeres en Red, Syncra Studios' },
      { titulo: 'Landing pages', texto: 'Una página enfocada en vender un producto o servicio, con botón de WhatsApp y formulario de contacto.', ejemplo: 'Ideal para emprendimientos' },
      { titulo: 'Sistemas de gestión', texto: 'Turnos, clientes, stock, ventas y reportes en un solo lugar, con usuarios y permisos por rol.', ejemplo: 'Ej.: Malfi Veterinaria, Cainzo' },
      { titulo: 'Tiendas online', texto: 'Catálogo por categorías, carrito y panel para cargar productos e imágenes.', ejemplo: 'Ej.: Margarita Clothes' },
    ],
  },

  projects: {
    tag: 'proyectos',
    title: 'Trabajos realizados',
    subtitle: 'Sitios y sistemas en producción, para clientes reales y proyectos propios',
    categorias: ['Todos', 'Sitios web', 'Sistemas de gestión', 'E-commerce'],
    filtrar: 'Filtrar proyectos por categoría',
    cliente: 'Cliente real',
    construccion: 'En construcción',
    proximamente: 'Próximamente',
    verSitio: 'Ver sitio',
    verVivo: 'Ver sitio en vivo',
    demoTag: 'Demo sin registro',
    probarDemo: 'Probar demo',
    accesoDemo: 'Acceso demo',
    copiar: 'Copiar',
    copiado: '¡Copiado!',
    codigo: 'Código',
    caso: 'Caso de estudio',
    captura: 'Captura de',
    abrir: 'Abrir',
    ctaTexto: '¿Tenés una idea parecida para tu negocio?',
    ctaBoton: 'Pedir presupuesto',
    ctaGithub: 'Más en GitHub',
    items: {
      mujeres: {
        resumen: 'Nuevo sitio institucional de la Fundación Mujeres en Red, que acompaña a mujeres del NOA en su desarrollo personal, profesional y comunitario.',
        puntos: ['Diseño y desarrollo completo, con una flor 3D animada', 'El equipo sigue cargando contenido desde WordPress', 'Programas, eventos, blog, catálogo y donaciones'],
      },
      syncra: {
        resumen: 'Web del servicio de subtitulado inclusivo y accesibilidad de Mujeres en Red.',
        puntos: ['Sitio accesible con widget de accesibilidad', 'Pedido de cotización y WhatsApp directo'],
      },
      malfi: {
        resumen: 'Sistema integral para una veterinaria: clientes, turnos, historial clínico, petshop, caja y reportes.',
        puntos: ['Acceso por rol: dueña/o, veterinario y recepción', 'Reportes en PDF y Excel, gráficos y auditoría', 'Demo abierta para recorrerlo sin registrarse'],
      },
      cainzo: {
        resumen: 'Sistema de gestión para una panadería: productos, ventas y estadísticas del negocio.',
        puntos: ['Login seguro y API REST propia', 'Panel con gráficos de ventas'],
      },
      margarita: {
        resumen: 'Tienda online de ropa para toda la familia, con catálogo público y panel de administración.',
        puntos: ['Catálogo con búsqueda y filtros, carrito y checkout', 'Panel con roles: cliente, empleado y admin', 'Gestión de productos, imágenes y estados de pedidos', 'Demo abierta para probar el panel de administración'],
      },
    },
  },

  casos: {
    cerrar: 'Cerrar',
    mujeres: {
      bajada: 'Rediseño del sitio institucional de una fundación del NOA',
      secciones: [
        ['El contexto', 'La Fundación Mujeres en Red tenía un sitio hecho con una plantilla de WordPress. Necesitaba una imagen más actual y propia, sin perder la forma en que el equipo ya cargaba notas, proyectos y emprendimientos.'],
        ['Mi rol', 'Como responsable del área de programación, me encargué del diseño y el desarrollo completo del nuevo frontend y de su publicación en el hosting de la fundación.'],
        ['La solución', 'Construí el sitio en React con Vite y usé WordPress como "headless": el diseño es nuevo, pero el contenido (blog, portfolio, catálogo y formulario de contacto) sigue saliendo del panel de WordPress que el equipo ya conoce. Sumé una flor 3D animada con Three.js, inspirada en el logo.'],
        ['Secciones', 'Inicio, Quiénes somos, Qué hacemos (programas y proyectos), Eventos, Blog, Catálogo de emprendedoras, Contacto y Donar, con distintos medios de donación (Mercado Pago, QR, transferencia y PayPal).'],
        ['Decisiones técnicas', 'Separé los datos que se editan a mano (equipo, redes, donaciones) de los que vienen de la API, para que mantener el sitio sea simple. Las credenciales de pago quedan solo en el servidor, nunca en el frontend.'],
        ['Resultado', 'El sitio nuevo ya está publicado en mujeresenred.com.ar. Como próximo paso, se va a integrar Mercado Pago Checkout Pro para donar directamente desde la web.'],
      ],
    },
    malfi: {
      bajada: 'Sistema full stack para la gestión de una veterinaria',
      secciones: [
        ['El problema', 'Una veterinaria necesita tener en un solo lugar los datos de las mascotas y sus dueños, los turnos, los historiales médicos y la información del negocio.'],
        ['La solución', 'Un sistema web con ingreso según el rol (dueña/o, veterinario o recepción), donde cada persona ve y hace solo lo que le corresponde.'],
        ['Funcionalidades', 'Clientes y mascotas, agenda de turnos, historial clínico, petshop y alimentos, caja del día, gestión de empleados y auditoría. Panel de reportes con gráficos de ventas, exportación a PDF y Excel, y envío de emails.'],
        ['Demo para visitantes', 'Sumé un botón "Ver demo sin registrarse" para que reclutadores y clientes recorran todo el sistema como dueña/o. Es de solo lectura: el backend bloquea cualquier cambio hecho desde la demo, así los datos no se alteran.'],
        ['Arquitectura', 'Frontend en React 19 con Vite, React Router, React Hook Form y Recharts, publicado en Netlify. API REST en Node.js y Express publicada en Render, base de datos MySQL, autenticación con JWT y contraseñas encriptadas con Bcrypt.'],
        ['Contexto', 'Proyecto final de la Tecnicatura Universitaria en Programación (UTN-FRT).'],
      ],
    },
  },

  timeline: {
    tag: 'experiencia',
    title: 'Trayectoria',
    subtitle: 'Dónde trabajé y estudié',
    items: [
      { fecha: 'Sep 2026 — Actualidad', titulo: 'Desarrolladora Web y Community Manager', lugar: 'Fundación Mujeres en Red', actual: true,
        puntos: ['Responsable del área de programación de la fundación.', 'Diseño y desarrollo de los sitios de Mujeres en Red y Syncra Studios.', 'Planificación y creación de contenido para redes sociales.'] },
      { fecha: 'Jun 2026', titulo: 'Tecnicatura Universitaria en Programación', lugar: 'UTN — Facultad Regional Tucumán · Egresada',
        puntos: ['C#, JavaScript, React, Node.js, MySQL y MongoDB.'] },
      { fecha: 'Nov 2021 — May 2023', titulo: 'Operadora de Call Center', lugar: 'Teleperformance',
        puntos: ['Atención a clientes, resolución de consultas y reclamos, trabajo con métricas de calidad.'] },
      { fecha: 'Abr 2021 — Nov 2021', titulo: 'Atención al Cliente / Ventas', lugar: 'Drugstore',
        puntos: ['Atención al público, caja y control de stock.'] },
    ],
  },

  stack: {
    tag: 'stack',
    title: 'Tecnologías que uso',
    subtitle: 'Las herramientas con las que trabajo',
    grupos: [
      { titulo: 'Frontend', items: 'HTML · CSS · JavaScript · React · Vite' },
      { titulo: 'Backend & Datos', items: 'Node.js · Express · C# · MySQL · MongoDB' },
      { titulo: 'Herramientas', items: 'Git · GitHub · Visual Studio Code · Visual Studio' },
    ],
  },

  approach: {
    tag: 'proceso',
    title: 'Cómo trabajo',
    subtitle: 'De la idea al sitio publicado, paso a paso',
    items: [
      { titulo: 'Escucho y analizo', texto: 'Entiendo tu negocio y qué necesitás antes de escribir una línea de código.' },
      { titulo: 'Diseño la solución', texto: 'Propongo estructura, diseño y tecnología adecuados para tu proyecto.' },
      { titulo: 'Desarrollo', texto: 'Construyo web, sistema y base de datos, mostrándote avances.' },
      { titulo: 'Pruebo', texto: 'Reviso que todo funcione bien en celular, tablet y computadora.' },
      { titulo: 'Entrego y acompaño', texto: 'Publico el sitio, te explico cómo usarlo y quedo disponible para ajustes.' },
    ],
  },

  testimonios: {
    tag: 'testimonios',
    title: 'Lo que dicen de mi trabajo',
    // Agregar solo testimonios reales, con permiso. Ejemplo de formato:
    // { texto: '...', nombre: 'Nombre Apellido', cargo: 'Presidenta', empresa: 'Fundación Mujeres en Red' },
    items: [],
  },

  faq: {
    tag: 'preguntas',
    title: 'Preguntas frecuentes',
    subtitle: 'Lo que más me consultan antes de empezar',
    items: [
      ['¿Cuánto tarda en estar listo un sitio?', 'Depende del tamaño: una landing page lleva menos tiempo que un sitio con varias secciones o un sistema de gestión. Antes de empezar te paso un cronograma con fechas para cada etapa.'],
      ['¿Cuánto cuesta?', 'Cada proyecto es distinto, así que el presupuesto se arma a medida según lo que necesites. Escribime contándome tu idea y te respondo con una propuesta sin compromiso.'],
      ['¿Incluye dominio y hosting?', 'Te asesoro para elegirlos y contratarlos a tu nombre, así quedan siempre bajo tu control, y me encargo de toda la configuración y la publicación.'],
      ['¿Voy a poder modificar el contenido yo?', 'Sí. Si lo necesitás, el sitio puede tener un panel para que cargues textos, fotos o productos sin tocar código, como en el sitio de Mujeres en Red.'],
      ['¿Qué pasa si quiero cambios después de publicar?', 'Antes de la entrega hay una etapa de revisión para ajustar detalles. Después podemos acordar cambios puntuales o un mantenimiento mensual.'],
      ['¿Trabajás con clientes de otras ciudades?', 'Sí. Estoy en Tucumán, pero todo el proceso se puede hacer a distancia por videollamada, WhatsApp y email.'],
    ],
  },

  contact: {
    tag: 'contacto',
    title: '¡Hablemos!',
    subtitle: 'Contame tu idea o tu propuesta y te respondo a la brevedad.',
    empresasTitulo: '¿Sos de una empresa?',
    empresasTexto: 'Busco mi próximo puesto como desarrolladora Frontend o Full Stack Jr.',
    clientesTitulo: '¿Tenés un proyecto?',
    clientesTexto: 'Te paso una propuesta y presupuesto sin compromiso.',
    agendar: 'Agendá una llamada de 15 min',
    agendarSub: 'Elegí el día y horario que te quede cómodo',
    whatsapp: 'WhatsApp',
    whatsappMsg: 'Hola Luciana, vi tu portfolio y quiero consultarte por un proyecto.',
    linkedin: 'LinkedIn',
    form: {
      nombre: 'Nombre',
      email: 'Email',
      tipo: 'Motivo',
      tipos: ['Quiero un sitio o sistema', 'Propuesta laboral', 'Otro'],
      mensaje: 'Mensaje',
      placeholder: 'Contame qué necesitás…',
      enviar: 'Enviar mensaje',
      enviando: 'Enviando…',
      ok: '¡Gracias! Recibí tu mensaje y te respondo pronto.',
      error: 'No se pudo enviar. Probá de nuevo o escribime por WhatsApp.',
      dev: 'Modo local: el formulario envía mensajes recién cuando el sitio está publicado en Netlify.',
    },
  },

  footer: { texto: ['Aprendo y creo todos los días.', 'Creemos un proyecto juntos.'], derechos: 'Creado por Luciana Daniza Paz © 2026 · hecho con React' },
  whatsappAria: 'Escribime por WhatsApp',
};

const en = {
  meta: { title: 'Luciana Daniza Paz | Web Developer', lang: 'en' },
  skip: 'Skip to content',
  cv: 'Documentos/Resume_Luciana_Daniza_Paz_EN.pdf',
  nav: { inicio: 'Home', 'sobre-mi': 'About', servicios: 'Services', proyectos: 'Projects', experiencia: 'Experience', contacto: 'Contact', menu: 'Open menu' },

  hero: {
    foto: 'Photo of Luciana Daniza Paz',
    rolesSr: 'Web and software developer: websites and custom management systems. React, Node.js, C# and MySQL.',
    hola: "Hi, I'm",
    disponible: 'Open to work',
    busco: 'Junior Frontend / Full Stack · Remote or hybrid',
    roles: ['Web & software developer', 'Websites for brands and organizations', 'Custom management systems', 'React · Node.js · C# · MySQL'],
    desc: ['Programmer graduated from UTN. I build ', 'websites', ' and ', 'custom systems', ' for brands, small businesses and organizations.'],
    verTrabajos: 'See my work',
    cv: 'Download résumé',
    bajar: 'Scroll to About',
  },

  about: {
    tag: 'about',
    title: 'Meet Lu',
    text: [
      "I'm a programmer graduated from ", 'UTN-FRT', ' and I currently work as a ', 'web developer',
      " at Fundación Mujeres en Red, where I built the foundation's website and Syncra Studios' website. I love turning ideas into ",
      'real software', ': from modern websites to management systems and desktop applications. If you can imagine it, you can code it.',
    ],
    code: {
      variable: 'luciana',
      rol: ['role', 'Web Developer'],
      titulo: ['degree', 'Associate Degree in Programming · UTN'],
      trabajo: ['worksAt', 'Fundación Mujeres en Red'],
      ubicacion: ['location', 'Tucumán, Argentina'],
      lema: ['motto', 'If you can imagine it, you can code it'],
    },
    cards: [
      { icono: 'laptop', titulo: 'Frontend & Design', texto: 'Modern, responsive and animated interfaces with React and Vite. Fast websites that look great on any screen.' },
      { icono: 'server', titulo: 'Backend & Data', texto: 'REST APIs with Node.js and Express, authentication, and relational and NoSQL databases. Desktop applications in C#.' },
      { icono: 'grad', titulo: 'Education', texto: 'Associate Degree in Programming (UTN-FRT). Intermediate English, focused on technical reading.' },
    ],
  },

  services: {
    tag: 'services',
    title: 'What can I do for you?',
    subtitle: 'Custom digital solutions for your brand, business or organization',
    consultar: 'Ask about it',
    mensaje: (s) => `Hi Luciana, I'd like to ask about: ${s}.`,
    items: [
      { titulo: 'Institutional websites', texto: 'For foundations, companies and professionals. Custom design, animations and easy-to-update content.', ejemplo: 'E.g. Mujeres en Red, Syncra Studios' },
      { titulo: 'Landing pages', texto: 'A single page focused on selling a product or service, with a WhatsApp button and contact form.', ejemplo: 'Great for small businesses' },
      { titulo: 'Management systems', texto: 'Appointments, clients, stock, sales and reports in one place, with users and role-based permissions.', ejemplo: 'E.g. Malfi Veterinaria, Cainzo' },
      { titulo: 'Online stores', texto: 'Catalog by category, shopping cart and an admin panel to upload products and images.', ejemplo: 'E.g. Margarita Clothes' },
    ],
  },

  projects: {
    tag: 'projects',
    title: 'Selected work',
    subtitle: 'Live websites and systems, for real clients and personal projects',
    categorias: ['All', 'Websites', 'Management systems', 'E-commerce'],
    filtrar: 'Filter projects by category',
    cliente: 'Real client',
    construccion: 'Under construction',
    proximamente: 'Coming soon',
    verSitio: 'Visit site',
    verVivo: 'Visit live site',
    demoTag: 'No sign-up demo',
    probarDemo: 'Try the demo',
    accesoDemo: 'Demo login',
    copiar: 'Copy',
    copiado: 'Copied!',
    codigo: 'Code',
    caso: 'Case study',
    captura: 'Screenshot of',
    abrir: 'Open',
    ctaTexto: 'Have a similar idea for your business?',
    ctaBoton: 'Get a quote',
    ctaGithub: 'More on GitHub',
    items: {
      mujeres: {
        resumen: 'New institutional website for Fundación Mujeres en Red, a foundation supporting women in northern Argentina in their personal, professional and community growth.',
        puntos: ['Full design and development, with an animated 3D flower', 'The team keeps publishing content from WordPress', 'Programs, events, blog, catalog and donations'],
      },
      syncra: {
        resumen: "Website for Mujeres en Red's inclusive captioning and accessibility service.",
        puntos: ['Accessible site with an accessibility widget', 'Quote requests and direct WhatsApp contact'],
      },
      malfi: {
        resumen: 'All-in-one system for a veterinary clinic: clients, appointments, medical records, pet shop, cash register and reports.',
        puntos: ['Role-based access: owner, vet and front desk', 'PDF and Excel reports, charts and audit log', 'Open demo you can explore without signing up'],
      },
      cainzo: {
        resumen: 'Management system for a bakery: products, sales and business statistics.',
        puntos: ['Secure login and custom REST API', 'Dashboard with sales charts'],
      },
      margarita: {
        resumen: 'Online clothing store for the whole family, with a public catalog and an admin panel.',
        puntos: ['Catalog with search and filters, cart and checkout', 'Role-based panel: customer, staff and admin', 'Product, image and order status management', 'Open demo to try the admin panel'],
      },
    },
  },

  casos: {
    cerrar: 'Close',
    mujeres: {
      bajada: "Redesign of a foundation's institutional website",
      secciones: [
        ['Context', "Fundación Mujeres en Red had a website built on a WordPress theme. They needed a more modern, distinctive look without changing the way the team already published news, projects and the entrepreneurs' catalog."],
        ['My role', "As head of the foundation's programming area, I handled the full design and development of the new frontend and its deployment to the foundation's hosting."],
        ['The solution', 'I built the site with React and Vite and used WordPress as a headless CMS: the design is brand new, but the content (blog, portfolio, catalog and contact form) still comes from the WordPress panel the team already knows. I added an animated 3D flower with Three.js, inspired by the logo.'],
        ['Sections', "Home, About us, What we do (programs and projects), Events, Blog, Entrepreneurs' catalog, Contact and Donate, with several payment options (Mercado Pago, QR, bank transfer and PayPal)."],
        ['Technical decisions', 'I separated hand-edited data (team, social links, donations) from API data to keep the site easy to maintain. Payment credentials live only on the server, never in the frontend.'],
        ['Outcome', 'The new site is live at mujeresenred.com.ar. The next step is integrating Mercado Pago Checkout Pro so people can donate directly from the site.'],
      ],
    },
    malfi: {
      bajada: 'Full-stack system to manage a veterinary clinic',
      secciones: [
        ['The problem', "A veterinary clinic needs pets' and owners' data, appointments, medical records and business information all in one place."],
        ['The solution', 'A web system with role-based login (owner, vet or front desk), where each person only sees and does what their role allows.'],
        ['Features', 'Clients and pets, appointment calendar, medical records, pet shop and pet food, daily cash register, staff management and audit log. Reports dashboard with sales charts, PDF and Excel export, and email notifications.'],
        ['Demo for visitors', 'I added a "View demo without signing up" button so recruiters and clients can explore the whole system as the owner. It is read-only: the backend blocks any change made from the demo, so the data stays intact.'],
        ['Architecture', 'React 19 frontend with Vite, React Router, React Hook Form and Recharts, deployed on Netlify. REST API with Node.js and Express deployed on Render, MySQL database, JWT authentication and Bcrypt-hashed passwords.'],
        ['Context', 'Final project for the Associate Degree in Programming (UTN-FRT).'],
      ],
    },
  },

  timeline: {
    tag: 'experience',
    title: 'Experience',
    subtitle: 'Where I have worked and studied',
    items: [
      { fecha: 'Sep 2026 — Present', titulo: 'Web Developer & Community Manager', lugar: 'Fundación Mujeres en Red', actual: true,
        puntos: ["Lead the foundation's programming area.", 'Designed and developed the Mujeres en Red and Syncra Studios websites.', 'Plan and create social media content.'] },
      { fecha: 'Jun 2026', titulo: 'Associate Degree in Programming', lugar: 'UTN — Facultad Regional Tucumán · Graduated',
        puntos: ['C#, JavaScript, React, Node.js, MySQL and MongoDB.'] },
      { fecha: 'Nov 2021 — May 2023', titulo: 'Call Center Agent', lugar: 'Teleperformance',
        puntos: ['Resolved customer inquiries and complaints, meeting quality metrics.'] },
      { fecha: 'Apr 2021 — Nov 2021', titulo: 'Sales & Customer Service Associate', lugar: 'Convenience Store',
        puntos: ['Customer service, cash register and stock control.'] },
    ],
  },

  stack: {
    tag: 'stack',
    title: 'Tech I use',
    subtitle: 'The tools I work with',
    grupos: [
      { titulo: 'Frontend', items: 'HTML · CSS · JavaScript · React · Vite' },
      { titulo: 'Backend & Data', items: 'Node.js · Express · C# · MySQL · MongoDB' },
      { titulo: 'Tools', items: 'Git · GitHub · Visual Studio Code · Visual Studio' },
    ],
  },

  approach: {
    tag: 'process',
    title: 'How I work',
    subtitle: 'From idea to live website, step by step',
    items: [
      { titulo: 'Listen & analyze', texto: 'I get to know your business and what you need before writing a single line of code.' },
      { titulo: 'Design the solution', texto: 'I propose the right structure, design and technology for your project.' },
      { titulo: 'Build', texto: 'I develop the website, system and database, sharing progress along the way.' },
      { titulo: 'Test', texto: 'I make sure everything works on phones, tablets and computers.' },
      { titulo: 'Launch & support', texto: 'I publish the site, show you how to use it and stay available for adjustments.' },
    ],
  },

  testimonios: {
    tag: 'testimonials',
    title: 'What people say about my work',
    items: [],
  },

  faq: {
    tag: 'faq',
    title: 'Frequently asked questions',
    subtitle: 'What people usually ask before we start',
    items: [
      ['How long does a website take?', 'It depends on the size: a landing page takes less time than a multi-section site or a management system. Before we start, I share a timeline with dates for each stage.'],
      ['How much does it cost?', 'Every project is different, so I prepare a custom quote based on what you need. Tell me about your idea and I will send you a no-obligation proposal.'],
      ['Are domain and hosting included?', "I help you choose them and register them in your name, so they always stay under your control, and I take care of all the setup and deployment."],
      ['Will I be able to edit the content myself?', 'Yes. If you need it, the site can include a panel to update text, photos or products without touching code, like the Mujeres en Red website.'],
      ['What if I want changes after launch?', 'Before delivery there is a review stage to fine-tune details. After that, we can agree on one-off changes or monthly maintenance.'],
      ['Do you work with clients in other cities or countries?', "Yes. I'm based in Tucumán, Argentina, but the whole process can be done remotely via video calls, WhatsApp and email."],
    ],
  },

  contact: {
    tag: 'contact',
    title: "Let's talk!",
    subtitle: 'Tell me about your idea or your offer and I will get back to you soon.',
    empresasTitulo: 'Hiring?',
    empresasTexto: "I'm looking for my next role as a Junior Frontend or Full Stack developer.",
    clientesTitulo: 'Have a project?',
    clientesTexto: "I'll send you a no-obligation proposal and quote.",
    agendar: 'Book a 15-min call',
    agendarSub: 'Pick a day and time that works for you',
    whatsapp: 'WhatsApp',
    whatsappMsg: "Hi Luciana, I saw your portfolio and I'd like to talk about a project.",
    linkedin: 'LinkedIn',
    form: {
      nombre: 'Name',
      email: 'Email',
      tipo: 'Reason',
      tipos: ['I need a website or system', 'Job opportunity', 'Other'],
      mensaje: 'Message',
      placeholder: 'Tell me what you need…',
      enviar: 'Send message',
      enviando: 'Sending…',
      ok: 'Thanks! I got your message and will reply soon.',
      error: "Couldn't send it. Please try again or message me on WhatsApp.",
      dev: 'Local mode: the form only sends messages once the site is deployed on Netlify.',
    },
  },

  footer: { texto: ['Learning and building every day.', "Let's build something together."], derechos: 'Built by Luciana Daniza Paz © 2026 · made with React' },
  whatsappAria: 'Message me on WhatsApp',
};

// Une los textos de cada idioma con los datos fijos
function build(t) {
  return {
    ...t,
    about: { ...t.about, cards: t.about.cards.map((c, i) => ({ ...c, badges: badgesExperiencia[i] })) },
    services: { ...t.services, items: t.services.items.map((s, i) => ({ ...s, icono: iconosServicios[i] })) },
    approach: { ...t.approach, items: t.approach.items.map((s, i) => ({ ...s, icono: iconosEnfoque[i] })) },
    projects: {
      ...t.projects,
      items: proyectosBase.map((p) => ({
        ...p,
        ...t.projects.items[p.id],
        categoriaLabel: t.projects.categorias[p.categoria],
        caso: t.casos[p.id] ?? null,
      })),
    },
  };
}

export const content = { es: build(es), en: build(en) };
