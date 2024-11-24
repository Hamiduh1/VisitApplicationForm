document.addEventListener('DOMContentLoaded', function () {
    // INITIALIZE FORM NAVIGATION
    let currentStage = 1;
    const totalStages = 3;
    navigateForm(currentStage, totalStages);
});

// FUNCTION TO HANDLE FORM NAVIGATION AND SUBMISSION
function navigateForm(currentStage, totalStages) {
    const prevButton = document.getElementById('prevStage');
    const nextButton = document.getElementById('nextStage');
    const formStages = document.querySelectorAll('.form-stage');
    const submitButton = document.getElementById('formSubmit');

    if (!prevButton || !nextButton || !submitButton || formStages.length === 0) return;

    function showStage(stage) {
        formStages.forEach((stageElement) => {
            stageElement.classList.add('d-none');
        });

        const currentStageElement = document.getElementById(`stage${stage}`);
        if (currentStageElement) {
            currentStageElement.classList.remove('d-none');
        }

        if (stage === 1) {
            prevButton.disabled = true;
        } else if (stage === totalStages) {
            nextButton.disabled = true;
            submitButton.classList.remove('d-none');
        } else {
            prevButton.disabled = false;
            nextButton.disabled = false;
            submitButton.classList.add('d-none');
        }
    }

    showStage(currentStage);
    prevButton.onclick = function () {
        if (currentStage > 1) {
            currentStage--;
            showStage(currentStage);
        }
    };

    nextButton.onclick = function () {
        if (currentStage < totalStages) {
            currentStage++;
            showStage(currentStage);
        }
    };

    submitButton.onclick = function () {
        const healthDeclarationElement = document.getElementById('healthDeclaration');
        const healthDeclaration = healthDeclarationElement && healthDeclarationElement.value === "yes";

        const applicationData = {
            fullName: document.getElementById('fullName') ? document.getElementById('fullName').value : '',
            dateOfBirth: document.getElementById('dateOfBirth') ? document.getElementById('dateOfBirth').value : '',
            nationality: document.getElementById('nationality') ? document.getElementById('nationality').value : '',
            email: document.getElementById('email') ? document.getElementById('email').value : '',
            phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
            departureDate: document.getElementById('departureDate') ? document.getElementById('departureDate').value : '',
            returnDate: document.getElementById('returnDate') ? document.getElementById('returnDate').value : '',
            accommodationPreference: document.getElementById('accommodationPreference') ? document.getElementById('accommodationPreference').value : '',
            specialRequests: document.getElementById('specialRequests') ? document.getElementById('specialRequests').value : '',
            healthDeclaration: healthDeclaration,
            emergencyContact: document.getElementById('emergencyContact') ? document.getElementById('emergencyContact').value : '',
            emergencyPhone: document.getElementById('emergencyPhone') ? document.getElementById('emergencyPhone').value : '',
            medicalConditions: document.getElementById('medicalConditions') ? document.getElementById('medicalConditions').value : ''
        };

        for (const key in applicationData) {
            if (applicationData[key] === '') {
                showToast(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return;
            }
        }

        submitApplication(applicationData);
    };
}

// FUNCTION TO HANDLE APPLICATION SUBMISSION VIA AJAX
function submitApplication(applicationData) {
    const csrfToken = getCookie('XSRF-TOKEN');
    const authToken = localStorage.getItem('authToken');

    $.ajax({
        url: '/api/applications',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(applicationData),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-XSRF-TOKEN', csrfToken);
            if (authToken) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
            }
        },
        success: function () {
            showToast('Application successfully submitted!', 'success');
            resetForm();
        },
        error: function (jqXHR) {
            showToast('Error submitting application: ' + jqXHR.statusText, 'error');
        }
    });
}

// FUNCTION TO RESET FORM AFTER SUBMISSION
function resetForm() {
    const stage1Form = document.getElementById('stage1Form');
    const stage2Form = document.getElementById('stage2Form');
    const stage3Form = document.getElementById('stage3Form');

    if (stage1Form) {
        stage1Form.reset();
    }
    if (stage2Form) {
        stage2Form.reset();
    }
    if (stage3Form) {
        stage3Form.reset();
    }

    const submitButton = document.getElementById('formSubmit');
    if (submitButton) {
        submitButton.classList.add('d-none');
    }
}

// FUNCTION TO SHOW TOAST NOTIFICATIONS
function showToast(message, type) {
    Toastify({
        text: message,
        duration: 6000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: type === "success" ? "green" : "red"
        }
    }).showToast();
}

// FUNCTION TO GET CSRF TOKEN FROM COOKIES
function getCookie(name) {
    let cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0]) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
