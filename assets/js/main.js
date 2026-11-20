// [AI-Generated: ChatGPT]
// Prototype quiz logic, TVmaze search, and sample personality descriptions.
// These descriptions are fictional and can be replaced with your own writing.

let selectedShow = null;
let currentProfile = null;

// Personality descriptions based on the show's genre.
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

// Personality descriptions based on color.
const colorDescriptions = {
    Pink: [
        "Your ideal Friday is a themed movie night.",
        "You make a regular hangout feel like an occasion."
    ],
    Blue: [
        "Your ideal Friday involves very few plans.",
        "You prefer a cozy night with your favorite people."
    ],
    Purple: [
        "Your ideal Friday involves starting a creative project.",
        "You would happily spend Friday rearranging your room."
    ],
    Green: [
        "Your ideal Friday starts with a walk outside.",
        "You like plans that leave room for a spontaneous detour."
    ],
    Yellow: [
        "You want a Friday night with plenty of laughter.",
        "You suggest a game whenever the conversation slows down."
    ],
    Red: [
        "Your ideal Friday includes being first on the dance floor.",
        "You want a night that gives you a story to tell tomorrow."
    ]
};

// Personality descriptions based on dessert.
const dessertDescriptions = {
    Brownies: [
        "You bring snacks, even when nobody asks.",
        "You take dessert more seriously than dinner."
    ],
    Cookies: [
        "You always offer someone the last bite.",
        "You think baking counts as making plans."
    ],
    Cake: [
        "You find a reason to celebrate the small things.",
        "You treat a regular Tuesday like a special occasion."
    ],
    "Ice cream": [
        "You always leave room for a treat.",
        "You turn a quick ice cream stop into a whole outing."
    ],
    Pie: [
        "You have strong opinions about family recipes.",
        "You think the best conversations happen around a kitchen table."
    ],
    Cheesecake: [
        "You read the dessert menu before ordering dinner.",
        "You know exactly which treat is worth saving room for."
    ]
};

// Personality descriptions based on board game.
const gameDescriptions = {
    Monopoly: [
        "You say it is just a game until someone buys your property.",
        "You negotiate like there is actual money involved."
    ],
    Clue: [
        "You quietly collect evidence while everyone else argues.",
        "You have a theory before anyone finishes explaining the situation."
    ],
    Scrabble: [
        "You are ready to defend a word nobody else has heard of.",
        "You keep the dictionary nearby just in case."
    ],
    Catan: [
        "You make alliances and immediately start negotiating.",
        "You have a backup plan for your backup plan."
    ],
    "Sorry!": [
        "You apologize while sending someone back to the start.",
        "You enjoy a little friendly chaos."
    ],
    "The Game of Life": [
        "You have your imaginary future planned before the first turn.",
        "You get surprisingly invested in your fictional career."
    ],
    Other: [
        "You are mostly at game night for the company.",
        "You are happy to learn the rules as you go."
    ]
};

// Personality descriptions based on drink.
const drinkDescriptions = {
    Coffee: [
        "You turn getting a drink into a necessary daily outing.",
        "You have a usual order and take it seriously."
    ],
    Tea: [
        "You like having a small ritual before starting your day.",
        "You make time for a quiet break."
    ],
    Water: [
        "You keep things simple and know what works for you.",
        "You probably have a favorite water bottle."
    ],
    Soda: [
        "You have strong opinions about which fountain drink tastes best.",
        "You believe a good drink improves any meal."
    ],
    Lemonade: [
        "You are ready to sit outside whenever the weather allows.",
        "You try to make an ordinary afternoon feel like summer."
    ],
    Smoothie: [
        "You like a morning that feels at least slightly organized.",
        "You always think one more ingredient will make it better."
    ],
    Other: [
        "You have a specific favorite that deserves its own menu option.",
        "You like doing things your own way."
    ]
};

// Personality descriptions based on sport.
const sportDescriptions = {
    Lacrosse: [
        "You bring energy to the group and expect everyone to keep up.",
        "You can turn a casual activity into a team competition."
    ],
    Soccer: [
        "You keep going even when the payoff takes a while.",
        "You appreciate a good assist as much as the final goal."
    ],
    Basketball: [
        "You are always ready for a quick rematch.",
        "You like a game where things can change in seconds."
    ],
    Football: [
        "You turn watching a game into an entire event.",
        "You have a strong opinion about the next play."
    ],
    Tennis: [
        "You enjoy a challenge you can take on yourself.",
        "You call it a friendly match but still keep careful score."
    ],
    Volleyball: [
        "You are the first person cheering after a good play.",
        "You like knowing everyone has a part in the win."
    ],
    Other: [
        "You are ready to explain why your sport deserves more attention.",
        "You have your own definition of a good competition."
    ],
    None: [
        "You are happy to support the team from the snack table.",
        "You care more about the company than the final score."
    ]
};

// Pick one random sentence from a list.
function randomItem(list) {
    let index = Math.floor(Math.random() * list.length);
    return list[index];
}

// Show one main section at a time.
function showSection(sectionId) {
    document.querySelector("#intro").hidden = true;
    document.querySelector("#quiz").hidden = true;
    document.querySelector("#results").hidden = true;

    document.getElementById(sectionId).hidden = false;
}

// Choose one genre using a fixed priority order.
function chooseGenre(genres) {
    let priority = ["Comedy", "Drama", "Romance", "Crime", "Fantasy"];

    for (let i = 0; i < priority.length; i++) {
        if (genres.includes(priority[i])) {
            return priority[i];
        }
    }

    return "General";
}

// Add a paragraph to the comparison section.
function addComparison(text) {
    let paragraph = document.createElement("p");
    paragraph.textContent = text;
    document.querySelector("#comparisonText").append(paragraph);
}

// Start the quiz.
document.querySelector("#startButton").addEventListener("click", function () {
    showSection("quiz");
});

// Search for shows.
document.querySelector("#searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let query = document.querySelector("#showSearch").value.trim();
    let message = document.querySelector("#searchMessage");
    let results = document.querySelector("#showResults");
    let searchButton = document.querySelector("#searchButton");

    if (searchButton.disabled) {
        return;
    }

    if (query === "") {
        message.textContent = "Enter a show title first.";
        return;
    }

    results.replaceChildren();
    message.textContent = "Searching...";
    searchButton.disabled = true;

    // Stop the request if it takes longer than 12 seconds.
    let controller = new AbortController();
    let timeout = setTimeout(function () {
        controller.abort();
    }, 12000);

    try {
        let url =
            "https://api.tvmaze.com/search/shows?q=" +
            encodeURIComponent(query);

        let response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error("Search failed.");
        }

        let data = await response.json();

        if (data.length === 0) {
            message.textContent = "No shows found. Try another title.";
        } else {
            message.textContent = "Choose your show:";
        }

        // Display up to six matching shows.
        data.slice(0, 6).forEach(function (item) {
            let show = item.show;
            let paragraph = document.createElement("p");
            let button = document.createElement("button");

            button.type = "button";
            button.textContent = show.name;

            if (show.premiered) {
                button.textContent +=
                    " (" + show.premiered.slice(0, 4) + ")";
            }

            button.setAttribute(
                "aria-pressed",
                String(
                    selectedShow !== null &&
                    selectedShow.id === show.id
                )
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
        clearTimeout(timeout);
        searchButton.disabled = false;
    }
});

// Create the six-part personality profile.
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
    let boardGame = document.querySelector("#boardGame").value;
    let drink = document.querySelector("#drink").value;
    let sport = document.querySelector("#sport").value;

    let genre = chooseGenre(selectedShow.genres || []);
    let previousProfile = currentProfile;

    // Connect each answer to its descriptions and HTML elements.
    let sections = [
        {
            name: "Comfort show",
            answer: selectedShow.id,
            answerKey: "showId",
            resultKey: "friend",
            descriptions: showDescriptions[genre],
            resultId: "friendResult",
            explanationId: "showExplanation",
            explanation:
                "For " + selectedShow.name + ", we used the " + genre +
                " category. Our priority is Comedy, Drama, Romance, Crime, " +
                "then Fantasy. Other shows use General."
        },
        {
            name: "Color",
            answer: color,
            answerKey: "color",
            resultKey: "friday",
            descriptions: colorDescriptions[color],
            resultId: "fridayResult",
            explanationId: "colorExplanation",
            explanation:
                "You chose " + color +
                ", so we used the Friday-night descriptions assigned to that color."
        },
        {
            name: "Dessert",
            answer: dessert,
            answerKey: "dessert",
            resultKey: "habit",
            descriptions: dessertDescriptions[dessert],
            resultId: "habitResult",
            explanationId: "dessertExplanation",
            explanation:
                "You chose " + dessert +
                ", so we used the habits assigned to that dessert."
        },
        {
            name: "Board game",
            answer: boardGame,
            answerKey: "boardGame",
            resultKey: "game",
            descriptions: gameDescriptions[boardGame],
            resultId: "gameResult",
            explanationId: "gameExplanation",
            explanation:
                "Your board-game answer was " + boardGame +
                ", so we used the game-night descriptions assigned to that option."
        },
        {
            name: "Drink",
            answer: drink,
            answerKey: "drink",
            resultKey: "drinkText",
            descriptions: drinkDescriptions[drink],
            resultId: "drinkResult",
            explanationId: "drinkExplanation",
            explanation:
                "Your drink answer was " + drink +
                ", so we used the everyday-energy descriptions assigned to that option."
        },
        {
            name: "Sport",
            answer: sport,
            answerKey: "sport",
            resultKey: "sportText",
            descriptions: sportDescriptions[sport],
            resultId: "sportResult",
            explanationId: "sportExplanation",
            explanation:
                "Your sport answer was " + sport +
                ", so we used the competitive-side descriptions assigned to that option."
        }
    ];

    currentProfile = {};

    document.querySelector("#comparisonText").replaceChildren();
    document.querySelector("#comparison").hidden =
        previousProfile === null;

    let changed = false;

    sections.forEach(function (section) {
        let description;

        // Keep the previous sentence when its answer stays the same.
        if (
            previousProfile &&
            previousProfile[section.answerKey] === section.answer
        ) {
            description = previousProfile[section.resultKey];
        } else {
            description = randomItem(section.descriptions);
        }

        currentProfile[section.answerKey] = section.answer;
        currentProfile[section.resultKey] = description;

        document.getElementById(section.resultId).textContent =
            description;

        document.getElementById(section.explanationId).textContent =
            section.explanation +
            " The app randomly selected one sentence from that list.";

        // Compare only the answers that changed.
        if (
            previousProfile &&
            previousProfile[section.answerKey] !== section.answer
        ) {
            addComparison(
                section.name +
                " — Before: " + previousProfile[section.resultKey] +
                " After: " + description
            );

            changed = true;
        }
    });

    document.querySelector("#answerSummary").textContent =
        selectedShow.name + " / " +
        color + " / " +
        dessert + " / " +
        boardGame + " / " +
        drink + " / " +
        sport;

    if (previousProfile) {
        if (!changed) {
            addComparison(
                "Your answers stayed the same, so your profile did too."
            );
        } else {
            addComparison(
                "Only changed answers get a new random selection. " +
                "Different answers can sometimes produce the same sentence."
            );
        }
    }

    document.querySelector("#explanation").hidden = true;

    document.querySelector("#explainButton").setAttribute(
        "aria-expanded",
        "false"
    );

    showSection("results");
});

// Show or hide the explanation.
document.querySelector("#explainButton").addEventListener("click", function () {
    let explanation = document.querySelector("#explanation");
    explanation.hidden = !explanation.hidden;

    this.setAttribute(
        "aria-expanded",
        String(!explanation.hidden)
    );
});

// Return to the quiz while keeping the selected answers.
document.querySelector("#changeButton").addEventListener("click", function () {
    showSection("quiz");
});

// Clear the answers and start again.
document.querySelector("#restartButton").addEventListener("click", function () {
    selectedShow = null;
    currentProfile = null;

    document.querySelector("#searchForm").reset();
    document.querySelector("#quizForm").reset();

    document.querySelector("#showResults").replaceChildren();
    document.querySelector("#selectedShow").textContent = "";
    document.querySelector("#searchMessage").textContent = "";
    document.querySelector("#quizMessage").textContent = "";

    document.querySelector("#explanation").hidden = true;
    document.querySelector("#comparison").hidden = true;
    document.querySelector("#comparisonText").replaceChildren();

    document.querySelector("#explainButton").setAttribute(
        "aria-expanded",
        "false"
    );

    showSection("intro");
});