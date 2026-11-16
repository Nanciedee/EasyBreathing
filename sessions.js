
const sessions = [
  {
    id: 1,
    day: 1,
    title: "Introduction et prise de conscience",
    duration: 20,
    objective: "Découvrir la relaxation et commencer à développer son espace intérieur.",

    steps: [
      {
        id: "day1-step1",
        type: "narration",
        title: "Accueil et préparation",
        text: "Bienvenue dans votre première séance Easy Breathing. Installez-vous confortablement..."
      },
      {
        id: "day1-step2",
        type: "breathing",
        title: "Respiration naturelle",
        text: "Prenez une inspiration naturelle, puis expirez lentement.",
      },
      {
        id: "day1-step3",
        type: "pause",
        title: "Pause silencieuse",
        duration: 30
      },
      {
        id: "day1-step4",
        type: "narration",
        title: "Relaxation progressive",
        text: "Relâchez doucement votre front, votre visage et vos épaules..."
      },
      {
        id: "day1-step5",
        type: "affirmation",
        title: "Affirmation du jour",
        text: "Je prends le temps de découvrir mes ressources intérieures. Je progresse avec calme, confiance et patience."
      },
      {
        id: "day1-step6",
        type: "return",
        title: "Retour progressif",
        text: "Je vais compter doucement de 1 à 5. À 1, vous commencez à revenir..."
      },
      {
        id: "day1-step7",
        type: "reflection",
        title: "Réflexion personnelle",
        questions: [
          "Comment vous êtes-vous senti pendant cette séance ?",
          "Quelle partie de la relaxation avez-vous préférée ?",
          "Qu'aimeriez-vous approfondir demain ?"
        ]
      }
    ]
  }
];
