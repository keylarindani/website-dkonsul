// Articles data
const articles = [
  {
    id: 1,
    title: "Tips Menjaga Kesehatan di Musim Hujan",
    excerpt:
      "Musim hujan sering kali membawa berbagai penyakit. Pelajari cara menjaga kesehatan Anda dan keluarga dengan tips praktis dari para ahli.",
    content: "Musim hujan memang menyegarkan, namun juga membawa tantangan kesehatan tersendiri...",
    category: "Kesehatan Umum",
    author: "Dr. Sarah Wijaya",
    publishDate: "2024-12-15",
    readTime: "5 min",
    views: 1250,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["musim hujan", "pencegahan", "imunitas"],
    featured: true,
  },
  {
    id: 2,
    title: "Panduan Gizi Seimbang untuk Keluarga",
    excerpt:
      "Memahami kebutuhan gizi yang tepat untuk setiap anggota keluarga adalah kunci hidup sehat. Simak panduan lengkap dari ahli gizi.",
    content: "Gizi seimbang merupakan fondasi kesehatan yang optimal untuk seluruh keluarga...",
    category: "Nutrisi",
    author: "Dr. Ahmad Nutritionist",
    publishDate: "2024-12-12",
    readTime: "7 min",
    views: 980,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["nutrisi", "keluarga", "gizi seimbang"],
    featured: false,
  },
  {
    id: 3,
    title: "Mengelola Stres di Era Digital",
    excerpt:
      "Teknologi membawa kemudahan, namun juga dapat menjadi sumber stres. Pelajari cara mengelola stres digital dengan efektif.",
    content: "Era digital memberikan banyak kemudahan, namun juga tantangan baru dalam kesehatan mental...",
    category: "Mental Health",
    author: "Dr. Maya Psikolog",
    publishDate: "2024-12-10",
    readTime: "6 min",
    views: 1450,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["stres", "digital", "mental health"],
    featured: true,
  },
  {
    id: 4,
    title: "Pentingnya Vaksinasi untuk Anak",
    excerpt:
      "Vaksinasi adalah salah satu cara terbaik melindungi anak dari penyakit berbahaya. Ketahui jadwal dan jenis vaksin yang diperlukan.",
    content: "Vaksinasi merupakan investasi terbaik untuk kesehatan anak di masa depan...",
    category: "Kesehatan Anak",
    author: "Dr. Budi Pediatri",
    publishDate: "2024-12-08",
    readTime: "8 min",
    views: 2100,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["vaksinasi", "anak", "imunisasi"],
    featured: false,
  },
  {
    id: 5,
    title: "Cara Menjaga Kesehatan Jantung",
    excerpt:
      "Jantung adalah organ vital yang perlu dijaga dengan baik. Pelajari tips praktis untuk menjaga kesehatan jantung Anda.",
    content: "Kesehatan jantung adalah kunci dari kesehatan tubuh secara keseluruhan...",
    category: "Kardiologi",
    author: "Dr. Siti Kardiolog",
    publishDate: "2024-12-05",
    readTime: "9 min",
    views: 1800,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["jantung", "kardiovaskular", "pencegahan"],
    featured: false,
  },
  {
    id: 6,
    title: "Deteksi Dini Kanker: Yang Perlu Anda Ketahui",
    excerpt: "Deteksi dini kanker dapat menyelamatkan nyawa. Ketahui tanda-tanda dan metode screening yang tersedia.",
    content: "Kanker adalah penyakit yang dapat dicegah dan diobati jika terdeteksi sejak dini...",
    category: "Onkologi",
    author: "Dr. Rudi Onkolog",
    publishDate: "2024-12-03",
    readTime: "10 min",
    views: 2500,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["kanker", "deteksi dini", "screening"],
    featured: true,
  },
]

let filteredArticles = [...articles]
const featuredArticles = articles.filter((article) => article.featured)

// DOM Elements
const articleSearch = document.getElementById("articleSearch")
const categoryFilter = document.getElementById("categoryFilter")
const sortFilter = document.getElementById("sortFilter")
const featuredArticlesContainer = document.getElementById("featuredArticles")
const articlesGrid = document.getElementById("articlesGrid")
const resultsCount = document.getElementById("resultsCount")
const noResults = document.getElementById("noResults")

// Function declaration for showNotification
function showNotification(message, type) {
  console.log(`Notification (${type}): ${message}`)
}

// Initialize articles page
document.addEventListener("DOMContentLoaded", () => {
  initializeArticlesPage()
})

function initializeArticlesPage() {
  renderFeaturedArticles()
  renderArticles()
  setupEventListeners()
}

function setupEventListeners() {
  articleSearch?.addEventListener("input", filterArticles)
  categoryFilter?.addEventListener("change", filterArticles)
  sortFilter?.addEventListener("change", filterArticles)
}

function filterArticles() {
  const searchTerm = articleSearch?.value.toLowerCase() || ""
  const category = categoryFilter?.value || ""
  const sortBy = sortFilter?.value || "newest"

  // Filter articles
  filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    const matchesCategory = !category || article.category === category

    return matchesSearch && matchesCategory
  })

  // Sort articles
  filteredArticles.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      case "oldest":
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
      case "popular":
        return b.views - a.views
      case "readTime":
        return Number.parseInt(a.readTime) - Number.parseInt(b.readTime)
      default:
        return 0
    }
  })

  renderArticles()
  updateResultsCount()
}

function renderFeaturedArticles() {
  if (!featuredArticlesContainer) return

  featuredArticlesContainer.innerHTML = featuredArticles
    .map(
      (article) => `
        <div class="article-card featured-article">
            <div class="featured-badge">Pilihan</div>
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <div class="article-category">${article.category}</div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="article-meta">
                    <div class="article-author">
                        <i class="fas fa-user"></i>
                        ${article.author}
                    </div>
                    <div class="article-read-time">
                        <i class="fas fa-clock"></i>
                        ${article.readTime}
                    </div>
                    <div class="article-views">
                        <i class="fas fa-eye"></i>
                        ${article.views.toLocaleString()}
                    </div>
                </div>
                <button class="btn-primary" onclick="handleReadArticle(${article.id})">
                    Baca Artikel
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function renderArticles() {
  if (!articlesGrid) return

  if (filteredArticles.length === 0) {
    articlesGrid.style.display = "none"
    if (noResults) noResults.style.display = "block"
    return
  }

  articlesGrid.style.display = "grid"
  if (noResults) noResults.style.display = "none"

  articlesGrid.innerHTML = filteredArticles
    .map(
      (article) => `
        <div class="article-card">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <div class="article-category">${article.category}</div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="article-meta">
                    <div class="article-author">
                        <i class="fas fa-user"></i>
                        ${article.author}
                    </div>
                    <div class="article-read-time">
                        <i class="fas fa-clock"></i>
                        ${article.readTime}
                    </div>
                    <div class="article-views">
                        <i class="fas fa-eye"></i>
                        ${article.views.toLocaleString()}
                    </div>
                </div>
                <div class="article-tags">
                    ${article.tags
                      .slice(0, 3)
                      .map((tag) => `<span class="article-tag">#${tag}</span>`)
                      .join("")}
                </div>
                <button class="btn-outline" onclick="handleReadArticle(${article.id})">
                    Baca Selengkapnya
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function updateResultsCount() {
  if (resultsCount) {
    resultsCount.textContent = `Menampilkan ${filteredArticles.length} dari ${articles.length} artikel`
  }
}

function handleReadArticle(articleId) {
  const article = articles.find((a) => a.id === articleId)
  if (article) {
    if (typeof showNotification === "function") {
      showNotification(`Membuka artikel: ${article.title}`, "info")
      setTimeout(() => {
        showNotification("Fitur baca artikel akan segera tersedia!", "info")
      }, 2000)
    } else {
      alert(`Membuka artikel: ${article.title}`)
    }
  }
}
