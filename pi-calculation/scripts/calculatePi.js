async function calculatePi() {
  const decimalPlaces = parseInt(
    document.getElementById("decimalPlaces").value
  );
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  const methods = [
    { name: "Archimedes", func: archimedes },
    { name: "Madhava", func: madhava },
    { name: "Gregory-Leibniz", func: gregoryLeibniz },
    { name: "Machin", func: machin },
    { name: "Monte Carlo", func: monteCarlo },
    { name: "Borwein", func: borwein },
    { name: "Gauss-Legendre", func: gaussLegendre },
    { name: "Chudnovsky", func: chudnovsky },
    { name: "Liu Hui", func: liuHui },
    { name: "Al Káší", func: alKashi },
    { name: "François Viète", func: francoisViete },
  ];

  for (const method of methods) {
    const startTime = performance.now();
    const piValue = await method.func(decimalPlaces);
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(4);

    resultsDiv.innerHTML += `<p>${method.name}: ${piValue} (Time: ${timeTaken} ms)</p>`;
  }
}

async function calculatePiMethod(methodName) {
  const decimalPlaces = parseInt(
    document.getElementById("decimalPlaces").value
  );
  const resultsDiv = document.getElementById("results");

  const methods = {
    archimedes,
    madhava,
    gregoryLeibniz,
    machin,
    monteCarlo,
    borwein,
    gaussLegendre,
    chudnovsky,
    liuHui,
    alKashi,
    francoisViete,
  };

  if (methods[methodName]) {
    const startTime = performance.now();
    const piValue = await methods[methodName](decimalPlaces); // Asynchronní volání
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(4);

    // Přidání výsledku jako kompaktní Bootstrap kartu
    resultsDiv.innerHTML += `
      <div class="card mb-2 shadow-sm" style="background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;">
        <div class="card-body p-2">
          <h6 class="card-title mb-1">${methodName}</h6>
          <p class="card-text mb-0">
            <small><strong>Výsledek:</strong> ${piValue}</small><br />
            <small><strong>Čas:</strong> ${timeTaken} ms</small>
          </p>
        </div>
      </div>`;
  } else {
    resultsDiv.innerHTML += `
      <div class="card mb-2 shadow-sm border-danger">
        <div class="card-body p-2">
          <h6 class="card-title text-danger mb-1">Chyba</h6>
          <p class="card-text mb-0">
            <small>Neplatná metoda: ${methodName}</small>
          </p>
        </div>
      </div>`;
  }
}

async function archimedes(decimalPlaces) {
  let n = 6; // Start with a hexagon
  let sideLength = 1; // Side length of the hexagon
  let pi = (n * sideLength) / 2;

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.className = "card mb-2 shadow-sm";
  methodDiv.style = "border: 1px solid #c3e6cb; background-color: #f8f9fa;";
  methodDiv.innerHTML = `
    <div class="card-body p-2">
      <h6 class="card-title mb-1">Archimedes</h6>
      <p class="card-text mb-0">
        <small><strong>Výsledek:</strong> ${pi.toFixed(decimalPlaces)}</small>
      </p>
    </div>`;
  resultsDiv.appendChild(methodDiv);

  let previousPi = 0;
  while (true) {
    const newSideLength = Math.sqrt(2 - Math.sqrt(4 - sideLength * sideLength));
    n *= 2;
    pi = (n * newSideLength) / 2;

    methodDiv.innerHTML = `
      <div class="card-body p-2">
        <h6 class="card-title mb-1">Archimedes</h6>
        <p class="card-text mb-0">
          <small><strong>Výsledek:</strong> ${pi.toFixed(decimalPlaces)}</small>
        </p>
      </div>`;

    if (Math.abs(pi - previousPi) < Math.pow(10, -decimalPlaces)) break;
    previousPi = pi;
    sideLength = newSideLength;

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  // Skrytí methodDiv po dokončení výpočtu
  methodDiv.classList.add("d-none");
  return pi.toFixed(decimalPlaces);
}

async function madhava(decimalPlaces) {
  let pi = 0;
  let k = 0;
  const sqrt12 = Math.sqrt(12);

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.className = "card mb-2 shadow-sm";
  methodDiv.style = "border: 1px solid #c3e6cb; background-color: #f8f9fa;";
  methodDiv.innerHTML = `
    <div class="card-body p-2">
      <h6 class="card-title mb-1">Madhava</h6>
      <p class="card-text mb-0">
        <small><strong>Výsledek:</strong> ${pi.toFixed(decimalPlaces)}</small>
      </p>
    </div>`;
  resultsDiv.appendChild(methodDiv);

  while (true) {
    const term = Math.pow(-3, -k) / (2 * k + 1);
    pi += term;

    methodDiv.innerHTML = `
      <div class="card-body p-2">
        <h6 class="card-title mb-1">Madhava</h6>
        <p class="card-text mb-0">
          <small><strong>Výsledek:</strong> ${(sqrt12 * pi).toFixed(
            decimalPlaces
          )}</small>
        </p>
      </div>`;

    if (Math.abs(term) < Math.pow(10, -decimalPlaces)) break;
    k++;

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  // Skrytí methodDiv po dokončení výpočtu
  methodDiv.classList.add("d-none");
  return (sqrt12 * pi).toFixed(decimalPlaces);
}

async function gregoryLeibniz(decimalPlaces) {
  let pi = 0;

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.className = "card mb-2 shadow-sm";
  methodDiv.style = "border: 1px solid #c3e6cb; background-color: #f8f9fa;";
  methodDiv.innerHTML = `
    <div class="card-body p-2">
      <h6 class="card-title mb-1">Gregory-Leibniz</h6>
      <p class="card-text mb-0">
        <small><strong>Výsledek:</strong> ${pi.toFixed(decimalPlaces)}</small>
      </p>
    </div>`;
  resultsDiv.appendChild(methodDiv);

  for (let k = 0; k < 100000; k++) {
    pi += Math.pow(-1, k) / (2 * k + 1);

    if (k % 100 === 0) {
      methodDiv.innerHTML = `
        <div class="card-body p-2">
          <h6 class="card-title mb-1">Gregory-Leibniz</h6>
          <p class="card-text mb-0">
            <small><strong>Výsledek:</strong> ${(pi * 4).toFixed(
              decimalPlaces
            )}</small>
          </p>
        </div>`;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  // Skrytí methodDiv po dokončení výpočtu
  methodDiv.classList.add("d-none");
  return (pi * 4).toFixed(decimalPlaces);
}

function machin(decimalPlaces) {
  const pi = 16 * Math.atan(1 / 5) - 4 * Math.atan(1 / 239);
  return pi.toFixed(decimalPlaces);
}

async function monteCarlo(decimalPlaces) {
  let insideCircle = 0;
  const totalPoints = 1000000;

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.className = "card mb-2 shadow-sm";
  methodDiv.style = "border: 1px solid #c3e6cb; background-color: #f8f9fa;";
  methodDiv.innerHTML = `
    <div class="card-body p-2">
      <h6 class="card-title mb-1">Monte Carlo</h6>
      <p class="card-text mb-0">
        <small><strong>Výsledek:</strong> 0</small>
      </p>
    </div>`;
  resultsDiv.appendChild(methodDiv);

  for (let i = 0; i < totalPoints; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      insideCircle++;
    }

    if (i % 10000 === 0) {
      methodDiv.innerHTML = `
        <div class="card-body p-2">
          <h6 class="card-title mb-1">Monte Carlo</h6>
          <p class="card-text mb-0">
            <small><strong>Výsledek:</strong> ${(
              (4 * insideCircle) /
              (i + 1)
            ).toFixed(decimalPlaces)}</small>
          </p>
        </div>`;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  // Skrytí methodDiv po dokončení výpočtu
  methodDiv.classList.add("d-none");
  return ((4 * insideCircle) / totalPoints).toFixed(decimalPlaces);
}

async function borwein(decimalPlaces) {
  let a = 1;
  let b = 1 / Math.sqrt(2);
  let t = 1 / 4;
  let p = 1;

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.className = "card mb-2 shadow-sm";
  methodDiv.style = "border: 1px solid #c3e6cb; background-color: #f8f9fa;";
  methodDiv.innerHTML = `
    <div class="card-body p-2">
      <h6 class="card-title mb-1">Borwein</h6>
      <p class="card-text mb-0">
        <small><strong>Výsledek:</strong> 0</small>
      </p>
    </div>`;
  resultsDiv.appendChild(methodDiv);

  for (let i = 0; i < 10; i++) {
    const aNext = (a + b) / 2;
    const bNext = Math.sqrt(a * b);
    t -= p * Math.pow(a - aNext, 2);
    a = aNext;
    b = bNext;
    p *= 2;

    methodDiv.innerHTML = `
      <div class="card-body p-2">
        <h6 class="card-title mb-1">Borwein</h6>
        <p class="card-text mb-0">
          <small><strong>Výsledek:</strong> ${(
            ((a + b) * (a + b)) /
            (4 * t)
          ).toFixed(decimalPlaces)}</small>
        </p>
      </div>`;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Skrytí methodDiv po dokončení výpočtu
  methodDiv.classList.add("d-none");

  return (((a + b) * (a + b)) / (4 * t)).toFixed(decimalPlaces);
}

function gaussLegendre(decimalPlaces) {
  let a = 1;
  let b = 1 / Math.sqrt(2);
  let t = 1 / 4;
  let p = 1;
  for (let i = 0; i < 10; i++) {
    const aNext = (a + b) / 2;
    const bNext = Math.sqrt(a * b);
    t -= p * Math.pow(a - aNext, 2);
    a = aNext;
    b = bNext;
    p *= 2;
  }
  return (((a + b) * (a + b)) / (4 * t)).toFixed(decimalPlaces);
}

async function chudnovsky(decimalPlaces) {
  let k = 0;
  let pi = 0;
  const C = 426880 * Math.sqrt(10005);

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.className = "card mb-2 shadow-sm";
  methodDiv.style = "border: 1px solid #c3e6cb; background-color: #f8f9fa;";
  methodDiv.innerHTML = `
    <div class="card-body p-2">
      <h6 class="card-title mb-1">Chudnovsky</h6>
      <p class="card-text mb-0">
        <small><strong>Výsledek:</strong> 0</small>
      </p>
    </div>`;
  resultsDiv.appendChild(methodDiv);

  while (k < 10) {
    const numerator = factorial(6 * k) * (13591409 + 545140134 * k);
    const denominator =
      factorial(3 * k) *
      Math.pow(factorial(k), 3) *
      Math.pow(-262537412640768000, k);
    pi += numerator / denominator;

    methodDiv.innerHTML = `
      <div class="card-body p-2">
        <h6 class="card-title mb-1">Chudnovsky</h6>
        <p class="card-text mb-0">
          <small><strong>Výsledek:</strong> ${(C / pi).toFixed(
            decimalPlaces
          )}</small>
        </p>
      </div>`;
    k++;

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Skrytí methodDiv po dokončení výpočtu
  methodDiv.classList.add("d-none");

  return (C / pi).toFixed(decimalPlaces);
}

async function liuHui(decimalPlaces) {
  let n = 6; // Začínáme s hexagonem
  let sideLength = 1; // Délka strany hexagonu
  let pi = 3; // Počáteční hodnota π

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.innerHTML = `<p>Liu Hui: ${pi.toFixed(decimalPlaces)}</p>`;
  resultsDiv.appendChild(methodDiv);

  while (true) {
    const newSideLength = Math.sqrt(2 - Math.sqrt(4 - sideLength * sideLength)); // Nová délka strany
    n *= 2; // Zdvojnásobení počtu stran
    pi = n * Math.sqrt(1 - Math.pow(newSideLength / 2, 2)); // Výpočet π

    // Aktualizace výsledku v každé iteraci
    methodDiv.innerHTML = `<p>Liu Hui: ${pi.toFixed(decimalPlaces)}</p>`;

    // Kontrola přesnosti
    if (Math.abs(Math.PI - pi) < Math.pow(10, -decimalPlaces)) break;

    sideLength = newSideLength; // Aktualizace délky strany

    // Pauza pro UI
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return pi.toFixed(decimalPlaces);
}

async function alKashi(decimalPlaces) {
  let n = 3;
  let pi = Math.sqrt(12);

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.className = "card mb-2 shadow-sm";
  methodDiv.style = "border: 1px solid #c3e6cb; background-color: #f8f9fa;";
  methodDiv.innerHTML = `
    <div class="card-body p-2">
      <h6 class="card-title mb-1">Al Káší</h6>
      <p class="card-text mb-0">
        <small><strong>Výsledek:</strong> ${pi.toFixed(decimalPlaces)}</small>
      </p>
    </div>`;
  resultsDiv.appendChild(methodDiv);

  while (true) {
    n *= 2;
    const angle = Math.PI / n;
    pi = n * Math.sin(angle);

    methodDiv.innerHTML = `
      <div class="card-body p-2">
        <h6 class="card-title mb-1">Al Káší</h6>
        <p class="card-text mb-0">
          <small><strong>Výsledek:</strong> ${pi.toFixed(decimalPlaces)}</small>
        </p>
      </div>`;

    if (Math.abs(Math.PI - pi) < Math.pow(10, -decimalPlaces)) break;

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Skrytí methodDiv po dokončení výpočtu
  methodDiv.classList.add("d-none");

  return pi.toFixed(decimalPlaces);
}

async function francoisViete(decimalPlaces) {
  let product = Math.sqrt(2) / 2; // Počáteční hodnota produktu
  let pi = 2 * product; // Počáteční hodnota π

  const resultsDiv = document.getElementById("results");
  const methodDiv = document.createElement("div");
  methodDiv.innerHTML = `<p>François Viète: ${pi.toFixed(decimalPlaces)}</p>`;
  resultsDiv.appendChild(methodDiv);

  while (true) {
    const nextTerm = Math.sqrt(2 + Math.sqrt(2)); // Další člen součinu
    product *= nextTerm / 2; // Aktualizace produktu
    pi = 2 / product; // Výpočet π

    // Aktualizace výsledku v každé iteraci
    methodDiv.innerHTML = `<p>François Viète: ${pi.toFixed(decimalPlaces)}</p>`;

    // Kontrola přesnosti
    if (Math.abs(Math.PI - pi) < Math.pow(10, -decimalPlaces)) break;

    // Pauza pro UI
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return pi.toFixed(decimalPlaces);
}

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
