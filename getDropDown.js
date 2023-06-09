var students = null;
var titles = null;

const form = document.getElementById("input")
const nameDropDown = document.getElementById("name");
const subject      = document.getElementById("subject");
const assignmentNo = document.getElementById("assignmentNo");
const date         = document.getElementById("date");
const titlePara    = document.getElementById("title-name");
var currentData    = null;

fetch('data/students.json')
  .then(response => response.json())
  .then(gotStudents)
  .catch(error => console.error(error));

fetch('data/titles.json')
  .then(response => response.json())
  .then(gotTitles)
  .catch(error => console.error(error));



function gotStudents(data) {
    students = data;
    function updateStudentNameSelect() {
        for (let student of students) {
            studentName = student.name;
            let domOption = document.createElement("option");
            domOption.value = studentName;
            domOption.text = studentName;
            nameDropDown.appendChild(domOption)
        }
    }
    updateStudentNameSelect()
}

function gotTitles(data) {
    titles = data;
}


// assignmentNo.addEventListener("change", (e)=>{
//     if (subject.value=='./templates/DL.docx') {
//         // titlePara.innerHTML = titles.DL[assignmentNo.value-1];
//     }
// });

function showDataPreview(data) {
    for (let [key, value] of Object.entries(data)) {
        let title = document.createElement("div"); title.classList.add("title");
        let val   = document.createElement("div"); val.classList.add("value");
        let container = document.createElement("div");

        title.innerText = key;
        val.innerText   = value;

        container.appendChild(title);
        container.appendChild(val);

        titlePara.appendChild(container);
    }
}

function getAssignmentTitle(subject, term) {
    if (subject in titles) {
        if (titles[subject].length >= term) {
            return titles[subject][term-1];
        }
    }
    return null;
}

form.addEventListener("input", (e) => {
    titlePara.innerHTML = ""
    if (nameDropDown.value && subject.value && assignmentNo.value) {
        let dataObj = {
            name: nameDropDown.value.toProperCase(),
            rollNo: students[nameDropDown.selectedIndex].rollNo,
            subject: subject.value,
            subjectFull: subject.value=='DL'?"DIGITAL LOGIC" : subject.value=="IIT" ? "INTRODUCTION TO INFORMATION TECHNOLOGY" : "C-PROGRAMMING",
            assignmentNo: assignmentNo.value,
            section: students[nameDropDown.selectedIndex].intRoll < 24 ? 'A' : 'B',
            date: date.value,
        };
        dataObj["submittedTo"] = getSubmittedToName(dataObj);

        temp = getAssignmentTitle(subject.value, assignmentNo.value);
        if (temp) {
            dataObj.assignmentTitle = temp;
            currentData = dataObj;
            showDataPreview(dataObj);
        }
        else {
            showDataPreview(dataObj);
            dataObj.assignmentTitle = "";
            currentData = dataObj;
        }
    }
});

function getSubmittedToName(obj) {
    if (obj.subject=="DL") {
        if (obj.section=='A') return "Rabin Maharjan";
        if (obj.section=='B') return "Bishnu KC";
    }
    if (obj.subject=='IIT') return "Ujjwal Shrestha";
    return "Sudan Maharjan";
}
















String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};