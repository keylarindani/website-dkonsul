// Facilities data
const healthFacilities = [
  {
    id: 1,
    name: "RS Siloam Kebon Jeruk",
    type: "Rumah Sakit",
    address: "Jl. Perjuangan No. 8, Kebon Jeruk, Jakarta Barat",
    distance: "2.5 km",
    rating: 4.8,
    reviews: 234,
    openHours: "24 Jam",
    phone: "+62 21 5674 5678",
    services: ["IGD", "Rawat Inap", "Rawat Jalan", "MCU"],
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Jakarta Barat",
    emergency: true,
  },
  {
    id: 2,
    name: "Klinik Kimia Farma Tanjung Duren",
    type: "Klinik",
    address: "Jl. Tanjung Duren Raya No. 15, Jakarta Barat",
    distance: "1.2 km",
    rating: 4.6,
    reviews: 89,
    openHours: "08:00 - 20:00",
    phone: "+62 21 5674 1234",
    services: ["Konsultasi Umum", "Lab", "Apotek"],
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Jakarta Barat",
    emergency: false,
  },
  {
    id: 3,
    name: "RS Hermina Daan Mogot",
    type: "Rumah Sakit",
    address: "Jl. Kintamani Raya No. 2, Daan Mogot, Jakarta Barat",
    distance: "3.8 km",
    rating: 4.7,
    reviews: 156,
    openHours: "24 Jam",
    phone: "+62 21 5674 9876",
    services: ["IGD", "Rawat Inap", "Rawat Jalan", "ICU"],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Jakarta Barat",
    emergency: true,
  },
  {
    id: 4,
    name: "RS Pondok Indah",
    type: "Rumah Sakit",
    address: "Jl. Metro Duta Kav. UE, Pondok Indah, Jakarta Selatan",
    distance: "5.2 km",
    rating: 4.9,
    reviews: 312,
    openHours: "24 Jam",
    phone: "+62 21 7657 5678",
    services: ["IGD", "Rawat Inap", "Bedah", "Kardiologi", "Onkologi"],
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Jakarta Selatan",
    emergency: true,
  },
  {
    id: 5,
    name: "Klinik Pratama Sehat Bersama",
    type: "Klinik",
    address: "Jl. Kemang Raya No. 45, Kemang, Jakarta Selatan",
    distance: "4.1 km",
    rating: 4.5,
    reviews: 67,
    openHours: "07:00 - 21:00",
    phone: "+62 21 7234 5678",
    services: ["Konsultasi Umum", "Vaksinasi", "Lab", "Fisioterapi"],
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Jakarta Selatan",
    emergency: false,
  },
  {
    id: 6,
    name: "RS Fatmawati",
    type: "Rumah Sakit",
    address: "Jl. RS Fatmawati Raya No. 80, Cilandak, Jakarta Selatan",
    distance: "6.8 km",
    rating: 4.6,
    reviews: 189,
    openHours: "24 Jam",
    phone: "+62 21 7501 234",
    services: ["IGD", "Rawat Inap", "Spesialis", "Rehabilitasi"],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Jakarta Selatan",
    emergency: true,
  },
]

let filteredFacilities = [...healthFacilities]

// DOM Elements
const facilitySearch = document.getElementById("facilitySearch")
const typeFilter = document.getElementById("typeFilter")
const locationFilter = document.getElementById("locationFilter")
const emergencyFilter = document.getElementById("emergencyFilter")
const sortFilter = document.getElementById("sortFilter")
const facilitiesList = document.getElementById("facilitiesList")
const resultsCount = document.getElementById("resultsCount")
const noResults = document.getElementById("noResults")

// Function to show notifications
function showNotification(message, type) {
  console.log(`Notification (${type}): ${message}`)
}

// Initialize facilities page
document.addEventListener("DOMContentLoaded", () => {
  initializeFacilitiesPage()
})

function initializeFacilitiesPage() {
  renderFacilities()
  setupEventListeners()
}

function setupEventListeners() {
  facilitySearch?.addEventListener("input", filterFacilities)
  typeFilter?.addEventListener("change", filterFacilities)
  locationFilter?.addEventListener("change", filterFacilities)
  emergencyFilter?.addEventListener("change", filterFacilities)
  sortFilter?.addEventListener("change", filterFacilities)
}

function filterFacilities() {
  const searchTerm = facilitySearch?.value.toLowerCase() || ""
  const type = typeFilter?.value || ""
  const location = locationFilter?.value || ""
  const emergencyOnly = emergencyFilter?.checked || false
  const sortBy = sortFilter?.value || "distance"

  // Filter facilities
  filteredFacilities = healthFacilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchTerm) ||
      facility.services.some((service) => service.toLowerCase().includes(searchTerm))
    const matchesType = !type || facility.type === type
    const matchesLocation = !location || facility.location === location
    const matchesEmergency = !emergencyOnly || facility.emergency

    return matchesSearch && matchesType && matchesLocation && matchesEmergency
  })

  // Sort facilities
  filteredFacilities.sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  renderFacilities()
  updateResultsCount()
}

function renderFacilities() {
  if (!facilitiesList) return

  if (filteredFacilities.length === 0) {
    facilitiesList.style.display = "none"
    if (noResults) noResults.style.display = "block"
    return
  }

  facilitiesList.style.display = "flex"
  if (noResults) noResults.style.display = "none"

  facilitiesList.innerHTML = filteredFacilities
    .map(
      (facility) => `
        <div class="facility-list-item">
            <div class="facility-content">
                <div class="facility-image-container">
                    <img src="${facility.image}" alt="${facility.name}">
                </div>
                <div class="facility-details">
                    <div class="facility-header">
                        <div class="facility-title">
                            <h3>${facility.name}</h3>
                            <div class="facility-badges">
                                <span class="facility-badge type">${facility.type}</span>
                                ${facility.emergency ? '<span class="facility-badge emergency">IGD 24 Jam</span>' : ""}
                            </div>
                        </div>
                        <div class="facility-rating-info">
                            <div class="facility-rating">
                                <div class="stars">
                                    ${Array(5)
                                      .fill()
                                      .map(() => '<i class="fas fa-star"></i>')
                                      .join("")}
                                </div>
                                <span>${facility.rating} (${facility.reviews})</span>
                            </div>
                            <div class="facility-distance">
                                <i class="fas fa-map-marker-alt"></i>
                                ${facility.distance}
                            </div>
                        </div>
                    </div>
                    
                    <div class="facility-info-grid">
                        <div class="facility-info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${facility.address}</span>
                        </div>
                        <div class="facility-info-item">
                            <i class="fas fa-clock"></i>
                            <span>${facility.openHours}</span>
                        </div>
                        <div class="facility-info-item">
                            <i class="fas fa-phone"></i>
                            <span>${facility.phone}</span>
                        </div>
                    </div>
                    
                    <div class="facility-services-list">
                        <h4>Layanan:</h4>
                        <div class="facility-services">
                            ${facility.services
                              .map((service) => `<span class="service-tag">${service}</span>`)
                              .join("")}
                        </div>
                    </div>
                    
                    <div class="facility-actions">
                        <button class="btn-primary-small" onclick="handleBookAppointment(${facility.id})">
                            <i class="fas fa-calendar"></i>
                            Buat Janji
                        </button>
                        <button class="btn-outline-small" onclick="handleViewDetails(${facility.id})">
                            Lihat Detail
                        </button>
                        <button class="btn-outline-small" onclick="handleCall('${facility.phone}')">
                            <i class="fas fa-phone"></i>
                            Hubungi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function updateResultsCount() {
  if (resultsCount) {
    resultsCount.textContent = `Menampilkan ${filteredFacilities.length} dari ${healthFacilities.length} fasilitas`
  }
}

function handleBookAppointment(facilityId) {
  const facility = healthFacilities.find((f) => f.id === facilityId)
  if (facility) {
    showNotification(`Membuat janji temu di ${facility.name}...`, "info")
    setTimeout(() => {
      showNotification("Fitur booking akan segera tersedia!", "info")
    }, 2000)
  }
}

function handleViewDetails(facilityId) {
  const facility = healthFacilities.find((f) => f.id === facilityId)
  if (facility) {
    showNotification(`Melihat detail ${facility.name}...`, "info")
  }
}

function handleCall(phone) {
  window.open(`tel:${phone}`, "_self")
}
