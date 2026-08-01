// doctor.js

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const hospital = params.get('hospital');
const department = params.get('department');
const doctor = params.get('doctor');

const content = document.getElementById("doctor-content");

// Fetch hospital JSON data
async function fetchHospitalData() {
  const response = await fetch('hospitals.json');
  return await response.json();
}

// Load doctor details
() {
  const data = await fetchHospitalData();

  if (!hospital || !department || !doctor) {
    content.innerHTML = "<p>Invalid doctor selection.</p>";
    return;
  }

  // Create doctor card
  const card = document.createElement("div");
  card.className = "doctor-card";

  card.innerHTML = `
    <h2>${doctor}</h2>
    <p><strong>Hospital:</strong> ${hospital}</p>
    <p><strong>Department:</strong> ${department}</p>
    <p><strong>Designation:</strong> Consultant</p>
    <hr>
    <p><strong>Hospital Location:</strong> VIMSAR, Burla, Sambalpur</p>
    <hr>
    <p><strong>Core Expertise:</strong> Cosmetic Dermatology and Chronic Skin Conditions</p>
    <hr>
    <p><strong>Key Focus Areas:</strong> Cosmetic Dermatology, management of Psoriasis, and general dermatology practice.</p>
    <hr>
    <p><strong>Professional Goal:</strong> To offer specialized, contemporary, and personalized skin health solutions.</p>
  `;

  // Create Book Appointment button
  const bookBtn = document.createElement("button");
  bookBtn.id = "book-btn";
  bookBtn.textContent = "Book Appointment";
  bookBtn.onclick = () => {
    alert(`Appointment booked with ${doctor}!`);
  };

  card.appendChild(bookBtn);

  content.appendChild(card);
}

// Initialize
loadDoctorDetails();
