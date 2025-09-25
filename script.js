/*
 * Lógica de la tienda: generación dinámica de productos,
 * búsqueda en tiempo real y validación del formulario de contacto.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Lista de productos de ejemplo. Cada producto tiene nombre, precio,
  // categoría e icono de Font Awesome para representarlo.
  const products = [
    {
      id: 1,
      name: 'Filtro de aceite',
      price: '19,95€',
      category: 'Filtros y Aceites',
      icon: 'fa-oil-can',
      reference: 'A0001',
      vinList: ['WDB1234561', 'WDD9876541'],
    },
    {
      id: 2,
      name: 'Pastillas de freno',
      price: '35,50€',
      category: 'Sistema de Frenos',
      icon: 'fa-stopwatch',
      reference: 'A0002',
      vinList: ['WDB1234562'],
    },
    {
      id: 3,
      name: 'Batería 12V',
      price: '120,00€',
      category: 'Sistema Eléctrico',
      icon: 'fa-battery-full',
      reference: 'A0003',
      vinList: ['WDD9876542'],
    },
    {
      id: 4,
      name: 'Amortiguador delantero',
      price: '89,90€',
      category: 'Suspensión y Dirección',
      icon: 'fa-car',
      reference: 'A0004',
      vinList: ['WDB1234563'],
    },
    {
      id: 5,
      name: 'Alternador',
      price: '219,99€',
      category: 'Sistema Eléctrico',
      icon: 'fa-bolt',
      reference: 'A0005',
      vinList: ['WDD9876543'],
    },
    {
      id: 6,
      name: 'Filtro de aire',
      price: '24,50€',
      category: 'Filtros y Aceites',
      icon: 'fa-wind',
      reference: 'A0006',
      vinList: ['WDB1234564'],
    },
    {
      id: 7,
      name: 'Espejo retrovisor',
      price: '45,00€',
      category: 'Carrocería y Exterior',
      icon: 'fa-mirror',
      reference: 'A0007',
      vinList: ['WDD9876544'],
    },
    {
      id: 8,
      name: 'Kit de suspensión',
      price: '349,00€',
      category: 'Suspensión y Dirección',
      icon: 'fa-car',
      reference: 'A0008',
      vinList: ['WDB1234565'],
    },
  ];

  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');

  /**
   * Renderiza la lista de productos filtrados por un término.
   * Si no se indica término, se muestran todos los productos.
   * @param {string} filter Texto por el que se filtran productos.
   */
  function renderProducts(filter = '') {
    productGrid.innerHTML = '';
    const normalizedFilter = filter.toLowerCase();
    products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedFilter) ||
          p.category.toLowerCase().includes(normalizedFilter)
      )
      .forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        const iconElem = document.createElement('i');
        iconElem.className = `fas ${product.icon}`;
        // Ajuste de tamaño y color mediante estilos en línea
        iconElem.style.fontSize = '3rem';
        iconElem.style.color = 'var(--primary-color)';

        const nameElem = document.createElement('h3');
        nameElem.textContent = product.name;

        const priceElem = document.createElement('p');
        priceElem.textContent = `Precio: ${product.price}`;

        const btn = document.createElement('button');
        btn.textContent = 'Añadir al carrito';
        btn.addEventListener('click', () => {
          alert(`Has añadido "${product.name}" al carrito.`);
        });

        card.append(iconElem, nameElem, priceElem, btn);
        productGrid.appendChild(card);
      });
  }

  // Evento para filtrar productos en tiempo real al escribir
  searchInput.addEventListener('input', (e) => {
    renderProducts(e.target.value);
  });

  // Evento para validar el formulario de contacto y proporcionar feedback
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(
      'Gracias por contactarnos. Responderemos a tu consulta lo antes posible.'
    );
    contactForm.reset();
  });

  // Evento para validar el formulario de registro profesional
  const profesionalForm = document.getElementById('profesionalForm');
  if (profesionalForm) {
    profesionalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Obtenemos los valores básicos del formulario para mostrar un mensaje personalizado
      const nombre = profesionalForm.nombre.value;
      alert(
        `¡Gracias, ${nombre}! Tu solicitud de registro ha sido enviada. Nos pondremos en contacto contigo para activar tu cuenta profesional.`
      );
      profesionalForm.reset();
    });
  }

  // Render inicial
  renderProducts();

  // Búsqueda por referencia o VIN
  const vinSearchBtn = document.getElementById('vinSearchBtn');
  vinSearchBtn.addEventListener('click', searchByRefVin);

  /**
   * Busca productos por referencia exacta o VIN. Muestra los resultados
   * en el contenedor #vinResults. Si no se introduce ningún valor,
   * muestra un mensaje solicitándolo.
   */
  function searchByRefVin() {
    const refInput = document.getElementById('refInput');
    const vinInput = document.getElementById('vinInput');
    const resultsContainer = document.getElementById('vinResults');
    const ref = refInput.value.trim().toLowerCase();
    const vin = vinInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';
    // Si no se indica referencia ni VIN, solicitamos datos
    if (!ref && !vin) {
      const msg = document.createElement('p');
      msg.textContent = 'Introduce una referencia o un VIN para buscar.';
      resultsContainer.appendChild(msg);
      return;
    }
    // Filtramos por referencia exacta o VIN exacto dentro de la lista
    const matches = products.filter((p) => {
      let match = false;
      if (ref) {
        match = p.reference.toLowerCase() === ref;
      }
      if (!match && vin) {
        match = p.vinList.some((v) => v.toLowerCase() === vin);
      }
      return match;
    });
    if (matches.length === 0) {
      const msg = document.createElement('p');
      msg.textContent = 'No se encontraron resultados para la búsqueda.';
      resultsContainer.appendChild(msg);
    } else {
      matches.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        // Icono
        const iconElem = document.createElement('i');
        iconElem.className = `fas ${product.icon}`;
        iconElem.style.fontSize = '3rem';
        iconElem.style.color = 'var(--primary-color)';
        // Nombre
        const nameElem = document.createElement('h3');
        nameElem.textContent = product.name;
        // Precio
        const priceElem = document.createElement('p');
        priceElem.textContent = `Precio: ${product.price}`;
        // Botón
        const btn = document.createElement('button');
        btn.textContent = 'Añadir al carrito';
        btn.addEventListener('click', () => {
          alert(`Has añadido "${product.name}" al carrito.`);
        });
        card.append(iconElem, nameElem, priceElem, btn);
        resultsContainer.appendChild(card);
      });
    }
  }
});