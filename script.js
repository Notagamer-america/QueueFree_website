const content = document.getElementById("content");

// Example data (you can later fetch from backend)
const data = {
  hospitals: {
    "AIIMS Bhubaneswar": {
      departments: {
        "Cardiology": ["Dr. R. Mishra", "Dr. A. Patnaik"],
        "Neurology": ["Dr. K. Sahu", "Dr. M. Das"],
        "Pediatrics": ["Dr. S. Tripathy"]
      }
    },
    "SCB Medical College": {
      departments: {
        "Orthopedics": ["Dr. P. Mohanty", "Dr. L. Behera"],
        "ENT": ["Dr. T. Panda"]
      }
    },
    "VIMSAR Burla": {
      departments: {
        "Dermatology": ["Dr. R. Swain"],
        "General Surgery": ["Dr. D. Nanda", "Dr. B. Sahoo"]
      }
    }
  }
};

// --- UI Navigation ---
function loadHospitals() {
  content.innerHTML = "<h2>Hospitals</h2>";
  for (let hospital in data.hospitals) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = hospital;
    div.onclick = () => loadDepartments(hospital);
    content.appendChild(div);
  }
}

function loadDepartments(hospital) {
  content.innerHTML = `<h2>${hospital} – Departments</h2>`;
  const departments = data.hospitals[hospital].departments;
  for (let dept in departments) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = dept;
    div.onclick = () => loadDoctors(hospital, dept);
    content.appendChild(div);
  }
  addBackButton(loadHospitals);
}

function loadDoctors(hospital, dept) {
  content.innerHTML = `<h2>${dept} – Doctors</h2>`;
  const doctors = data.hospitals[hospital].departments[dept];
  doctors.forEach(doc => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = doc;
    content.appendChild(div);
  });
  addBackButton(() => loadDepartments(hospital));
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
