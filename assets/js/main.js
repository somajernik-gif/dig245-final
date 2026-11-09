// [AI-Generated: ChatGPT]
// Prototype quiz logic, API search, and sample personality descriptions.

// Store the selected show and the most recent profile.
let selectedShow = null;
let currentProfile = null;

// You can replace these descriptions with your own.
const showDescriptions = {
    Comedy: [
        "You make awkward situations funny.",
        "You are the friend who always has a running joke."
    ],
    Drama: [
        "You turn a quick catch-up into a full debrief.",
        "You get emotionally invested in everyone's stories."
    ],
    Romance: [
        "You root for your friends like they are in a romantic comedy.",
        "You remember every detail of your friends' crushes."
    ],
    Crime: [
        "You ask follow-up questions before believing a story.",
        "You notice when someone's story does not add up."
    ],
    Fantasy: [
        "You turn ordinary plans into an adventure.",
        "You come up with the most imaginative plans in the group."
    ],
    General: [
        "You love familiar routines with your favorite people.",
        "You are always happy to revisit a favorite memory."
    ]
};

const colorDescriptions = {
    pink: [
        "Your ideal Friday is a themed movie night.",
        "You make a regular hangout feel like an occasion."
    ],
    blue: [
        "Your ideal Friday involves very few plans.",
        "You prefer a cozy night with your favorite people."
    ],
    purple: [
        "Your ideal Friday involves starting a creative project.",
        "You would happily spend Friday rearranging your room."
    ],
    green: [
        "Your ideal Friday starts with a walk outside.",
        "You like plans that leave room for a spontaneous detour."
    ],
    yellow: [
        "You want a Friday night with plenty of laughter.",
        "You suggest a game whenever the conversation slows down."
    ],
    red: [
        "Your ideal Friday includes being first on the dance floor.",
        "You want a night that gives you a story to tell tomorrow."
    ]
};

const dessertDescriptions = {
    brownies: [
        "You bring snacks, even when nobody asks.",
        "You take dessert more seriously than dinner."
    ],
    cookies: [
        "You always offer someone the last bite.",
        "You think baking counts as making plans."
    ],
    cake: [
        "You find a reason to celebrate the small things.",
        "You treat a regular Tuesday like a special occasion."
    ],
    "ice cream": [
        "You always leave room for a treat.",
        "You turn a quick ice cream stop into a whole outing."
    ],
    pie: [
        "You have strong opinions about family recipes.",
        "You think the best conversations happen around a kitchen table."
    ],
    cheesecake: [
        "You read the dessert menu before ordering dinner.",
        "You know exactly which treat is worth saving room for."
    ]
};

// Pick one random sentence from an array.
function randomItem(list) {
    let index = Math.floor(Math.random() * list.length);
    return list[index];
}

// Display one main section at a time.
function showSection(sectionId) {
    document.querySelector("#intro").hidden = true;
    document.querySelector("#quiz").hidden = true;
    document.querySelector("#results").hidden = true;

    document.getElementById(sectionId).hidden = false;
}

// Start the quiz.
document.querySelector("#startButton").addEventListener("click", function () {
    showSection("quiz");
});

// Search TVmaze when the search form is submitted.
document.querySelector("#searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let query = document.querySelector("#showSearch").value.trim();
    let message = document.querySelector("#searchMessage");
    let results = document.querySelector("#showResults");
    let searchButton = document.querySelector("#searchButton");

    if (query === "") {
        message.textContent = "Enter a show title first.";
        return;
    }

    results.replaceChildren();
    message.textContent = "Searching...";
    searchButton.disabled = true;

    try {
        let url = "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(query);
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Search failed.");
        }

        let data = await response.json();

        if (data.length === 0) {
            message.textContent = "No shows found. Try another title.";
        } else {
            message.textContent = "Choose your show:";
        }

        // Display up to six matches.
        data.slice(0, 6).forEach(function (item) {
            let show = item.show;
            let paragraph = document.createElement("p");
            let button = document.createElement("button");

            button.type = "button";
            button.textContent = show.name;

            if (show.premiered) {
                button.textContent += " (" + show.premiered.slice(0, 4) + ")";
            }

            button.setAttribute(
                "aria-pressed",
                String(selectedShow !== null && selectedShow.id === show.id)
            );

            button.addEventListener("click", function () {
                selectedShow = show;

                results.querySelectorAll("button").forEach(function (otherButton) {
                    otherButton.setAttribute("aria-pressed", "false");
                });

                button.setAttribute("aria-pressed", "true");

                document.querySelector("#selectedShow").textContent =
                    "Selected show: " + show.name;

                document.querySelector("#quizMessage").textContent = "";
            });

            paragraph.append(button);
            results.append(paragraph);
        });
    } catch (error) {
        message.textContent =
            "Could not load shows. Check your connection and try searching again.";
    } finally {
        searchButton.disabled = false;
    }
});

// Choose a genre using a fixed priority order.
// Shows without a matching genre use the General descriptions.
function chooseGenre(genres) {
    let priority = ["Comedy", "Drama", "Romance", "Crime", "Fantasy"];

    for (let i = 0; i < priority.length; i++) {
        if (genres.includes(priority[i])) {
            return priority[i];
        }
    }

    return "General";
}

// Add a comparison paragraph safely.
function addComparison(text) {
    let paragraph = document.createElement("p");
    paragraph.textContent = text;
    document.querySelector("#comparisonText").append(paragraph);
}

// Create the personality profile.
document.querySelector("#quizForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (selectedShow === null) {
        document.querySelector("#quizMessage").textContent =
            "Search for and select a show first.";
        document.querySelector("#showSearch").focus();
        return;
    }

    let color = document.querySelector("#color").value;
    let dessert = document.querySelector("#dessert").value;
    let genre = chooseGenre(selectedShow.genres || []);
    let previousProfile = currentProfile;

    // Keep existing sentences unless the related answer changed.
    let friend;
    let friday;
    let habit;

    if (previousProfile && previousProfile.showId === selectedShow.id) {
        friend = previousProfile.friend;
    } else {
        friend = randomItem(showDescriptions[genre]);
    }

    if (previousProfile && previousProfile.color === color) {
        friday = previousProfile.friday;
    } else {
        friday = randomItem(colorDescriptions[color]);
    }

    if (previousProfile && previousProfile.dessert === dessert) {
        habit = previousProfile.habit;
    } else {
        habit = randomItem(dessertDescriptions[dessert]);
    }

    currentProfile = {
        showId: selectedShow.id,
        color: color,
        dessert: dessert,
        friend: friend,
        friday: friday,
        habit: habit
    };

    document.querySelector("#answerSummary").textContent =
        selectedShow.name + " / " + color + " / " + dessert;

    document.querySelector("#friendResult").textContent = friend;
    document.querySelector("#fridayResult").textContent = friday;
    document.querySelector("#habitResult").textContent = habit;

    document.querySelector("#showExplanation").textContent =
        "For " + selectedShow.name + ", we used the " + genre +
        " category and randomly picked a sentence from that list. " +
        "Our category priority is Comedy, Drama, Romance, Crime, then Fantasy. " +
        "Other shows use General.";

    document.querySelector("#colorExplanation").textContent =
        "You chose " + color +
        ", so we randomly picked a Friday-night description assigned to that color.";

    document.querySelector("#dessertExplanation").textContent =
        "You chose " + dessert +
        ", so we randomly picked a habit assigned to that dessert.";

    document.querySelector("#explanation").hidden = true;
    document.querySelector("#explainButton").setAttribute("aria-expanded", "false");

    // Compare this profile with the previous one.
    document.querySelector("#comparisonText").replaceChildren();
    document.querySelector("#comparison").hidden = previousProfile === null;

    if (previousProfile) {
        let changed = false;

        if (previousProfile.showId !== currentProfile.showId) {
            addComparison(
                "Show — Before: " + previousProfile.friend +
                " After: " + currentProfile.friend
            );
            changed = true;
        }

        if (previousProfile.color !== currentProfile.color) {
            addComparison(
                "Color — Before: " + previousProfile.friday +
                " After: " + currentProfile.friday
            );
            changed = true;
        }

        if (previousProfile.dessert !== currentProfile.dessert) {
            addComparison(
                "Dessert — Before: " + previousProfile.habit +
                " After: " + currentProfile.habit
            );
            changed = true;
        }

        if (!changed) {
            addComparison("Your answers stayed the same, so your profile did too.");
        } else {
            addComparison(
                "Only changed answers get a new random selection. " +
                "Sometimes a different show can produce the same sentence."
            );
        }
    }

    showSection("results");
});

// Show or hide the explanation.
document.querySelector("#explainButton").addEventListener("click", function () {
    let explanation = document.querySelector("#explanation");
    explanation.hidden = !explanation.hidden;

    this.setAttribute("aria-expanded", String(!explanation.hidden));
});

// Return to the quiz without clearing answers.
document.querySelector("#changeButton").addEventListener("click", function () {
    showSection("quiz");
});

// Clear everything and restart.
document.querySelector("#restartButton").addEventListener("click", function () {
    selectedShow = null;
    currentProfile = null;

    document.querySelector("#searchForm").reset();
    document.querySelector("#quizForm").reset();
    document.querySelector("#showResults").replaceChildren();
    document.querySelector("#selectedShow").textContent = "";
    document.querySelector("#searchMessage").textContent = "";
    document.querySelector("#quizMessage").textContent = "";

    showSection("intro");
});
/* javascript */
