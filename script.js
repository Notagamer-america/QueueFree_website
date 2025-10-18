const content = document.getElementById("content");

async function fetchHospitalData() {
  const response = await fetch('hospitals.json');
  return await response.json();
}

async function loadHospitals() {
  const data = await fetchHospitalData();
  content.innerHTML = `<h2>Hospitals</h2><p class='state-info'>State: ${data.state}</p>`;

  for (let hospital in data.hospitals) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = hospital;
    div.onclick = () => loadDepartments(data, hospital);
    content.appendChild(div);
  }
}

function loadDepartments(data, hospital) {
  const departments = data.hospitals[hospital].departments;
  content.innerHTML = `<h2>${hospital} – Departments</h2>`;

  for (let dept in departments) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = dept;
    div.onclick = () => loadDoctors(data, hospital, dept);
    content.appendChild(div);
  }
  addBackButton(() => loadHospitals());
}

function loadDoctors(data, hospital, dept) {
  const doctors = data.hospitals[hospital].departments[dept];
  content.innerHTML = `<h2>${dept} – Doctors</h2>`;

  doctors.forEach(doc => {
    const div = document.createElement("div");
    div.className = "item";
    di
