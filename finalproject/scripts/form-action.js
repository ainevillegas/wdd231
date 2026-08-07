const params =
    new URLSearchParams(
        window.location.search
    );


const output =
    document.querySelector(
        "#form-results"
    );


const fields = [

    [
        "Name",
        params.get("name")
    ],

    [
        "Email",
        params.get("email")
    ],

    [
        "Preferred Date",
        params.get("date")
    ],

    [
        "Activity Type",
        params.get("activity")
    ],

    [
        "Notes",
        params.get("notes")
    ]

];


/*
  FILTER OUT EMPTY VALUES,
  THEN CREATE THE LIST
*/

const submittedFields =
    fields.filter(
        ([label, value]) =>
            value
    );


output.innerHTML =
    submittedFields
        .map(
            ([label, value]) => `
        <li>
          <strong>
            ${label}:
          </strong>

          ${value}
        </li>
      `
        )
        .join("");


/*
  DISPLAY MESSAGE IF
  NO FORM DATA EXISTS
*/

if (!output.innerHTML) {

    output.innerHTML = `
    <li>
      No form data was provided.
    </li>
  `;
}