
/* ==================================
   EASY BREATHING
   TABLEAU DE BORD ET NAVIGATION
================================== */

const programName = "Easy Breathing";

/* ==================================
   INFORMATIONS DES 14 JOURNEES
================================== */

const days = [
    {
        title: "Introduction et prise de conscience",
        duration: "15 à 20 minutes",
        description: "Découvrir le programme et préparer son esprit à la pratique."
    },
    {
        title: "Relaxation Alpha",
        duration: "15 à 20 minutes",
        description: "Apprendre à se détendre profondément et progressivement."
    },
    {
        title: "Visualisation et résolution de problèmes",
        duration: "20 minutes",
        description: "Utiliser la visualisation pour explorer différentes solutions."
    },
    {
        title: "Relaxation progressive",
        duration: "15 minutes",
        description: "Relâcher les tensions physiques et mentales."
    },
    {
        title: "Visualisation des objectifs",
        duration: "15 à 20 minutes",
        description: "Clarifier ses objectifs et visualiser leur réalisation."
    },
    {
        title: "Centrage mental",
        duration: "10 à 15 minutes",
        description: "Développer sa concentration et son calme intérieur."
    },
    {
        title: "Revue et intégration",
        duration: "20 minutes",
        description: "Faire le point sur les apprentissages de la première semaine."
    },
    {
        title: "Méditation guidée avancée",
        duration: "20 minutes",
        description: "Approfondir la relaxation et la pratique méditative."
    },
    {
        title: "Activation de l'intuition",
        duration: "15 à 20 minutes",
        description: "Développer son écoute intérieure et son intuition."
    },
    {
        title: "Projection dans le futur",
        duration: "15 minutes",
        description: "Visualiser positivement les prochaines étapes de sa vie."
    },
    {
        title: "Visualisation combinée",
        duration: "20 minutes",
        description: "Combiner plusieurs techniques de visualisation."
    },
    {
        title: "Relaxation et créativité",
        duration: "15 minutes",
        description: "Explorer les idées et stimuler sa créativité."
    },
    {
        title: "Méditation intégrative",
        duration: "20 minutes",
        description: "Réunir les techniques apprises durant le programme."
    },
    {
        title: "Bilan et planification future",
        duration: "20 à 30 minutes",
        description: "Faire le bilan des 14 jours et préparer la suite."
    }
];


/* ==================================
   ELEMENTS HTML
================================== */

const dashboardPage = document.getElementById("dashboardPage");
const programPage = document.getElementById("programPage");
const dayPage = document.getElementById("dayPage");
const aboutPage = document.getElementById("aboutPage");

const dashboardDays = document.getElementById("dashboardDays");
const allDays = document.getElementById("allDays");
const dayDetails = document.getElementById("dayDetails");

const navigation = document.getElementById("navigation");
const menuButton = document.getElementById("menuButton");


/* ==================================
   NAVIGATION ENTRE LES PAGES
================================== */

function showPage(pageName) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.remove("active");
    });

    if (pageName === "dashboard") {

        dashboardPage.classList.add("active");

    } else if (pageName === "program") {

        programPage.classList.add("active");

    } else if (pageName === "day") {

        dayPage.classList.add("active");

    } else if (pageName === "about") {

        aboutPage.classList.add("active");

    }

    const activeButton = document.querySelector(
        `.nav-link[data-page="${pageName}"]`
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }

    navigation.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==================================
   AFFICHER LES CARTES DES JOURNEES
================================== */

function createDayCard(day, index) {

    const card = document.createElement("article");

    card.className = "day-card";

    const number = document.createElement("span");
    number.className = "day-number";
    number.textContent = `JOUR ${index + 1}`;

    const title = document.createElement("h3");
    title.textContent = day.title;

    const description = document.createElement("p");
    description.textContent = day.description;

    const duration = document.createElement("span");
    duration.className = "day-duration";
    duration.textContent = `⏱ ${day.duration}`;

    const button = document.createElement("button");
    button.textContent = "Consulter cette journée →";

    button.addEventListener("click", () => {
        openDay(index);
    });

    card.append(
        number,
        title,
        description,
        duration,
        button
    );

    return card;
}


/* ==================================
   AFFICHER LES 14 JOURNEES
================================== */

function displayDashboardDays() {

    dashboardDays.innerHTML = "";

    days.slice(0, 6).forEach((day, index) => {

        dashboardDays.appendChild(
            createDayCard(day, index)
        );

    });

}


function displayAllDays() {

    allDays.innerHTML = "";

    days.forEach((day, index) => {

        allDays.appendChild(
            createDayCard(day, index)
        );

    });

}


/* ==================================
   OUVRIR UNE FICHE QUOTIDIENNE
================================== */

function openDay(index) {

    const day = days[index];

    dayDetails.innerHTML = "";

    const article = document.createElement("article");
    article.className = "day-details";

    const eyebrow = document.createElement("span");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = `PROGRAMME ${programName.toUpperCase()} · JOUR ${index + 1}`;

    const title = document.createElement("h2");
    title.textContent = day.title;

    const duration = document.createElement("p");
    duration.textContent = `⏱ Durée recommandée : ${day.duration}`;

    const descriptionTitle = document.createElement("h3");
    descriptionTitle.textContent = "Objectif de la journée";

    const description = document.createElement("p");
    description.textContent = day.description;

    const placeholder = document.createElement("div");
    placeholder.className = "detail-placeholder";

    const placeholderTitle = document.createElement("h3");
    placeholderTitle.textContent = "Contenu de l'exercice";

    const placeholderText = document.createElement("p");
    placeholderText.textContent =
        "Les instructions détaillées de cette journée seront intégrées dans une prochaine étape.";

    placeholder.append(
        placeholderTitle,
        placeholderText
    );

    article.append(
        eyebrow,
        title,
        duration,
        descriptionTitle,
        description,
        placeholder
    );

    dayDetails.appendChild(article);

    showPage("day");
}


/* ==================================
   BOUTONS DE NAVIGATION
================================== */

document.querySelectorAll(".nav-link").forEach(button => {

    button.addEventListener("click", () => {

        showPage(button.dataset.page);

    });

});


/* ==================================
   BOUTON COMMENCER
================================== */

document.getElementById("startButton")
    .addEventListener("click", () => {

        showPage("program");

    });


/* ==================================
   BOUTON VOIR LES 14 JOURS
================================== */

document.getElementById("allDaysButton")
    .addEventListener("click", () => {

        showPage("program");

    });


/* ==================================
   BOUTON RETOUR
================================== */

document.getElementById("backButton")
    .addEventListener("click", () => {

        showPage("program");

    });


/* ==================================
   MENU MOBILE
================================== */

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});


/* ==================================
   PROGRESSION INITIALE
================================== */

function updateProgress() {

    const completed = 0;

    const percentage = Math.round(
        (completed / days.length) * 100
    );

    document.getElementById("completedCount")
        .textContent = completed;

    document.getElementById("progressPercent")
        .textContent = percentage + " %";

    document.getElementById("progressText")
        .textContent = `${completed} sur ${days.length} journées`;

    document.getElementById("progressFill")
        .style.width = percentage + "%";

}


/* ==================================
   INITIALISATION
================================== */

function initializeApp() {

    displayDashboardDays();

    displayAllDays();

    updateProgress();

    showPage("dashboard");

}

initializeApp();
