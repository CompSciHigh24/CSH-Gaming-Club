const createEvent = document.querySelector("form");

createEvent.addEventListener("submit", (event) => {
  event.preventDefault();

  const event = new EventData(createEvent);
  const reqBody = Object.fromEntries(Event);
  console.log(reqBody);

  fetch("/Events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/event";
  });
});
