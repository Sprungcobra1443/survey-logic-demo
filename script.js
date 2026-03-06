// Calendar icon triggers date picker
// --- Dark mode toggle logic ---
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkToggle.classList.toggle('active');
    // Optionally, store preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', '1');
    } else {
        localStorage.removeItem('darkMode');
    }
});

// On load, restore dark mode if previously set
if (localStorage.getItem('darkMode') === '1') {
    document.body.classList.add('dark-mode');
    darkToggle.classList.add('active');
}
// --- Language translation data ---
const translations = {
    en: {
        title: "Junior JavaScript Developer Survey",
        name: "Name",
        email: "Email",
        whyRole: "Why do you want this role in the EPSI Data Collection team?",
        researchInterest: "What do you think about the research and data field and why does it interest you?",
        jsProject: "Describe a project where you used JavaScript and explain what you built.",
        student: "Are you currently a student?",
        yes: "Yes",
        no: "No",
        schoolName: "School name",
        gradYear: "Expected graduation year",
        startDate: "When can you start working?",
        hours: "How many hours per week can you work?",
        salary: "Salary expectation (€ per hour)",
        submit: "Submit",
        preview: "Submission Preview",
        previewWhy: "Why EPSI Data Collection:",
        previewResearch: "Research & Data Interest:",
        previewJS: "JavaScript Project:",
        previewStudent: "Student:",
        previewSchool: "School Name:",
        previewGrad: "Graduation Year:",
        previewStart: "Start Date:",
        previewHours: "Hours per week:",
        previewSalary: "Salary expectation:",
        required: "This field is required.",
        requiredName: "Name is required.",
        requiredEmail: "Email is required.",
        invalidEmail: "Please enter a valid email address.",
        requiredStudent: "Please select Yes or No.",
        requiredSchool: "School name is required.",
        requiredGrad: "Graduation year is required.",
        gradRange: "Year must be between 2024 and 2030.",
        requiredStart: "Start date is required.",
        requiredHours: "Hours per week is required.",
        hoursRange: "Must be between 1 and 40 hours.",
        requiredSalary: "Salary expectation is required.",
        salaryRange: "Must be between €10 and €40.",
        na: "N/A"
    },
    fi: {
        title: "Junior JavaScript -kehittäjän kysely",
        name: "Nimi",
        email: "Sähköposti",
        whyRole: "Miksi haluat tämän roolin EPSI Data Collection -tiimissä?",
        researchInterest: "Mitä ajattelet tutkimus- ja datakentästä ja miksi se kiinnostaa sinua?",
        jsProject: "Kuvaile projekti, jossa käytit JavaScriptiä ja selitä, mitä rakensit.",
        student: "Oletko tällä hetkellä opiskelija?",
        yes: "Kyllä",
        no: "Ei",
        schoolName: "Koulun nimi",
        gradYear: "Odotettu valmistumisvuosi",
        startDate: "Milloin voit aloittaa työt?",
        hours: "Kuinka monta tuntia viikossa voit työskennellä?",
        salary: "Palkkatoive (€ per tunti)",
        submit: "Lähetä",
        preview: "Lähetyksen esikatselu",
        previewWhy: "Miksi EPSI Data Collection:",
        previewResearch: "Tutkimus & Data -kiinnostus:",
        previewJS: "JavaScript-projekti:",
        previewStudent: "Opiskelija:",
        previewSchool: "Koulun nimi:",
        previewGrad: "Valmistumisvuosi:",
        previewStart: "Aloituspäivä:",
        previewHours: "Tunnit viikossa:",
        previewSalary: "Palkkatoive:",
        required: "Tämä kenttä on pakollinen.",
        requiredName: "Nimi on pakollinen.",
        requiredEmail: "Sähköposti on pakollinen.",
        invalidEmail: "Syötä kelvollinen sähköpostiosoite.",
        requiredStudent: "Valitse kyllä tai ei.",
        requiredSchool: "Koulun nimi on pakollinen.",
        requiredGrad: "Valmistumisvuosi on pakollinen.",
        gradRange: "Vuoden tulee olla välillä 2024–2030.",
        requiredStart: "Aloituspäivä on pakollinen.",
        requiredHours: "Tuntimäärä on pakollinen.",
        hoursRange: "Tuntien tulee olla välillä 1–40.",
        requiredSalary: "Palkkatoive on pakollinen.",
        salaryRange: "Palkan tulee olla välillä 10–40 €.",
        na: "Ei saatavilla"
    }
};

let currentLang = 'en';

// --- Language switching logic ---
function setLanguage(lang) {
    currentLang = lang;
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Update button active state
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-fi').classList.toggle('active', lang === 'fi');

    // Update all visible error messages to new language
    const errorFields = [
        { id: 'name', key: 'requiredName' },
        { id: 'email', key: 'requiredEmail' },
        { id: 'whyRole', key: 'required' },
        { id: 'researchInterest', key: 'required' },
        { id: 'jsProject', key: 'required' },
        { id: 'student', key: 'requiredStudent' },
        { id: 'schoolName', key: 'requiredSchool' },
        { id: 'gradYear', key: 'requiredGrad' },
        { id: 'startDate', key: 'requiredStart' },
        { id: 'hours', key: 'requiredHours' },
        { id: 'salary', key: 'requiredSalary' }
    ];
    errorFields.forEach(field => {
        const errorDiv = document.getElementById('error-' + field.id);
        if (errorDiv && errorDiv.textContent && errorDiv.textContent.length > 0) {
            // If error is shown, update to new language
            errorDiv.textContent = translations[lang][field.key];
        }
    });

    // If preview is visible, re-render it in the new language
    if (preview.style.display === 'block') {
        showPreview();
    }
}

document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-fi').addEventListener('click', () => setLanguage('fi'));

// Junior JavaScript Developer Survey Logic
// Author: EPSI Data Collection Demo
// This script handles dynamic form logic, validation, and preview display

// Select form and relevant elements
const form = document.getElementById('surveyForm');
const studentFields = document.getElementById('studentFields');
const preview = document.getElementById('preview');

// Utility: Show/hide student fields based on radio selection
function handleStudentFields() {
    const studentYes = document.getElementById('studentYes').checked;
    studentFields.style.display = studentYes ? 'block' : 'none';
}

// Attach event listeners for student radio buttons
const studentRadios = document.getElementsByName('student');
studentRadios.forEach(radio => {
    radio.addEventListener('change', handleStudentFields);
});

// Utility: Validate email format
function validateEmail(email) {
    // Simple regex for demonstration
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Utility: Show error message
function showError(id, message) {
    document.getElementById('error-' + id).textContent = message;
}

// Utility: Clear error message
function clearError(id) {
    document.getElementById('error-' + id).textContent = '';
}

// Main validation function
function validateForm() {
    let valid = true;

    // Name
    const name = form.name.value.trim();
    if (!name) {
        showError('name', translations[currentLang].requiredName);
        valid = false;
    } else {
        clearError('name');
    }

    // Email
    const email = form.email.value.trim();
    if (!email) {
        showError('email', translations[currentLang].requiredEmail);
        valid = false;
    } else if (!validateEmail(email)) {
        showError('email', translations[currentLang].invalidEmail);
        valid = false;
    } else {
        clearError('email');
    }

    // Why Role
    const whyRole = form.whyRole.value.trim();
    if (!whyRole) {
        showError('whyRole', translations[currentLang].required);
        valid = false;
    } else {
        clearError('whyRole');
    }

    // Research Interest
    const researchInterest = form.researchInterest.value.trim();
    if (!researchInterest) {
        showError('researchInterest', translations[currentLang].required);
        valid = false;
    } else {
        clearError('researchInterest');
    }

    // JS Project
    const jsProject = form.jsProject.value.trim();
    if (!jsProject) {
        showError('jsProject', translations[currentLang].required);
        valid = false;
    } else {
        clearError('jsProject');
    }

    // Student
    let student = '';
    if (form.student.value === undefined || form.student.value === '') {
        showError('student', translations[currentLang].requiredStudent);
        valid = false;
    } else {
        student = form.student.value;
        clearError('student');
    }

    // Student fields if Yes
    if (student === translations['en'].yes || student === translations['fi'].yes) {
        const schoolName = form.schoolName.value.trim();
        const gradYear = form.gradYear.value.trim();
        if (!schoolName) {
            showError('schoolName', translations[currentLang].requiredSchool);
            valid = false;
        } else {
            clearError('schoolName');
        }
        if (!gradYear) {
            showError('gradYear', translations[currentLang].requiredGrad);
            valid = false;
        } else if (parseInt(gradYear) < 2024 || parseInt(gradYear) > 2030) {
            showError('gradYear', translations[currentLang].gradRange);
            valid = false;
        } else {
            clearError('gradYear');
        }
    } else {
        clearError('schoolName');
        clearError('gradYear');
    }

    // Start Date
    const startDate = form.startDate.value;
    if (!startDate) {
        showError('startDate', translations[currentLang].requiredStart);
        valid = false;
    } else {
        clearError('startDate');
    }

    // Hours per week
    const hours = form.hours.value;
    if (!hours) {
        showError('hours', translations[currentLang].requiredHours);
        valid = false;
    } else if (hours < 1 || hours > 40) {
        showError('hours', translations[currentLang].hoursRange);
        valid = false;
    } else {
        clearError('hours');
    }

    // Salary expectation
    const salary = form.salary.value;
    if (!salary) {
        showError('salary', translations[currentLang].requiredSalary);
        valid = false;
    } else if (salary < 10 || salary > 40) {
        showError('salary', translations[currentLang].salaryRange);
        valid = false;
    } else {
        clearError('salary');
    }

    return valid;
}

// Display submission preview
function showPreview() {
    // Gather all values
    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        whyRole: form.whyRole.value.trim(),
        researchInterest: form.researchInterest.value.trim(),
        jsProject: form.jsProject.value.trim(),
        student: form.student.value,
        schoolName: (form.student.value === translations['en'].yes || form.student.value === translations['fi'].yes) ? form.schoolName.value.trim() : translations[currentLang].na,
        gradYear: (form.student.value === translations['en'].yes || form.student.value === translations['fi'].yes) ? form.gradYear.value.trim() : translations[currentLang].na,
        startDate: form.startDate.value,
        hours: form.hours.value,
        salary: form.salary.value
    };

    // Translate student answer
    let studentAnswer = '';
    if (data.student === translations['en'].yes || data.student === translations['fi'].yes) {
        studentAnswer = translations[currentLang].yes;
    } else if (data.student === translations['en'].no || data.student === translations['fi'].no) {
        studentAnswer = translations[currentLang].no;
    } else {
        studentAnswer = data.student;
    }

    // Build preview HTML
    let html = `<h2>${translations[currentLang].preview}</h2>`;
    html += `<p><strong>${translations[currentLang].name}:</strong> ${data.name}</p>`;
    html += `<p><strong>${translations[currentLang].email}:</strong> ${data.email}</p>`;
    html += `<p><strong>${translations[currentLang].previewWhy}</strong> ${data.whyRole}</p>`;
    html += `<p><strong>${translations[currentLang].previewResearch}</strong> ${data.researchInterest}</p>`;
    html += `<p><strong>${translations[currentLang].previewJS}</strong> ${data.jsProject}</p>`;
    html += `<p><strong>${translations[currentLang].previewStudent}</strong> ${studentAnswer}</p>`;
    if (studentAnswer === translations[currentLang].yes) {
        html += `<p><strong>${translations[currentLang].previewSchool}</strong> ${data.schoolName}</p>`;
        html += `<p><strong>${translations[currentLang].previewGrad}</strong> ${data.gradYear}</p>`;
    }
    // Format start date as day/month/year
    let formattedDate = data.startDate;
    if (formattedDate) {
        const parts = formattedDate.split('-');
        if (parts.length === 3) {
            formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    }
    html += `<p><strong>${translations[currentLang].previewStart}</strong> ${formattedDate}</p>`;
    html += `<p><strong>${translations[currentLang].previewHours}</strong> ${data.hours}</p>`;
    html += `<p><strong>${translations[currentLang].previewSalary}</strong> €${data.salary} ${currentLang === 'fi' ? 'per tunti' : 'per hour'}</p>`;

    preview.innerHTML = html;
    preview.style.display = 'block';
}

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default submission
    preview.style.display = 'none'; // Hide preview on new submit
    if (validateForm()) {
        showPreview();
    }
});

// Initial setup: hide student fields and set default language
handleStudentFields();
setLanguage('en');
