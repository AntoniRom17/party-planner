/**
 * @typedef Event
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2602-FTB-CT-WEB-PT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let events = [];
let selectedEvent;


async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
  } catch (e) {
    console.error(e);
  }
}


async function getEvent(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}


function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
  `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}


function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $items = events.map(EventListItem);
  $ul.replaceChildren(...$items);

  return $ul;
}


function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  $section.classList.add("event");

  $section.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <p><strong>Date:</strong> ${selectedEvent.date}</p>
    <p><strong>Location:</strong> ${selectedEvent.location}</p>
    <p>${selectedEvent.description}</p>
  `;

  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Fullstack Convention Center</h1>
    <main>
      <section>
        <h2>Upcoming Events</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>
  `;

  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();