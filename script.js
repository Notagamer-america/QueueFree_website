const content = document.getElementById("content");

async function fetchHospitalData() {
  const response = await fetch('hospitals.json');
  return await response.json();
}

async function loadHospitals() {
  const data = await fetchHospitalData();
  content.innerHTML = `<h2>Hospitals</h2><p class='state-info'>State: ${data.state}</p>`;

  Object.keys(data.hospitals).forEach(hospital => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = hospital;
    div.onclick = () => loadDepartments(data, hospital);
    content.appendChild(div);
  });
}

function loadDepartments(data, hospital) {
  const departments = data.hospitals[hospital].departments;
  content.innerHTML = `<h2>${hospital} – Departments</h2>`;

  Object.keys(departments).forEach(dept => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = dept;  // now guaranteed to be a string
    div.onclick = () => loadDoctors(data, hospital, dept);
    content.appendChild(div);
  });

  addBackButton(() => loadHospitals());
}

function loadDoctors(data, hospital, dept) {
  const doctors = data.hospitals[hospital].departments[dept];
  content.innerHTML = `<h2>${dept} – Doctors</h2>`;

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
  btn.onclick = callback;
  content.appendChild(btn);
}

// Initialize homepage
loadHospitals();
