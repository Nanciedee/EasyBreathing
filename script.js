
/* ==================================
   EASY BREATHING
   TABLEAU DE BORD ET NAVIGATION
================================== */

const programName = "Easy Breathing";

let pauseTimer = null;
let currentDayIndex = null;

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
   ILLUSTRATIONS DES JOURNEES
   (SVG intégré : aucun fichier image requis)
   Pour utiliser votre propre photo, ajoutez dans une
   journée de la liste ci-dessus :
   image: "images/jour1.jpg", imageAlt: "Description"
================================== */

const deg = angle => angle * Math.PI / 180;
const pt = (cx, cy, r, angle) =>
    [cx + r * Math.cos(deg(angle)), cy - r * Math.sin(deg(angle))];
const fx = n => n.toFixed(1);

function rays(cx, cy, r1, r2, angles) {
    return angles.map(angle => {
        const [x1, y1] = pt(cx, cy, r1, angle);
        const [x2, y2] = pt(cx, cy, r2, angle);
        return `<line x1="${fx(x1)}" y1="${fx(y1)}" x2="${fx(x2)}" y2="${fx(y2)}"/>`;
    }).join("");
}

const circ = (cx, cy, r, extra = "") =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" ${extra}/>`;

function sparkle(cx, cy, r) {
    return `<path d="M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z"/>`;
}

function spiralPath() {
    let d = "";
    for (let i = 0; i <= 140; i++) {
        const t = (i / 140) * 6 * Math.PI;
        const r = 4 + t * (82 / (6 * Math.PI));
        const x = 200 + r * Math.cos(t);
        const y = 100 + r * Math.sin(t);
        d += (i === 0 ? "M" : "L") + fx(x) + " " + fx(y);
    }
    return `<path d="${d}"/>`;
}

function compassStar() {
    let d = "";
    for (let i = 0; i < 16; i++) {
        const angle = i * 22.5 - 90;
        const r = i % 2 === 1 ? 14 : (i % 4 === 0 ? 86 : 54);
        const [x, y] = pt(200, 100, r, -angle);
        d += (i === 0 ? "M" : "L") + fx(x) + " " + fx(y);
    }
    return `<path d="${d}Z"/>`;
}

const artMotifs = [
    /* 1 - Lever de soleil */
    () => ({
        line: `<path d="M120 140A80 80 0 0 1 280 140"/><path d="M50 140H350"/>${rays(200, 140, 95, 118, [0, 30, 60, 90, 120, 150, 180])}<path d="M120 160H280M150 176H250"/>`,
        fill: sparkle(80, 50, 8) + sparkle(330, 58, 6)
    }),
    /* 2 - Ondulations */
    () => ({
        line: `<path d="M200 28C190 48 185 56 200 66C215 56 210 48 200 28Z"/>${[30, 60, 90, 120].map(rx => `<ellipse cx="200" cy="124" rx="${rx}" ry="${rx * 0.3}"/>`).join("")}`,
        fill: circ(200, 124, 3)
    }),
    /* 3 - Chemins vers une étoile */
    () => ({
        line: `<path d="M200 182V132"/><path d="M200 132C200 104 140 112 120 76"/><path d="M200 132V72"/><path d="M200 132C200 104 260 112 280 76"/>`,
        fill: sparkle(200, 48, 18) + circ(120, 70, 5) + circ(280, 70, 5)
    }),
    /* 4 - Lotus */
    () => ({
        line: `<path d="M200 150C175 120 175 85 200 55C225 85 225 120 200 150Z"/><path d="M200 150C165 140 140 110 135 80C165 90 190 115 200 150Z"/><path d="M200 150C235 140 260 110 265 80C235 90 210 115 200 150Z"/><path d="M200 150C150 155 110 140 85 110C125 105 170 120 200 150Z"/><path d="M200 150C250 155 290 140 315 110C275 105 230 120 200 150Z"/><path d="M90 168H310"/>`,
        fill: sparkle(200, 30, 7)
    }),
    /* 5 - Montagne et objectif */
    () => ({
        line: `<path d="M40 175L130 75L185 130L245 58L360 175Z"/><path d="M225 82L245 58L265 85"/>`,
        fill: sparkle(245, 28, 14) + sparkle(130, 42, 7) + circ(90, 40, 3) + circ(320, 45, 3)
    }),
    /* 6 - Centrage */
    () => ({
        line: `${[20, 45, 70].map(r => circ(200, 100, r)).join("")}${circ(200, 100, 92, 'stroke-dasharray="3 6"')}${rays(200, 100, 92, 100, [0, 90, 180, 270])}`,
        fill: circ(200, 100, 7)
    }),
    /* 7 - Spirale */
    () => ({
        line: spiralPath(),
        fill: circ(200, 100, 4) + sparkle(330, 40, 7) + sparkle(70, 160, 6)
    }),
    /* 8 - Méditation */
    () => ({
        line: `${circ(200, 100, 80)}${circ(200, 100, 92, 'stroke-dasharray="3 6"')}<path d="M170 132C170 102 185 90 200 90C215 90 230 102 230 132"/><path d="M150 142C170 122 230 122 250 142C240 158 160 158 150 142Z"/>`,
        fill: circ(200, 66, 14)
    }),
    /* 9 - Intuition (troisième oeil) */
    () => ({
        line: `<path d="M70 100C120 40 280 40 330 100C280 160 120 160 70 100Z"/>${circ(200, 100, 30)}${rays(200, 100, 62, 82, [40, 60, 80, 100, 120, 140])}`,
        fill: circ(200, 100, 12) + sparkle(200, 20, 6)
    }),
    /* 10 - Route vers l'avenir */
    () => ({
        line: `<path d="M30 110H370"/><path d="M172 110A28 28 0 0 1 228 110"/><path d="M60 190L185 110M340 190L215 110"/><path d="M200 190V110" stroke-dasharray="6 8"/>`,
        fill: sparkle(90, 50, 8) + sparkle(310, 45, 10) + circ(150, 30, 3) + circ(260, 70, 3)
    }),
    /* 11 - Visualisation combinée */
    () => ({
        line: `${circ(175, 85, 45)}${circ(225, 85, 45)}${circ(200, 128, 45)}`,
        fill: circ(200, 100, 5)
    }),
    /* 12 - Papillon (créativité) */
    () => ({
        line: `<path d="M200 82C160 32 95 42 100 88C103 113 170 110 200 105"/><path d="M200 82C240 32 305 42 300 88C297 113 230 110 200 105"/><path d="M200 108C165 115 120 130 135 160C150 182 190 150 200 125"/><path d="M200 108C235 115 280 130 265 160C250 182 210 150 200 125"/><path d="M200 70C192 56 186 50 180 46M200 70C208 56 214 50 220 46"/>`,
        fill: `<rect x="196" y="68" width="8" height="84" rx="4"/>` + circ(180, 45, 3) + circ(220, 45, 3)
    }),
    /* 13 - Fleur de vie */
    () => ({
        line: `${circ(200, 100, 30)}${[0, 60, 120, 180, 240, 300].map(a => { const [x, y] = pt(200, 100, 30, a); return circ(fx(x), fx(y), 30); }).join("")}${circ(200, 100, 60)}`,
        fill: circ(200, 100, 3)
    }),
    /* 14 - Boussole */
    () => ({
        line: `${circ(200, 100, 72)}${compassStar()}`,
        fill: circ(200, 100, 4) + sparkle(200, 14, 7)
    })
];

const artDecor = [[28, 30], [372, 28], [52, 172], [350, 168], [96, 22], [310, 186]]
    .map(([x, y]) => circ(x, y, 2)).join("");

function artSvg(index) {
    const motif = artMotifs[index % artMotifs.length]();

    return `<svg class="day-art-svg" viewBox="0 0 400 200" aria-hidden="true" focusable="false">` +
        `<g class="ill-fill ill-dim">${artDecor}</g>` +
        `<g class="ill">${motif.line}</g>` +
        `<g class="ill-fill">${motif.fill}</g></svg>`;
}

/* variant : "card" ou "hero" */
function createArt(index, variant) {

    const wrapper = document.createElement("div");
    wrapper.className = `day-art ${variant}`;

    const day = days[index];

    if (day.image) {
        const img = document.createElement("img");
        img.src = day.image;
        img.alt = day.imageAlt || day.title;
        img.loading = "lazy";
        wrapper.appendChild(img);
    } else {
        wrapper.innerHTML = artSvg(index);
    }

    return wrapper;
}


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

    if (pageName !== "day") {
        currentDayIndex = null;
    }

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
        createArt(index, "card"),
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
   EXPORT PDF / IMPRESSION D'UNE JOURNEE
================================== */

const printArea = document.getElementById("printArea");

function getSession(index) {
    return typeof sessions !== "undefined"
        ? sessions.find(item => item.day === index + 1)
        : null;
}

function makeEl(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text) {
        element.textContent = text;
    }
    return element;
}

function buildPrintView(index) {

    const day = days[index];
    const session = getSession(index);

    printArea.innerHTML = "";

    /* En-tête */
    const header = makeEl("header", "print-header");

    const headerText = makeEl("div", "print-header-text");
    headerText.append(
        makeEl("div", "print-brand", "Easy Breathing"),
        makeEl("div", "print-day", `Jour ${index + 1} sur ${days.length}`),
        makeEl("h1", "print-title", day.title),
        makeEl("p", "print-meta", `Durée recommandée : ${day.duration}`)
    );

    const headerArt = makeEl("div", "print-art");

    if (day.image) {
        const img = document.createElement("img");
        img.src = day.image;
        img.alt = "";
        headerArt.appendChild(img);
    } else {
        headerArt.innerHTML = artSvg(index);
    }

    header.append(headerText, headerArt);
    printArea.appendChild(header);

    /* Objectif */
    const objective = makeEl("section", "print-objective");
    objective.append(
        makeEl("h2", "", "Objectif de la journée"),
        makeEl("p", "", session && session.objective
            ? session.objective
            : day.description)
    );
    printArea.appendChild(objective);

    /* Étapes */
    if (session) {

        session.steps.forEach((step, number) => {

            const box = makeEl("section", `print-step ${step.type}`);

            box.appendChild(makeEl(
                "div",
                "print-step-label",
                `Étape ${number + 1} · ${stepLabels[step.type] || step.type}`
            ));

            box.appendChild(makeEl("h2", "", step.title));

            if (step.text) {
                box.appendChild(makeEl("p", "", step.text));
            }

            if (step.type === "pause" && step.duration) {
                box.appendChild(makeEl(
                    "p",
                    "print-pause",
                    `Pause silencieuse de ${step.duration} secondes. Respirez calmement.`
                ));
            }

            if (step.type === "reflection" && step.questions) {

                step.questions.forEach((question, i) => {

                    const id = `${step.id}-q${i + 1}`;
                    const answer = progress.reflections[id];

                    box.appendChild(makeEl("p", "print-question", question));

                    if (answer) {
                        box.appendChild(makeEl("p", "print-answer", answer));
                    } else {
                        const lines = makeEl("div", "print-lines");
                        for (let n = 0; n < 3; n++) {
                            lines.appendChild(makeEl("div"));
                        }
                        box.appendChild(lines);
                    }
                });
            }

            printArea.appendChild(box);
        });

    } else {

        printArea.appendChild(makeEl(
            "p",
            "print-note",
            "Les instructions détaillées de cette journée seront ajoutées prochainement."
        ));
    }

    /* Pied de fiche */
    const footer = makeEl("div", "print-footer");
    const done = isCompleted(index)
        ? `☑ Journée terminée le ${formatDate(progress.completed[index])}`
        : "☐ Journée terminée le ____ / ____ / ________";
    footer.append(
        makeEl("p", "", done),
        makeEl("p", "print-tagline", "Easy Breathing — Un jour à la fois.")
    );
    printArea.appendChild(footer);
}

function createPrintButton(index) {

    const button = document.createElement("button");
    button.className = "secondary-button print-button";
    button.textContent = "🖨 Exporter en PDF / Imprimer";

    button.addEventListener("click", () => {
        buildPrintView(index);
        window.print();
    });

    return button;
}

/* Ctrl+P / Cmd+P sur une page de journée */
window.addEventListener("beforeprint", () => {
    if (currentDayIndex !== null) {
        buildPrintView(currentDayIndex);
    }
});


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
        createArt(index, "hero"),
        eyebrow,
        title,
        duration,
        descriptionTitle,
        description
    );

    currentDayIndex = index;

    const session = getSession(index);

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

    const actions = document.createElement("div");
    actions.className = "day-actions";
    actions.append(
        createCompleteButton(index),
        createPrintButton(index)
    );
    article.appendChild(actions);

    const printHint = document.createElement("p");
    printHint.className = "small-text";
    printHint.textContent =
        "Dans la fenêtre d'impression, choisissez « Enregistrer au format PDF » comme imprimante.";
    article.appendChild(printHint);

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

    const welcomeArt = document.getElementById("welcomeArt");

    if (welcomeArt) {
        welcomeArt.innerHTML = artSvg(3);
    }

    displayDashboardDays();

    displayAllDays();

    updateProgress();

    showPage("dashboard");

}

initializeApp();
