const createMember = document.querySelector("form");

createMember.addEventListener("submit", (event) => {
  event.preventDefault();

  const member = new MemberData(createMember);
  const reqBody = Object.fromEntries(member);
  console.log(reqBody);

  fetch("/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/member";
  });
});
