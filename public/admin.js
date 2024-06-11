const deleteButtons = document.getElementsByClassName("deleteButton");

Array.from(deleteButtons).forEach(button => {
button.addEventListener("click", () => {
  const memberId = button.getAttribute("data-member-id");
  fetch(`/admin/${memberId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      location.href = "/admin";
    });
  console.log("hey lol")
});
});


const updateForm = document.querySelector(".updateForm");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(updateForm);
  const data = Object.fromEntries(formData.entries());

  fetch("/admin" + updateForm , {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then(() => {
    location.href = "/admin" ;
  });
});
