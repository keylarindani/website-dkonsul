// Global state
let isLoggedIn = false
let currentUser = null
let isLoginMode = true
const chatMessagesArray = []
let currentQuestionIndex = 0

// Symptom checker questions
const symptomQuestions = [
  "Bagaimana kondisi Anda saat ini?",
  "Sudah berapa lama Anda merasakan gejala ini?",
  "Apakah ada gejala lain yang menyertai?",
  "Apakah Anda sedang mengonsumsi obat tertentu?",
  "Apakah ada riwayat penyakit dalam keluarga?",
]

// Form validation rules
const validationRules = {
  name: {
    minLength: 8,
    pattern: /^[a-zA-Z\s]+$/,
    message: "Nama harus minimal 8 karakter dan hanya berisi huruf",
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.(com|co\.id|org|net)$/,
    message: "Email harus mengandung '@' dan diakhiri dengan '.com', '.co.id', '.org', atau '.net'",
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: "Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol",
  },
}

// DOM Elements
const loginBtn = document.getElementById("loginBtn")
const mobileLoginBtn = document.getElementById("mobileLoginBtn")
const logoutBtn = document.getElementById("logoutBtn")
const mobileLogoutBtn = document.getElementById("mobileLogoutBtn")
const userInfo = document.getElementById("userInfo")
const mobileUserInfo = document.getElementById("mobileUserInfo")
const userName = document.getElementById("userName")
const mobileUserName = document.getElementById("mobileUserName")
const consultBtn = document.getElementById("consultBtn")
const consultBtnText = document.getElementById("consultBtnText")
const askMeBtn = document.getElementById("askMeBtn")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")

// Modal elements
const loginModal = document.getElementById("loginModal")
const askMeModal = document.getElementById("askMeModal")
const emergencyModal = document.getElementById("emergencyModal")
const closeLoginModal = document.getElementById("closeLoginModal")
const closeAskMeModal = document.getElementById("closeAskMeModal")
const loginForm = document.getElementById("loginForm")
const modalTitle = document.getElementById("modalTitle")
const nameGroup = document.getElementById("nameGroup")
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup")
const submitBtn = document.getElementById("submitBtn")
const toggleForm = document.getElementById("toggleForm")
const passwordToggle = document.getElementById("passwordToggle")

// Chat elements
const chatMessagesDiv = document.getElementById("chatMessages")
const chatInput = document.getElementById("chatInput")
const sendMessage = document.getElementById("sendMessage")
const symptomButtons = document.getElementById("symptomButtons")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners()
  checkLoginStatus()
  initializeNavigation()
})

function initializeEventListeners() {
  // Header navigation
  loginBtn?.addEventListener("click", openLoginModal)
  mobileLoginBtn?.addEventListener("click", openLoginModal)
  logoutBtn?.addEventListener("click", handleLogout)
  mobileLogoutBtn?.addEventListener("click", handleLogout)

  // Mobile menu
  mobileMenuBtn?.addEventListener("click", toggleMobileMenu)

  // Hero buttons
  consultBtn?.addEventListener("click", handleConsultClick)
  askMeBtn?.addEventListener("click", openAskMeModal)

  // Modal controls
  closeLoginModal?.addEventListener("click", closeModal)
  closeAskMeModal?.addEventListener("click", closeModal)

  // Login form
  loginForm?.addEventListener("submit", handleLoginSubmit)
  toggleForm?.addEventListener("click", toggleLoginMode)
  passwordToggle?.addEventListener("click", togglePasswordVisibility)

  // Form validation
  setupFormValidation()

  // Chat functionality
  sendMessage?.addEventListener("click", handleSendMessage)
  chatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  })

  // Symptom buttons
  const symptomBtns = document.querySelectorAll(".symptom-btn")
  symptomBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      handleSymptomClick(this.textContent)
    })
  })

  // Service buttons
  const serviceBtns = document.querySelectorAll(".btn-service")
  serviceBtns.forEach((btn) => {
    btn.addEventListener("click", handleServiceClick)
  })

  // Social login buttons
  document.getElementById("googleLogin")?.addEventListener("click", () => {
    alert("Google login akan diimplementasikan")
  })

  document.getElementById("facebookLogin")?.addEventListener("click", () => {
    alert("Facebook login akan diimplementasikan")
  })

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal()
    }
  })
}

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // If it's an external link (to another page), don't prevent default
      if (href.includes(".html")) {
        return
      }

      // If it's an anchor link, handle smooth scrolling
      if (href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetSection = document.getElementById(targetId)

        if (targetSection) {
          // Remove active class from all links
          navLinks.forEach((l) => l.classList.remove("active"))

          // Add active class to clicked link
          this.classList.add("active")

          // Smooth scroll to section
          const offsetTop = targetSection.offsetTop - 80 // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (mobileNav && mobileNav.classList.contains("active")) {
            toggleMobileMenu()
          }
        }
      }
    })
  })

  // Update active nav link on scroll (only for home page)
  if (window.location.pathname === "/" || window.location.pathname.includes("index.html")) {
    window.addEventListener("scroll", updateActiveNavLink)
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Form validation
function setupFormValidation() {
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const confirmPasswordInput = document.getElementById("confirmPassword")

  if (nameInput) {
    nameInput.addEventListener("blur", () => validateField("name"))
    nameInput.addEventListener("input", () => clearError("name"))
  }

  if (emailInput) {
    emailInput.addEventListener("blur", () => validateField("email"))
    emailInput.addEventListener("input", () => clearError("email"))
  }

  if (passwordInput) {
    passwordInput.addEventListener("blur", () => validateField("password"))
    passwordInput.addEventListener("input", () => clearError("password"))
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("blur", () => validateField("confirmPassword"))
    confirmPasswordInput.addEventListener("input", () => clearError("confirmPassword"))
  }
}

function validateField(fieldName) {
  const input = document.getElementById(fieldName)
  const errorElement = document.getElementById(`${fieldName}Error`)

  if (!input || !errorElement) return true

  const value = input.value.trim()
  let isValid = true
  let errorMessage = ""

  switch (fieldName) {
    case "name":
      if (!isLoginMode) {
        if (value.length < validationRules.name.minLength) {
          isValid = false
          errorMessage = validationRules.name.message
        } else if (!validationRules.name.pattern.test(value)) {
          isValid = false
          errorMessage = validationRules.name.message
        }
      }
      break

    case "email":
      if (!validationRules.email.pattern.test(value)) {
        isValid = false
        errorMessage = validationRules.email.message
      }
      break

    case "password":
      if (value.length < validationRules.password.minLength) {
        isValid = false
        errorMessage = validationRules.password.message
      } else if (!validationRules.password.pattern.test(value)) {
        isValid = false
        errorMessage = validationRules.password.message
      }
      break

    case "confirmPassword":
      if (!isLoginMode) {
        const passwordValue = document.getElementById("password").value
        if (value !== passwordValue) {
          isValid = false
          errorMessage = "Konfirmasi password tidak cocok"
        }
      }
      break
  }

  if (isValid) {
    input.classList.remove("error")
    errorElement.classList.remove("show")
  } else {
    input.classList.add("error")
    errorElement.textContent = errorMessage
    errorElement.classList.add("show")
  }

  return isValid
}

function clearError(fieldName) {
  const input = document.getElementById(fieldName)
  const errorElement = document.getElementById(`${fieldName}Error`)

  if (input && errorElement) {
    input.classList.remove("error")
    errorElement.classList.remove("show")
  }
}

function validateForm() {
  let isValid = true

  if (!validateField("email")) isValid = false
  if (!validateField("password")) isValid = false

  if (!isLoginMode) {
    if (!validateField("name")) isValid = false
    if (!validateField("confirmPassword")) isValid = false
  }

  return isValid
}

// Authentication functions
function checkLoginStatus() {
  const savedUser = localStorage.getItem("dkonsul_user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    isLoggedIn = true
    updateUIForLoggedInUser()
  }
}

function handleLoginSubmit(e) {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  const formData = new FormData(loginForm)
  const email = formData.get("email")
  const password = formData.get("password")
  const name = formData.get("name")

  // Simulate login/registration
  const registeredUsers = JSON.parse(localStorage.getItem("dkonsul_registered_users") || "[]")

  if (isLoginMode) {
    // Login validation
    const user = registeredUsers.find((u) => u.email === email)

    if (!user) {
      showNotification("Akun belum terdaftar. Silakan daftar terlebih dahulu.", "error")
      return
    }

    if (user.password !== password) {
      showNotification("Email atau password tidak sesuai. Silakan coba lagi.", "error")
      return
    }

    // Successful login
    const userData = {
      name: user.name,
      email: user.email,
    }

    currentUser = userData
    isLoggedIn = true
    localStorage.setItem("dkonsul_user", JSON.stringify(userData))
    updateUIForLoggedInUser()
    closeModal()
    showNotification(`Selamat datang kembali, ${userData.name}!`, "success")
  } else {
    // Registration validation
    const existingUser = registeredUsers.find((u) => u.email === email)

    if (existingUser) {
      showNotification("Email sudah terdaftar. Silakan gunakan email lain atau masuk dengan akun yang ada.", "error")
      return
    }

    // Save new user
    const newUser = {
      name: name,
      email: email,
      password: password,
    }

    registeredUsers.push(newUser)
    localStorage.setItem("dkonsul_registered_users", JSON.stringify(registeredUsers))

    // Successful registration
    const userData = {
      name: newUser.name,
      email: newUser.email,
    }

    currentUser = userData
    isLoggedIn = true
    localStorage.setItem("dkonsul_user", JSON.stringify(userData))
    updateUIForLoggedInUser()
    closeModal()
    showNotification(`Pendaftaran berhasil! Selamat datang di dkonsul, ${userData.name}!`, "success")
  }
}

function handleLogout() {
  isLoggedIn = false
  currentUser = null
  localStorage.removeItem("dkonsul_user")
  updateUIForLoggedOutUser()
  showNotification("Anda telah logout", "info")
}

function updateUIForLoggedInUser() {
  // Update header
  if (userInfo) {
    userInfo.style.display = "flex"
    userName.textContent = currentUser.name
  }
  if (mobileUserInfo) {
    mobileUserInfo.style.display = "flex"
    mobileUserName.textContent = currentUser.name
  }

  // Hide login buttons
  if (loginBtn) loginBtn.style.display = "none"
  if (mobileLoginBtn) mobileLoginBtn.style.display = "none"

  // Update consult button
  if (consultBtnText) {
    consultBtnText.textContent = "Mulai Konsultasi"
  }
}

function updateUIForLoggedOutUser() {
  // Hide user info
  if (userInfo) userInfo.style.display = "none"
  if (mobileUserInfo) mobileUserInfo.style.display = "none"

  // Show login buttons
  if (loginBtn) loginBtn.style.display = "block"
  if (mobileLoginBtn) mobileLoginBtn.style.display = "block"

  // Update consult button
  if (consultBtnText) {
    consultBtnText.textContent = "Konsultasi Sekarang"
  }
}

// Modal functions
function openLoginModal() {
  if (loginModal) {
    loginModal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function openAskMeModal() {
  if (askMeModal) {
    askMeModal.classList.add("active")
    document.body.style.overflow = "hidden"
    initializeChat()
  }
}

function showEmergencyModal() {
  if (emergencyModal) {
    emergencyModal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeEmergencyModal() {
  if (emergencyModal) {
    emergencyModal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

function closeModal() {
  if (loginModal) loginModal.classList.remove("active")
  if (askMeModal) askMeModal.classList.remove("active")
  if (emergencyModal) emergencyModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

function toggleLoginMode() {
  isLoginMode = !isLoginMode

  if (isLoginMode) {
    modalTitle.textContent = "Masuk ke dkonsul"
    nameGroup.style.display = "none"
    confirmPasswordGroup.style.display = "none"
    submitBtn.textContent = "Masuk"
    toggleForm.textContent = "Belum punya akun? Daftar di sini"
  } else {
    modalTitle.textContent = "Daftar di dkonsul"
    nameGroup.style.display = "block"
    confirmPasswordGroup.style.display = "block"
    submitBtn.textContent = "Daftar"
    toggleForm.textContent = "Sudah punya akun? Masuk di sini"
  }

  // Clear all errors when switching modes
  clearError("name")
  clearError("email")
  clearError("password")
  clearError("confirmPassword")
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password")
  const icon = passwordToggle.querySelector("i")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    icon.className = "fas fa-eye-slash"
  } else {
    passwordInput.type = "password"
    icon.className = "fas fa-eye"
  }
}

// Navigation functions
function toggleMobileMenu() {
  if (mobileNav) {
    mobileNav.classList.toggle("active")
    const icon = mobileMenuBtn.querySelector("i")

    if (mobileNav.classList.contains("active")) {
      icon.className = "fas fa-times"
    } else {
      icon.className = "fas fa-bars"
    }
  }
}

function handleConsultClick() {
  if (isLoggedIn) {
    showNotification("Menghubungkan dengan dokter...", "info")
    setTimeout(() => {
      showNotification("Fitur konsultasi akan segera tersedia!", "info")
    }, 2000)
  } else {
    openLoginModal()
  }
}

function handleServiceClick() {
  if (isLoggedIn) {
    showNotification("Layanan akan segera tersedia!", "info")
  } else {
    openLoginModal()
  }
}

function bookUrgentConsultation() {
  showNotification("Menghubungkan Anda dengan dokter untuk konsultasi darurat...", "info")

  setTimeout(() => {
    closeEmergencyModal()
    showNotification("Terhubung! Dr. Ahmad akan bergabung dalam panggilan video dalam 2 menit.", "success")
  }, 3000)
}

// Chat functions
function initializeChat() {
  if (chatMessagesDiv) {
    chatMessagesDiv.innerHTML = `
        <div class="message bot-message">
            <div class="message-content">
                <i class="fas fa-robot"></i>
                <p>Halo! Saya asisten virtual dkonsul. Saya akan membantu Anda mengenali gejala yang Anda alami. Ceritakan keluhan Anda atau pilih gejala di bawah ini:</p>
            </div>
        </div>
        <div class="symptom-buttons" id="symptomButtons">
            <p class="symptom-label">Gejala umum:</p>
            <div class="symptom-grid">
                <button class="symptom-btn">Demam</button>
                <button class="symptom-btn">Batuk</button>
                <button class="symptom-btn">Pilek</button>
                <button class="symptom-btn">Sakit kepala</button>
                <button class="symptom-btn">Mual</button>
                <button class="symptom-btn">Diare</button>
                <button class="symptom-btn">Sakit perut</button>
                <button class="symptom-btn">Sesak napas</button>
                <button class="symptom-btn">Pusing</button>
                <button class="symptom-btn">Lemas</button>
            </div>
        </div>
    `

    // Re-attach event listeners for symptom buttons
    const newSymptomBtns = document.querySelectorAll(".symptom-btn")
    newSymptomBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        handleSymptomClick(this.textContent)
      })
    })

    currentQuestionIndex = 0
    if (chatInput) chatInput.value = ""
  }
}

function handleSendMessage() {
  if (chatInput) {
    const message = chatInput.value.trim()
    if (message) {
      addUserMessage(message)
      chatInput.value = ""

      // Simulate bot response
      setTimeout(() => {
        addBotResponse(message)
      }, 1000)
    }
  }
}

function handleSymptomClick(symptom) {
  addUserMessage(symptom)

  // Hide symptom buttons after first selection
  const symptomButtonsDiv = document.getElementById("symptomButtons")
  if (symptomButtonsDiv) {
    symptomButtonsDiv.style.display = "none"
  }

  setTimeout(() => {
    addBotResponse(symptom)
  }, 1000)
}

function addUserMessage(message) {
  if (chatMessagesDiv) {
    const messageDiv = document.createElement("div")
    messageDiv.className = "message user-message"
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <i class="fas fa-user"></i>
        </div>
    `
    chatMessagesDiv.appendChild(messageDiv)
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight
  }
}

function addBotResponse(userMessage) {
  let response = ""

  if (currentQuestionIndex < symptomQuestions.length - 1) {
    currentQuestionIndex++
    response = symptomQuestions[currentQuestionIndex]
  } else {
    response =
      "Berdasarkan gejala yang Anda sampaikan, saya sarankan untuk berkonsultasi dengan dokter. Apakah Anda ingin melanjutkan konsultasi dengan dokter kami?"
  }

  if (chatMessagesDiv) {
    const messageDiv = document.createElement("div")
    messageDiv.className = "message bot-message"
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-robot"></i>
            <p>${response}</p>
        </div>
    `
    chatMessagesDiv.appendChild(messageDiv)
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight
  }
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const iconMap = {
    success: "check-circle",
    error: "exclamation-circle",
    info: "info-circle",
  }

  const colorMap = {
    success: "#4CAF50",
    error: "#f44336",
    info: "#2196F3",
  }

  notification.innerHTML = `
        <i class="fas fa-${iconMap[type]}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colorMap[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        font-size: 0.9rem;
    `

  const button = notification.querySelector("button")
  button.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    `

  button.addEventListener("mouseenter", () => {
    button.style.background = "rgba(255,255,255,0.2)"
  })

  button.addEventListener("mouseleave", () => {
    button.style.background = "none"
  })

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // ESC to close modals
  if (e.key === "Escape") {
    closeModal()
  }
})

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Show welcome message for first-time visitors
  if (!localStorage.getItem("hasVisited")) {
    setTimeout(() => {
      showNotification("Selamat datang di dkonsul! Konsultasi kesehatan pertama Anda hari ini.", "info")
      localStorage.setItem("hasVisited", "true")
    }, 2000)
  }
})
