const content = document.getElementById("content");

async function fetchHospitalData() {
  const response = await fetch('hospitals.json');
  return await response.json();
}

async function loadHospitals() {
  const data = await fetchHospitalData();
  content.innerHTML = `<h2>Hospitals</h2><p class='state-info'>State: ${data.state}</p>`;

  for (let district in data.districts) {
    const districtHeader = document.createElement("h3");
    districtHeader.textContent = district;
    districtHeader.style.marginTop = "1rem";
    content.appendChild(districtHeader);

    const hospitals = data.districts[district];
    for (let hospital in hospitals) {
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = hospital;
      div.onclick = () => loadDepartments(data, district, hospital);
      content.appendChild(div);
    }
  }
}

function loadDepartments(data, district, hospital) {
  const departments = data.districts[district][hospital].departments;
  content.innerHTML = `<h2>${hospital} – Departments</h2>`;
  for (let dept in departments) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = dept;
    div.onclick = () => loadDoctors(data, district, hospital, dept);
    content.appendChild(div);
  }
  addBackButton(() => loadHospitals());
}

function loadDoctors(data, district, hospital, dept) {
  const doctors = data.districts[district][hospital].departments[dept];
  content.innerHTML = `<h2>${dept} – Doctors</h2>`;
  doctors.forEach(doc => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = doc;
    content.appendChild(div);
  });
  addBackButton(() => loadDepartments(data, district, hospital));
}

function addBackButton(callback) {
  const btn = document.createElement("button");
  btn.textContent = "← Back";
  btn.onclick = callback;
  content.appendChild(btn);
}

// Initialize homepage
loadHospitals();
