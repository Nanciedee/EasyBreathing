
/* ==================================
   EASY BREATHING
   TABLEAU DE BORD ET NAVIGATION
================================== */

const programName = "Easy Breathing";

let pauseTimer = null;

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
   PROGRESSION SAUVEGARDEE
   (enregistrée dans le navigateur)
================================== */

const STORAGE_KEY = "easyBreathingProgress";
const OLD_STORAGE_KEY = "easyBreathingCompletedDays";

function emptyProgress() {
    return { version: 2, completed: {}, reflections: {} };
}

/* Vérifie et nettoie des données (stockage ou fichier importé) */
function sanitizeProgress(data) {

    const clean = emptyProgress();

    if (!data || typeof data !== "object") {
        return clean;
    }

    if (data.completed && typeof data.completed === "object") {
        Object.entries(data.completed).forEach(([key, value]) => {
            const index = Number(key);
            if (Number.isInteger(index) && index >= 0 && index < days.length) {
                clean.completed[index] =
                    typeof value === "string" ? value : new Date().toISOString();
            }
        });
    }

    if (data.reflections && typeof data.reflections === "object") {
        Object.entries(data.reflections).forEach(([key, value]) => {
            if (/^[\w-]+$/.test(key) && typeof value === "string" && value) {
                clean.reflections[key] = value.slice(0, 5000);
            }
        });
    }

    return clean;
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw) {
            return sanitizeProgress(JSON.parse(raw));
        }

        /* Ancienne version : simple liste de jours terminés */
        const old = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY));

        if (Array.isArray(old)) {
            const migrated = emptyProgress();
            old.forEach(index => {
                if (Number.isInteger(index) && index >= 0 && index < days.length) {
                    migrated.completed[index] = new Date().toISOString();
                }
            });
            return migrated;
        }
    } catch (error) {
        /* données illisibles : on repart de zéro */
    }

    return emptyProgress();
}

let progress = loadProgress();

function setSaveStatus(ok) {

    const status = document.getElementById("saveStatus");

    if (!status) {
        return;
    }

    if (ok) {
        const time = new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        status.textContent = `✓ Enregistré à ${time}`;
    } else {
        status.textContent =
            "⚠ Enregistrement impossible : pensez à exporter votre progression";
    }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        setSaveStatus(true);
        return true;
    } catch (error) {
        setSaveStatus(false);
        return false;
    }
}

function isCompleted(index) {
    return Object.prototype.hasOwnProperty.call(progress.completed, index);
}

function completedCount() {
    return Object.keys(progress.completed).length;
}

function formatDate(iso) {
    const date = new Date(iso);
    return isNaN(date)
        ? ""
        : date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

let reflectionTimer = null;

function saveReflection(id, value) {

    if (value) {
        progress.reflections[id] = value;
    } else {
        delete progress.reflections[id];
    }

    clearTimeout(reflectionTimer);

    reflectionTimer = setTimeout(() => {
        reflectionTimer = null;
        saveProgress();
    }, 400);
}


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

    clearInterval(pauseTimer);

    const activeButton = document.querySelector(
        `.nav-link[data-page="${pageName === "day" ? "program" : pageName}"]`
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }

    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");

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

    if (isCompleted(index)) {
        card.classList.add("done");

        const badge = document.createElement("span");
        badge.className = "done-badge";
        badge.textContent = "✓ Terminée";
        number.appendChild(badge);
    }

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
   ETAPES D'UNE SEANCE
================================== */

const stepLabels = {
    narration: "Guidage",
    breathing: "Respiration",
    pause: "Pause",
    affirmation: "Affirmation",
    return: "Retour",
    reflection: "Réflexion"
};

function createStep(step) {

    const box = document.createElement("div");
    box.className = `step ${step.type}`;

    const label = document.createElement("span");
    label.className = "step-type";
    label.textContent = stepLabels[step.type] || step.type;

    const title = document.createElement("h3");
    title.textContent = step.title;

    box.append(label, title);

    if (step.text) {
        const text = document.createElement("p");
        text.textContent = step.text;
        box.appendChild(text);
    }

    if (step.type === "pause" && step.duration) {
        box.appendChild(createPauseTimer(step.duration));
    }

    if (step.type === "reflection" && step.questions) {
        step.questions.forEach((question, i) => {

            const id = `${step.id}-q${i + 1}`;

            const questionLabel = document.createElement("label");
            questionLabel.className = "reflection-question";
            questionLabel.htmlFor = id;
            questionLabel.textContent = question;

            const field = document.createElement("textarea");
            field.id = id;
            field.placeholder = "Écrivez ici… votre réponse est enregistrée automatiquement.";
            field.value = progress.reflections[id] || "";

            field.addEventListener("input", () => {
                saveReflection(id, field.value);
            });

            box.append(questionLabel, field);
        });
    }

    return box;
}

function createPauseTimer(seconds) {

    const button = document.createElement("button");
    button.textContent = `Démarrer la pause (${seconds} s)`;

    button.addEventListener("click", () => {

        clearInterval(pauseTimer);

        let remaining = seconds;
        button.disabled = true;
        button.textContent = `${remaining} s`;

        pauseTimer = setInterval(() => {

            remaining--;

            if (remaining <= 0) {
                clearInterval(pauseTimer);
                button.disabled = false;
                button.textContent = "Pause terminée — recommencer";
            } else {
                button.textContent = `${remaining} s`;
            }

        }, 1000);
    });

    return button;
}


/* ==================================
   BOUTON "JOURNEE TERMINEE"
================================== */

function createCompleteButton(index) {

    const button = document.createElement("button");
    button.className = "complete-button";

    function refresh() {
        const done = isCompleted(index);
        button.classList.toggle("is-done", done);

        if (done) {
            const date = formatDate(progress.completed[index]);
            button.textContent = date
                ? `✓ Journée terminée le ${date} (annuler)`
                : "✓ Journée terminée (annuler)";
        } else {
            button.textContent = "Marquer cette journée comme terminée";
        }
    }

    button.addEventListener("click", () => {

        if (isCompleted(index)) {
            delete progress.completed[index];
        } else {
            progress.completed[index] = new Date().toISOString();
        }

        saveProgress();
        refresh();
        refreshAll();
    });

    refresh();

    return button;
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

    article.append(
        eyebrow,
        title,
        duration,
        descriptionTitle,
        description
    );

    const session = typeof sessions !== "undefined"
        ? sessions.find(item => item.day === index + 1)
        : null;

    if (session) {

        session.steps.forEach(step => {
            article.appendChild(createStep(step));
        });

    } else {

        const placeholder = document.createElement("div");
        placeholder.className = "detail-placeholder";

        const placeholderTitle = document.createElement("h3");
        placeholderTitle.textContent = "Contenu de l'exercice";

        const placeholderText = document.createElement("p");
        placeholderText.textContent =
            "Les instructions détaillées de cette journée seront intégrées dans une prochaine étape.";

        placeholder.append(placeholderTitle, placeholderText);
        article.appendChild(placeholder);
    }

    article.appendChild(createCompleteButton(index));

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

    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));

});


/* ==================================
   MISE A JOUR DE LA PROGRESSION
================================== */

function updateProgress() {

    const completed = completedCount();

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
   SAUVEGARDE : EXPORT / IMPORT / REINITIALISATION
================================== */

function refreshAll() {
    displayDashboardDays();
    displayAllDays();
    updateProgress();
}

function exportProgress() {

    const payload = {
        app: programName,
        exportedAt: new Date().toISOString(),
        ...progress
    };

    const blob = new Blob(
        [JSON.stringify(payload, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
        `easy-breathing-progression-${new Date().toISOString().slice(0, 10)}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const importInput = document.getElementById("importInput");

document.getElementById("exportButton")
    .addEventListener("click", exportProgress);

document.getElementById("importButton")
    .addEventListener("click", () => importInput.click());

importInput.addEventListener("change", () => {

    const file = importInput.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);

            if (!data || typeof data !== "object" ||
                (!data.completed && !data.reflections)) {
                throw new Error("invalid");
            }

            const imported = sanitizeProgress(data);

            if (!confirm(
                "Importer cette sauvegarde remplacera votre progression actuelle. Continuer ?"
            )) {
                return;
            }

            progress = imported;
            saveProgress();
            refreshAll();

        } catch (error) {
            alert("Ce fichier n'est pas une sauvegarde Easy Breathing valide.");
        }
    };

    reader.readAsText(file);
    importInput.value = "";
});

document.getElementById("resetButton")
    .addEventListener("click", () => {

        if (!confirm(
            "Effacer toute votre progression et vos réponses ? Cette action est définitive."
        )) {
            return;
        }

        progress = emptyProgress();
        saveProgress();
        refreshAll();
    });

/* Dernier enregistrement si on quitte la page en pleine saisie */
window.addEventListener("pagehide", () => {
    if (reflectionTimer) {
        clearTimeout(reflectionTimer);
        reflectionTimer = null;
        saveProgress();
    }
});


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
