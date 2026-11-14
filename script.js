"use strict";

/* ================================
   CONTENT
================================ */

const poems = [
  {
    title: "Ordinary Days",
    text: `Some days are just days,
nothing special, nothing new.
But somehow, even the simplest ones
can become a little better
because of someone you talked to.`
  },
  {
    title: "Coincidences",
    text: `Funny how life works,
people come and go,
some stay for a moment,
some become part of your days.
And sometimes, you don't even notice
when someone starts to matter.`
  },
  {
    title: "A Little Light",
    text: `Not every light needs to shine brightly.
Sometimes it's just a small glow,
something that makes things feel warmer,
even on the quietest days.
And that's already enough.`
  },
  {
    title: "Unsaid",
    text: `There are things I never say,
not because they're secrets,
but because I never find the right words.
Maybe some things are easier
to leave between the lines.`
  },
  {
    title: "Somewhere",
    text: `Somewhere between random conversations
and moments that seem to mean nothing,
there's a little place
where certain people
quietly become important.`
  },
  {
    title: "The Little Things",
    text: `It's never always about big moments.
Sometimes it's a silly joke,
a random message,
a familiar nickname,
or something small
that makes you smile for no reason.`
  },
  {
    title: "Passing Time",
    text: `Days pass,
conversations change,
and little moments disappear.
But some memories stay around
longer than you expected.`
  },
  {
    title: "Different",
    text: `I don't really know how to explain it.
There's nothing extraordinary about it,
nothing that needs a big explanation.
Some people just make things
feel a little different.`
  }
];

const thoughts = [
  {
    title: "A conversation",
    text: "Sometimes a completely normal conversation becomes the best part of your day. I don't think the other person always realizes that."
  },
  {
    title: "Little details",
    text: "It's strange how you can remember the smallest things about someone without even trying."
  },
  {
    title: "Timing",
    text: "Sometimes you have something to say, but the moment never feels quite right."
  },
  {
    title: "A notification",
    text: "Not every notification makes you look at your phone twice. Some just do."
  },
  {
    title: "Random thoughts",
    text: "I wonder how many times people cross each other's minds without ever knowing."
  },
  {
    title: "Familiarity",
    text: "There's something nice about having someone you can talk to without having to think too much about what to say."
  },
  {
    title: "A smile",
    text: "Some jokes aren't even that funny. Maybe it's just the person you're sharing them with."
  },
  {
    title: "Unexpected",
    text: "Some of the nicest parts of life are the ones you never really planned."
  },
  {
    title: "Unsaid",
    text: "Maybe not everything needs to be explained. Some things can just stay quietly between the lines."
  },
  {
    title: "One last thought",
    text: "I don't know if you notice these little things, but I hope they make your day a little better."
  }
];

/* ================================
   SMALL UNIVERSE CONTENT
================================ */

const universeContent = {
  moon: {
    eyebrow: "A QUIET REFLECTION",
    title: "The Moon",
    text: "The moon doesn't try to be noticed. It just stays there, making the night a little less dark. Some things are nice without needing to do much."
  },

  stars: {
    eyebrow: "A FEW LITTLE REMINDERS",
    title: "The Stars",
    messages: [
      "You deserve more good days than bad ones.",
      "Don't forget to enjoy the little things.",
      "Even ordinary days can become good memories.",
      "There's always something worth looking forward to.",
      "Take your time. There's no rush."
    ]
  },

  clouds: {
    eyebrow: "THOUGHTS PASSING BY",
    title: "The Clouds",
    messages: [
      "I wonder what tomorrow will bring.",
      "It's nice when things happen without being planned.",
      "Sometimes doing nothing is exactly what you need.",
      "A random laugh can fix a surprisingly bad day.",
      "Not everything needs a reason."
    ]
  },

  comet: {
    eyebrow: "SOMETHING UNEXPECTED",
    title: "The Comet",
    text: "Some things are unexpected. That's what makes them nice."
  }
};

/* ================================
   STORAGE AND STATE
================================ */

const STORAGE_KEY = "somewhere-in-my-mind-progress-v1";

const state = {
  readPoems: new Set(),
  readThoughts: new Set(),
  exploredObjects: new Set(),

  starMessageIndex: -1,
  cloudMessageIndex: -1
};

const screens = [
  "introScreen",
  "hubScreen",
  "poemsScreen",
  "thoughtsScreen",
  "universeScreen",
  "endingScreen",
  "finalScreen"
];

/* ================================
   ELEMENT REFERENCES
================================ */

const detailDialog = document.getElementById("detailDialog");

const dialogEyebrow = document.getElementById("dialogEyebrow");
const dialogTitle = document.getElementById("dialogTitle");
const dialogBody = document.getElementById("dialogBody");
const dialogExtra = document.getElementById("dialogExtra");

const toast = document.getElementById("toast");

let toastTimer = null;

/* ================================
   BACKGROUND STARFIELD
================================ */

function createStarfield() {
  const field = document.getElementById("starfield");

  if (!field) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 95; i += 1) {
    const star = document.createElement("span");

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.setProperty(
      "--size",
      `${Math.random() * 1.8 + 0.7}px`
    );

    star.style.setProperty(
      "--opacity",
      `${Math.random() * 0.45 + 0.12}`
    );

    star.style.setProperty(
      "--duration",
      `${Math.random() * 4 + 3}s`
    );

    star.style.setProperty(
      "--delay",
      `${Math.random() * -7}s`
    );

    fragment.appendChild(star);
  }

  field.appendChild(fragment);
}

/* ================================
   SCREEN NAVIGATION
================================ */

function showScreen(screenId) {
  if (!screens.includes(screenId)) return;

  screens.forEach((id) => {
    const screen = document.getElementById(id);

    const isActive = id === screenId;

    screen.hidden = !isActive;
    screen.classList.toggle("active", isActive);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function startExperience() {
  showScreen("hubScreen");
}

function returnToHub() {
  if (detailDialog.open) {
    closeDialog();
  }

  showScreen("hubScreen");
}

/* ================================
   TOAST NOTIFICATIONS
================================ */

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/* ================================
   SAVE PROGRESS
================================ */

function saveProgress() {
  const data = {
    readPoems: [...state.readPoems],
    readThoughts: [...state.readThoughts],
    exploredObjects: [...state.exploredObjects]
  };

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  } catch (error) {
    // The experience still works if storage is unavailable.
  }
}

/* ================================
   LOAD SAVED PROGRESS
================================ */

function loadProgress() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const data = JSON.parse(saved);

    if (Array.isArray(data.readPoems)) {
      data.readPoems
        .filter(
          (index) =>
            Number.isInteger(index) &&
            index >= 0 &&
            index < poems.length
        )
        .forEach((index) => {
          state.readPoems.add(index);
        });
    }

    if (Array.isArray(data.readThoughts)) {
      data.readThoughts
        .filter(
          (index) =>
            Number.isInteger(index) &&
            index >= 0 &&
            index < thoughts.length
        )
        .forEach((index) => {
          state.readThoughts.add(index);
        });
    }

    if (Array.isArray(data.exploredObjects)) {
      data.exploredObjects
        .filter((id) =>
          Object.prototype.hasOwnProperty.call(
            universeContent,
            id
          )
        )
        .forEach((id) => {
          state.exploredObjects.add(id);
        });
    }

  } catch (error) {
    // If saved data is damaged, start with fresh progress.
  }
}

/* ================================
   CREATE CONTENT CARDS
================================ */

function createContentCard({
  number,
  title,
  status,
  datasetName,
  datasetValue,
  isRead
}) {
  const card = document.createElement("button");

  card.type = "button";

  card.className = `content-card${isRead ? " is-read" : ""}`;

  card.dataset[datasetName] = String(datasetValue);

  const numberElement = document.createElement("span");
  numberElement.className = "item-number";
  numberElement.textContent = number;

  const titleElement = document.createElement("span");
  titleElement.className = "item-title";
  titleElement.textContent = title;

  const statusElement = document.createElement("span");
  statusElement.className = "item-status";

  statusElement.textContent = isRead
    ? "READ · DISCOVER AGAIN"
    : status;

  card.append(
    numberElement,
    titleElement,
    statusElement
  );

  return card;
}

/* ================================
   RENDER POEMS
================================ */

function renderPoems() {
  const grid = document.getElementById("poemGrid");

  grid.replaceChildren();

  poems.forEach((poem, index) => {
    const card = createContentCard({
      number: `POEM ${String(index + 1).padStart(2, "0")}`,
      title: poem.title,
      status: "OPEN TO READ",
      datasetName: "poemIndex",
      datasetValue: index,
      isRead: state.readPoems.has(index)
    });

    grid.appendChild(card);
  });
}

/* ================================
   RENDER THOUGHTS
================================ */

function renderThoughts() {
  const grid = document.getElementById("thoughtGrid");

  grid.replaceChildren();

  thoughts.forEach((thought, index) => {
    const card = createContentCard({
      number: `NOTE ${String(index + 1).padStart(2, "0")}`,
      title: thought.title,
      status: "OPEN TO READ",
      datasetName: "thoughtIndex",
      datasetValue: index,
      isRead: state.readThoughts.has(index)
    });

    grid.appendChild(card);
  });
}

/* ================================
   COMPLETION CHECK
================================ */

function isJourneyComplete() {
  return (
    state.readPoems.size === poems.length &&
    state.readThoughts.size === thoughts.length &&
    state.exploredObjects.size ===
      Object.keys(universeContent).length
  );
}

/* ================================
   UPDATE ALL PROGRESS
================================ */

function updateProgress() {
  const total =
    poems.length +
    thoughts.length +
    Object.keys(universeContent).length;

  const completed =
    state.readPoems.size +
    state.readThoughts.size +
    state.exploredObjects.size;

  const percentage = (completed / total) * 100;

  document.getElementById("overallProgressText").textContent =
    `${completed} / ${total} DISCOVERED`;

  document.getElementById("overallProgressFill").style.width =
    `${percentage}%`;

  document.getElementById("poemsCardProgress").textContent =
    `${state.readPoems.size} / ${poems.length}`;

  document.getElementById("thoughtsCardProgress").textContent =
    `${state.readThoughts.size} / ${thoughts.length}`;

  document.getElementById("universeCardProgress").textContent =
    `${state.exploredObjects.size} / ${Object.keys(universeContent).length}`;

  document.getElementById("poemsProgress").textContent =
    `${state.readPoems.size} / ${poems.length} READ`;

  document.getElementById("thoughtsProgress").textContent =
    `${state.readThoughts.size} / ${thoughts.length} READ`;

  document.getElementById("universeProgress").textContent =
    `${state.exploredObjects.size} / ${Object.keys(universeContent).length}`;

  /* FINAL SECTION LOCK */

  const endingCard = document.getElementById("endingCard");
  const endingLock = document.getElementById("endingLock");
  const endingDescription = document.getElementById(
    "endingCardDescription"
  );

  const unlocked = isJourneyComplete();

  endingCard.disabled = !unlocked;

  endingCard.classList.toggle(
    "is-locked",
    !unlocked
  );

  endingCard.classList.toggle(
    "is-unlocked",
    unlocked
  );

  endingLock.textContent = unlocked ? "✦" : "⌑";

  endingLock.setAttribute(
    "aria-label",
    unlocked ? "Unlocked" : "Locked"
  );

  endingDescription.textContent = unlocked
    ? "A little something, waiting for you"
    : "A little something, still hidden";

  /* UNIVERSE OBJECT CHECKS */

  document.querySelectorAll("[data-object-id]").forEach((button) => {
    button.classList.toggle(
      "is-explored",
      state.exploredObjects.has(button.dataset.objectId)
    );
  });
}

/* ================================
   READING WINDOW
================================ */

function openDialog({
  eyebrow,
  title,
  text,
  extraButton
}) {
  dialogEyebrow.textContent = eyebrow || "A LITTLE NOTE";

  dialogTitle.textContent = title || "A little thought";

  dialogBody.textContent = text || "";

  dialogExtra.replaceChildren();

  if (extraButton) {
    const button = document.createElement("button");

    button.type = "button";
    button.dataset.dialogExtra = extraButton.action;
    button.textContent = extraButton.label;

    dialogExtra.appendChild(button);
  }

  if (typeof detailDialog.showModal === "function") {
    if (!detailDialog.open) {
      detailDialog.showModal();
    }
  } else {
    detailDialog.setAttribute("open", "open");
  }
}

function closeDialog() {
  if (
    typeof detailDialog.close === "function" &&
    detailDialog.open
  ) {
    detailDialog.close();
  } else {
    detailDialog.removeAttribute("open");
  }
}

/* ================================
   OPEN A POEM
================================ */

function openPoem(index) {
  const poem = poems[index];

  if (!poem) return;

  state.readPoems.add(index);

  saveProgress();
  renderPoems();
  updateProgress();

  openDialog({
    eyebrow: `LITTLE POEMS · ${String(index + 1).padStart(2, "0")} / 08`,
    title: poem.title,
    text: poem.text
  });
}

/* ================================
   OPEN A THOUGHT
================================ */

function openThought(index) {
  const thought = thoughts[index];

  if (!thought) return;

  state.readThoughts.add(index);

  saveProgress();
  renderThoughts();
  updateProgress();

  openDialog({
    eyebrow: `UNSENT THOUGHTS · ${String(index + 1).padStart(2, "0")} / 10`,
    title: thought.title,
    text: `“${thought.text}”`
  });
}

/* ================================
   RANDOM MESSAGE PICKER
================================ */

function pickDifferentIndex(items, previousIndex) {
  if (items.length < 2) return 0;

  let nextIndex = Math.floor(
    Math.random() * items.length
  );

  while (nextIndex === previousIndex) {
    nextIndex = Math.floor(
      Math.random() * items.length
    );
  }

  return nextIndex;
}

/* ================================
   OPEN UNIVERSE OBJECT
================================ */

function openUniverseObject(id, isNewSelection = true) {
  const item = universeContent[id];

  if (!item) return;

  if (isNewSelection) {
    state.exploredObjects.add(id);

    saveProgress();
    updateProgress();
  }

  /* THE STARS */

  if (id === "stars") {
    state.starMessageIndex = pickDifferentIndex(
      item.messages,
      state.starMessageIndex
    );

    openDialog({
      eyebrow: item.eyebrow,
      title: item.title,
      text: item.messages[state.starMessageIndex],
      extraButton: {
        action: "another-star",
        label: "FIND ANOTHER STAR ↗"
      }
    });

    return;
  }

  /* THE CLOUDS */

  if (id === "clouds") {
    state.cloudMessageIndex = pickDifferentIndex(
      item.messages,
      state.cloudMessageIndex
    );

    openDialog({
      eyebrow: item.eyebrow,
      title: item.title,
      text: item.messages[state.cloudMessageIndex],
      extraButton: {
        action: "another-cloud",
        label: "ANOTHER CLOUD ↗"
      }
    });

    return;
  }

  /* THE MOON AND THE COMET */

  openDialog({
    eyebrow: item.eyebrow,
    title: item.title,
    text: item.text
  });
}

/* ================================
   KIWI SECRET
================================ */

function openKiwiSecret() {
  openDialog({
    eyebrow: "A TINY HIDDEN SECRET",
    title: "My Kiwi.",
    text: "Some nicknames don't need an explanation. They're special just because of the person behind them."
  });
}

/* ================================
   FINAL DOOR
================================ */

function openFinalDoor() {
  const door = document.getElementById("openFinalDoor");

  door.classList.add("is-opening");

  door.querySelector(".door-frame").style.transform =
    "rotateY(-94deg)";

  door.querySelector(".door-light").style.opacity = "1";

  window.setTimeout(() => {
    showScreen("finalScreen");
  }, 850);
}

/* ================================
   ALL CLICK INTERACTIONS
================================ */

document.addEventListener("click", (event) => {
  const target = event.target;

  /* ENTER */

  if (target.closest("#enterButton")) {
    startExperience();
    return;
  }

  /* HOME LOGO */

  if (target.closest("[data-action='home']")) {
    event.preventDefault();
    returnToHub();
    return;
  }

  /* OPEN A SECTION */

  const sectionButton = target.closest("[data-open-section]");

  if (sectionButton) {
    const section = sectionButton.dataset.openSection;

    const destination = {
      poems: "poemsScreen",
      thoughts: "thoughtsScreen",
      universe: "universeScreen"
    }[section];

    if (destination) {
      showScreen(destination);
    }

    return;
  }

  /* OPEN FINAL SECTION */

  if (target.closest("[data-open-ending]")) {
    if (isJourneyComplete()) {
      showScreen("endingScreen");
    }

    return;
  }

  /* BACK TO MAIN COLLECTION */

  if (target.closest("[data-back-hub]")) {
    returnToHub();
    return;
  }

  /* OPEN POEM */

  const poemCard = target.closest("[data-poem-index]");

  if (poemCard) {
    openPoem(
      Number(poemCard.dataset.poemIndex)
    );

    return;
  }

  /* OPEN THOUGHT */

  const thoughtCard = target.closest("[data-thought-index]");

  if (thoughtCard) {
    openThought(
      Number(thoughtCard.dataset.thoughtIndex)
    );

    return;
  }

  /* OPEN UNIVERSE OBJECT */

  const universeObject = target.closest("[data-object-id]");

  if (universeObject) {
    openUniverseObject(
      universeObject.dataset.objectId
    );

    return;
  }

  /* KIWI SECRET */

  if (target.closest("[data-action='kiwi-secret']")) {
    openKiwiSecret();
    return;
  }

  /* CLOSE READING WINDOW */

  if (target.closest("#closeDialog")) {
    closeDialog();
    return;
  }

  /* OPEN FINAL DOOR */

  if (target.closest("#openFinalDoor")) {
    if (isJourneyComplete()) {
      openFinalDoor();
    }

    return;
  }

  /* EXTRA RANDOM MESSAGES */

  const extra = target.closest("[data-dialog-extra]");

  if (extra) {
    if (extra.dataset.dialogExtra === "another-star") {
      openUniverseObject("stars", false);
    }

    if (extra.dataset.dialogExtra === "another-cloud") {
      openUniverseObject("clouds", false);
    }
  }
});

/* ================================
   CLOSE WINDOW BY CLICKING OUTSIDE
================================ */

detailDialog.addEventListener("click", (event) => {
  if (event.target === detailDialog) {
    closeDialog();
  }
});

/* ESCAPE KEY */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && detailDialog.open) {
    closeDialog();
  }
});

/* ================================
   INITIALISE EXPERIENCE
================================ */

function initialise() {
  createStarfield();

  loadProgress();

  renderPoems();

  renderThoughts();

  updateProgress();
}

initialise();
