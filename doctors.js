// Doctors data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Wijaya",
    specialty: "Spesialis Jantung",
    credentials: "Sp.JP, FIHA",
    experience: "15 tahun",
    rating: 4.9,
    reviews: 234,
    fee: 75000,
    location: "Jakarta Pusat",
    availability: "online",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia", "English"],
    education: "Universitas Indonesia",
  },
  {
    id: 2,
    name: "Dr. Ahmad Pratama",
    specialty: "Spesialis Anak",
    credentials: "Sp.A, M.Kes",
    experience: "12 tahun",
    rating: 4.8,
    reviews: 189,
    fee: 65000,
    location: "Jakarta Selatan",
    availability: "online",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia"],
    education: "Universitas Gadjah Mada",
  },
  {
    id: 3,
    name: "Dr. Maya Sari",
    specialty: "Spesialis Kulit",
    credentials: "Sp.KK, FINSDV",
    experience: "10 tahun",
    rating: 4.9,
    reviews: 156,
    fee: 80000,
    location: "Jakarta Barat",
    availability: "offline",
    image:
      "https://images.unsplash.com/photo-1594824475317-1ad6b5d2e2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia", "English"],
    education: "Universitas Airlangga",
  },
  {
    id: 4,
    name: "Dr. Budi Santoso",
    specialty: "Dokter Umum",
    credentials: "dr., M.Kes",
    experience: "8 tahun",
    rating: 4.7,
    reviews: 98,
    fee: 45000,
    location: "Jakarta Timur",
    availability: "online",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia"],
    education: "Universitas Trisakti",
  },
  {
    id: 5,
    name: "Dr. Siti Nurhaliza",
    specialty: "Spesialis Mata",
    credentials: "Sp.M, FICS",
    experience: "14 tahun",
    rating: 4.8,
    reviews: 167,
    fee: 70000,
    location: "Jakarta Utara",
    availability: "online",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia", "English", "Mandarin"],
    education: "Universitas Indonesia",
  },
  {
    id: 6,
    name: "Dr. Rudi Hermawan",
    specialty: "Spesialis Orthopedi",
    credentials: "Sp.OT, FICS",
    experience: "16 tahun",
    rating: 4.9,
    reviews: 203,
    fee: 85000,
    location: "Jakarta Selatan",
    availability: "offline",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia", "English"],
    education: "Universitas Padjadjaran",
  },
  {
    id: 7,
    name: "Dr. Lisa Andriani",
    specialty: "Spesialis Kandungan",
    credentials: "Sp.OG, M.Kes",
    experience: "11 tahun",
    rating: 4.8,
    reviews: 145,
    fee: 75000,
    location: "Jakarta Pusat",
    availability: "online",
    image:
      "https://images.unsplash.com/photo-1594824475317-1ad6b5d2e2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia", "English"],
    education: "Universitas Indonesia",
  },
  {
    id: 8,
    name: "Dr. Andi Wijaya",
    specialty: "Spesialis Saraf",
    credentials: "Sp.S, Ph.D",
    experience: "13 tahun",
    rating: 4.9,
    reviews: 178,
    fee: 90000,
    location: "Jakarta Barat",
    availability: "online",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    languages: ["Indonesia", "English"],
    education: "Universitas Gadjah Mada",
  },
]

let filteredDoctors = [...doctors]

// DOM Elements
const doctorSearch = document.getElementById("doctorSearch")
const specialtyFilter = document.getElementById("specialtyFilter")
const locationFilter = document.getElementById("locationFilter")
const availabilityFilter = document.getElementById("availabilityFilter")
const sortFilter = document.getElementById("sortFilter")
const doctorsGrid = document.getElementById("doctorsGrid")
const resultsCount = document.getElementById("resultsCount")
const noResults = document.getElementById("noResults")

// Function to show notification
function showNotification(message, type) {
  console.log(`Notification (${type}): ${message}`)
}

// Initialize doctors page
document.addEventListener("DOMContentLoaded", () => {
  initializeDoctorsPage()
})

function initializeDoctorsPage() {
  renderDoctors()
  setupEventListeners()
}

function setupEventListeners() {
  doctorSearch?.addEventListener("input", filterDoctors)
  specialtyFilter?.addEventListener("change", filterDoctors)
  locationFilter?.addEventListener("change", filterDoctors)
  availabilityFilter?.addEventListener("change", filterDoctors)
  sortFilter?.addEventListener("change", filterDoctors)
}

function filterDoctors() {
  const searchTerm = doctorSearch?.value.toLowerCase() || ""
  const specialty = specialtyFilter?.value || ""
  const location = locationFilter?.value || ""
  const availability = availabilityFilter?.value || ""
  const sortBy = sortFilter?.value || "rating"

  // Filter doctors
  filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm) || doctor.specialty.toLowerCase().includes(searchTerm)
    const matchesSpecialty = !specialty || doctor.specialty === specialty
    const matchesLocation = !location || doctor.location === location
    const matchesAvailability = !availability || doctor.availability === availability

    return matchesSearch && matchesSpecialty && matchesLocation && matchesAvailability
  })

  // Sort doctors
  filteredDoctors.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "experience":
        return Number.parseInt(b.experience) - Number.parseInt(a.experience)
      case "fee":
        return a.fee - b.fee
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  renderDoctors()
  updateResultsCount()
}

function renderDoctors() {
  if (!doctorsGrid) return

  if (filteredDoctors.length === 0) {
    doctorsGrid.style.display = "none"
    if (noResults) noResults.style.display = "block"
    return
  }

  doctorsGrid.style.display = "grid"
  if (noResults) noResults.style.display = "none"

  doctorsGrid.innerHTML = filteredDoctors
    .map(
      (doctor) => `
        <div class="doctor-card">
            <div class="doctor-image-container">
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-avatar">
                <div class="online-status ${doctor.availability === "offline" ? "offline" : ""}"></div>
            </div>
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p class="specialty">${doctor.specialty}</p>
                <div class="doctor-credentials">
                    <span>${doctor.credentials}</span>
                    <span>${doctor.experience} pengalaman</span>
                </div>
                <div class="doctor-rating">
                    <div class="stars">
                        ${Array(5)
                          .fill()
                          .map(() => '<i class="fas fa-star"></i>')
                          .join("")}
                    </div>
                    <span>${doctor.rating} (${doctor.reviews} ulasan)</span>
                </div>
                <div class="consultation-fee">
                    <span>Konsultasi: Rp ${doctor.fee.toLocaleString()}</span>
                </div>
                <div class="doctor-actions">
                    <button class="btn-primary btn-full" onclick="handleConsultation(${doctor.id}, 'chat')">
                        <i class="fas fa-comments"></i>
                        Chat
                    </button>
                    <button class="btn-outline btn-full" onclick="handleConsultation(${doctor.id}, 'video')">
                        <i class="fas fa-video"></i>
                        Video
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function updateResultsCount() {
  if (resultsCount) {
    resultsCount.textContent = `Menampilkan ${filteredDoctors.length} dari ${doctors.length} dokter`
  }
}

function handleConsultation(doctorId, type) {
  const doctor = doctors.find((d) => d.id === doctorId)
  if (doctor) {
    if (typeof showNotification === "function") {
      showNotification(`Memulai ${type} dengan ${doctor.name}...`, "info")
      setTimeout(() => {
        showNotification("Fitur konsultasi akan segera tersedia!", "info")
      }, 2000)
    } else {
      alert(`Memulai ${type} dengan ${doctor.name}`)
    }
  }
}
