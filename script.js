async function fetchHospitalData() {
  const response = await fetch('hospitals.json');
  return await response.json();
}

async function loadHospitals() {
  const data = await fetchHospitalData();
  content.innerHTML = "<h2>Hospitals</h2><p class='state-info'>State: " + data.state + "</p>";
  for (let hospital in data.hospitals) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = hospital;
    div.onclick = () => loadDepartments(data, hospital);
    content.appendChild(div);
  }
}

function loadDepartments(data, hospital) {
  content.innerHTML = `<h2>${hospital} – Departments</h2>`;
  const departments = data.hospitals[hospital].departments;
  for (let dept in departments) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = dept;
    div.onclick = () => loadDoctors(data, hospital, dept);
    content.appendChild(div);
  }
  addBackButton(() => loadHospitals(data));
}

function loadDoctors(data, hospital, dept) {
  content.innerHTML = `<h2>${dept} – Doctors</h2>`;
  const doctors = data.hospitals[hospital].departments[dept];
  doctors.forEach(doc => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = doc;
    content.appendChild(div);
  });
  addBackButton(() => loadDepartments(data, hospital));
}

function addBackButton(callback) {
  const btn = document.createElement("button");
  btn.textContent = "← Back";
  btn.style.marginTop = "1rem";
  btn.onclick = callback;
  content.appendChild(btn);
}

// Initialize homepage
loadHospitals();
