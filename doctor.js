/* ------------------------
   Hospital Dashboard Logic
------------------------- */

const content = document.getElementById("content");

// Fetch JSON data
async function fetchHospitalData() {
  const response = await fetch('hospitals.json');
  return await response.json();
}

// Load hospitals
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

// Load departments
function loadDepartments(data, hospital) {
  const departments = data.hospitals[hospital].departments;
  content.innerHTML = `<h2>${hospital} – Departments</h2>`;

  Object.keys(departments).forEach(dept => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = dept;
    div.onclick = () => loadDoctors(data, hospital, dept);
    content.appendChild(div);
  });

  addBackButton(() => loadHospitals());
}

// Load doctors
function loadDoctors(data, hospital, dept) {
  const doctors = data.hospitals[hospital].departments[dept];
  content.innerHTML = `<h2>${dept} – Doctors</h2>`;

  doctors.forEach(doc => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = doc;
    // Navigate to doctor page
    div.onclick = () => {
      const url = `doctor.html?hospital=${encodeURIComponent(hospital)}&department=${encodeURIComponent(dept)}&doctor=${encodeURIComponent(doc)}`;
      window.location.href = url;
    };
    content.appendChild(div);
  });

  addBackButton(() => loadDepartments(data, hospital));
}

// Back button helper
function addBackButton(callback) {
  const btn = document.createElement("button");
  btn.textContent = "← Back";
  btn.onclick = callback;
  content.appendChild(btn);
}

// Initialize hospitals dashboard
loadHospitals();

/* ------------------------
   User Registration / Login
------------------------- */

const userForm = document.getElementById('user-form');
const userDetails = document.getElementById('user-details');
const displayName = document.getElementById('user-display-name');
const displayPhone = document.getElementById('user-display-phone');
const displayAge = document.getElementById('user-display-age');
const displaySex = document.getElementById('user-display-sex');
const logoutBtn = document.getElementById('logout-btn');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('user-name').value;
  const phone = document.getElementById('user-phone').value;
  const age = document.getElementById('user-age').value;
  const sex = document.getElementById('user-sex').value;

  const user = { name, phone, age, sex };
  localStorage.setItem('queuefreeUser', JSON.stringify(user));

  showUserDetails(user);
});

function showUserDetails(user) {
  userForm.style.display = 'none';
  userDetails.style.display = 'block';
  displayName.textContent = user.name;
  displayPhone.textContent = user.phone;
  displayAge.textContent = user.age;
  displaySex.textContent = user.sex;
}

// Auto-login if user data exists
const savedUser = JSON.parse(localStorage.getItem('queuefreeUser'));
if (savedUser) {
  showUserDetails(savedUser);
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('queuefreeUser');
  userDetails.style.display = 'none';
  userForm.style.display = 'block';
});
