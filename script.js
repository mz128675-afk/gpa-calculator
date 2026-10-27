// GPA Calculator — uses only already-taught concepts:
// var/let/const, conditionals, functions, and a loop.

const subjects = [];

const subjectInput = document.getElementById("subject");
const marksInput = document.getElementById("marks");
const creditsInput = document.getElementById("credits");
const rowsBody = document.getElementById("subject-rows");
const emptyNote = document.getElementById("empty-note");
const gpaResult = document.getElementById("gpa-result");
const errorText = document.getElementById("error");

// Convert marks to grade points with conditionals.
function marksToGradePoints(marks) {
  if (marks >= 85) {
    return 4.0;
  } else if (marks >= 80) {
    return 3.7;
  } else if (marks >= 75) {
    return 3.3;
  } else if (marks >= 70) {
    return 3.0;
  } else if (marks >= 65) {
    return 2.7;
  } else if (marks >= 60) {
    return 2.3;
  } else if (marks >= 55) {
    return 2.0;
  } else if (marks >= 50) {
    return 1.7;
  } else {
    return 0.0;
  }
}

function gradePointsToLetter(points) {
  if (points === 4.0) {
    return "A";
  } else if (points >= 3.7) {
    return "A-";
  } else if (points >= 3.3) {
    return "B+";
  } else if (points >= 3.0) {
    return "B";
  } else if (points >= 2.7) {
    return "B-";
  } else if (points >= 2.3) {
    return "C+";
  } else if (points >= 2.0) {
    return "C";
  } else if (points >= 1.7) {
    return "D";
  } else {
    return "F";
  }
}

// Weighted GPA = sum(grade points x credit hours) / total credit hours.
function calculateGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < subjects.length; i++) {
    totalPoints += subjects[i].points * subjects[i].credits;
    totalCredits += subjects[i].credits;
  }

  if (totalCredits === 0) {
    return null;
  }
  return totalPoints / totalCredits;
}

function render() {
  rowsBody.innerHTML = "";

  for (let i = 0; i < subjects.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + subjects[i].name + "</td>" +
      "<td>" + subjects[i].marks + "</td>" +
      "<td>" + subjects[i].grade + "</td>" +
      "<td>" + subjects[i].points.toFixed(1) + "</td>" +
      "<td>" + subjects[i].credits + "</td>" +
      '<td><button class="btn btn-sm btn-outline-danger" data-index="' + i + '">Remove</button></td>';
    rowsBody.appendChild(row);
  }

  emptyNote.style.display = subjects.length === 0 ? "block" : "none";

  const gpa = calculateGPA();
  gpaResult.textContent = gpa === null ? "—" : gpa.toFixed(2);
}

document.getElementById("add-btn").addEventListener("click", function () {
  const name = subjectInput.value.trim();
  const marks = Number(marksInput.value);
  const credits = Number(creditsInput.value);

  if (name === "" || marksInput.value === "" || creditsInput.value === "") {
    errorText.textContent = "Please fill in subject, marks and credit hours.";
    return;
  }
  if (marks < 0 || marks > 100 || credits < 1) {
    errorText.textContent = "Marks must be 0–100 and credit hours at least 1.";
    return;
  }

  errorText.textContent = "";
  const points = marksToGradePoints(marks);
  subjects.push({
    name: name,
    marks: marks,
    credits: credits,
    points: points,
    grade: gradePointsToLetter(points)
  });

  subjectInput.value = "";
  marksInput.value = "";
  render();
});

rowsBody.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    subjects.splice(Number(event.target.dataset.index), 1);
    render();
  }
});

document.getElementById("clear-btn").addEventListener("click", function () {
  subjects.length = 0;
  render();
});

render();
