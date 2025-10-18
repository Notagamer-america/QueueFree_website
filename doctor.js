// Parse URL parameters
const params = new URLSearchParams(window.location.search);
const hospital = params.get('hospital');
const department = params.get('department');
const doctor = params.get('doctor');

const content = document.getElementById("doctor-content");

async function fetchHospitalData() {
  const response = await fetch('hospitals.json');
  return await response.json();
}

async function loadDoctorDetails() {
  const data = await fetchHospitalData();
  if (!hospital || !department || !doctor) {
    content.innerHTML = "<p>Invalid doctor selection.</p>";
    return;
  }

  content.innerHTML = `
    <h2>${doctor}</h2>
    <p><strong>Hospital:</strong> ${hospital}</p>
    <p><strong>Department:</strong> ${department}</p>
    <p>Designation Consultant Dermatologist
       Hospital	VIMSAR, Burla, Sambalpur
       Core Expertise	Cosmetic Dermatology and Chronic Skin Conditions
      Key Focus Areas	Cosmetic Dermatology, management of Psoriasis, and general dermatology practice.
     Professional Goal	To offer specialized, contemporary, and personalized skin health solutions.</p>
    <button id="book-btn">Book Appointment</button>
  `;

  document.getElementById('book-btn').onclick = () => {
    alert(`Appointment booked with ${doctor}!`);
  };
}

loadDoctorDetails();
