/* SIDEBAR TOGGLE */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

/* SECTION SWITCH */
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* PROJECT DATA */
function loadProject(p) {
  const data = {
    p1: [
      "Take Token is a web-based application created to handle basic token generation and management workflows. The project focuses on authentication logic, token handling, and practical JavaScript implementation for real-world use cases. This project was built to strengthen understanding of authentication concepts, secure access handling, and frontend logic.",
      "HTML, CSS, JavaScript, MongoDB, Node.js",
      "Token generated successfully. And a simple token management web application designed to generate, manage, and track tokens efficiently. Currently running locally / on github / on render. Visit: https://take-tokon.onrender.com",
      "reports/take-token-report.pdf"
    ],
    p2: [
      "Movie Finder Plus is a frontend web application that helps users discover movies by searching their titles. It fetches real-time movie data from an external API and displays essential details such as ratings, release year, and plot summaries. This project was built to practice API integration, asynchronous JavaScript, and dynamic UI rendering.",
      "HTML, CSS, JavaScript, OMDb API",
      "Movie details displayed. A web application that allows users to search for movies and view detailed information using a public movie database API. Currently running locally / on github. Visit: https://abhi8hero.github.io/movie-finder-plus/",
      "reports/movie-finder-plus-report.pdf"
    ],
    p3: [
      "Arya AI is a web-based chatbot application that allows users to interact with an artificial intelligence system in real time. The project focuses on integrating an AI model into a frontend interface to deliver meaningful and responsive conversations. This project was built to explore AI integration, user experience design, and real-world chatbot implementation.",
      "HTML, CSS, JavaScript, Google Gemini API",
      "AI responses generated for your queries.A smart AI-powered chatbot designed to answer user queries and provide interactive conversations through a clean web interface. Currently running locally / on github / on Hugging face. Visit:https://abhi8hero.github.io/arya-ai/",
      "reports/arya-ai-report.pdf"
    ],
    p4: [
      "Career Guidance Assistant is a web-based application that provides career-related guidance based on user interests and goals.The project focuses on delivering structured career suggestions through a simple and interactive interface.This project was built to strengthen frontend logic, user interaction, and real-world problem-solving skills.",
      "HTML, CSS, JavaScript",
      "Your Interested Career responses generated. A web-based career guidance assistant. An intelligent web application designed to help users explore career paths and make informed career decisions. Currently running locally / on Github. Visit: https://abhi8hero.github.io/career-guidance-assistant/",
      "reports/career-guidance-assistant-report.pdf"
    ],
    p5: [
      "CV Maker is a frontend-based web application designed to simplify the process of building a professional curriculum vitae. Users can enter their personal and professional details and generate a clean, well-structured CV layout. This project was built to practice DOM manipulation, form handling, and real-world UI design using core web technologies.",
      "HTML, CSS, JavaScript",
      "CV with your information. A simple and efficient web application that helps users create professional CVs quickly and easily. Currently running locally / on github. Visit: https://abhi8hero.github.io/CV-Maker/",
      "reports/cv-maker-report.pdf"
    ],
    p6: [
      "Business Boost Agency is a frontend website project designed to represent a digital agency. The goal of this project is to practice real-world website structure, clean UI design, and responsive layouts using core web technologies. This project focuses on simplicity, performance, and professional presentation.",
      "HTML, CSS, JavaScript",
      "A modern, responsive business website built to help agencies and small businesses showcase their services professionally. Currently running locally / on Github. Visit: https://abhi8hero.github.io/Business-Boost-Agency/",
      "reports/BBDMA-report.pdf"
    ]
  };

  document.getElementById("projectDesc").innerText = data[p][0];
  document.getElementById("projectTech").innerText = data[p][1];
  document.getElementById("projectOutput").innerText = data[p][2];
  const reportLink = document.getElementById("projectReportLink");
  reportLink.href = data[p][3];
  
  /* AUTO SCROLL TO ABOUT PROJECT */
  document.getElementById("aboutProject").scrollIntoView({
    behavior: "smooth"
  });
}

/* LICENSE AUTO SCROLL + ACTIVE */
function scrollToLicense(id, el) {
  document.querySelectorAll(".top-nav nav a").forEach(a => {
    a.classList.remove("active");
  });
  el.classList.add("active");

  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

/* CERTIFICATE MODAL */
function openCertModal(imageSrc) {
  const modal = document.getElementById("certModal");
  const img = document.getElementById("certImage");

  img.src = imageSrc;
  modal.style.display = "flex";
}

function closeCertModal() {
  document.getElementById("certModal").style.display = "none";
}
  document.getElementById("certModal").onclick = function(e) {
  if (e.target === this) closeCertModal();
};

/* HTML-ONLY INTERNSHIP HANDLER */
function selectIntern(el) {
  document.getElementById("internAbout").innerText = el.dataset.about;
  document.getElementById("internExp").innerText = el.dataset.exp;

  const certGrid = document.getElementById("internCertGrid");
  certGrid.innerHTML = "";

  const certs = el.dataset.certs.split(",");

  certs.forEach(src => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.onclick = () => openCertModal(src.trim());

    card.innerHTML = `
      <div class="project-img">
        <img src="${src.trim()}" alt="Certificate">
      </div>
      <h3>View Certificate</h3>
    `;

    certGrid.appendChild(card);
  });

  document.getElementById("aboutIntern").scrollIntoView({
    behavior: "smooth"
  });
}


