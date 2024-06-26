const environmentMap = {
    SBX: { nr: 0, prefix: "BC" },
    DEV: { nr: 1, prefix: "APPS" },
    ACC: { nr: 2, prefix: "INT" },
    TST: { nr: 3, prefix: "DB" },
    PRD: { nr: 4, prefix: "" }
};

const directoryMap = {
    "BC": { nr: 1, prefix: "BC" },
    "APPS": { nr: 2, prefix: "APPS" },
    "INT": { nr: 3, prefix: "INT" },
    "DB": { nr: 4, prefix: "DB" }
};

const checkboxToPrefixMap = {
    "SAP Build Work Zone": "BWZ",
    "SAP Build Work Zone standard edition": "BWZ-S",
    "SAP Build Work Zone advanced edition": "BWZ-A",
    "SAP Build Apps": "SBA",
    "SAP Build Process Automation": "BPA",
    "SAP Business Application Studio": "BAS",
    "SAP Build Code": "SBC",
    "SAP Mobile Services": "MOB",
    "Document Management Service": "DMS",
    "Application Option": "DMS-A",
    "Integration Option": "DMS-I",
    "Document Information Extraction": "DIE",
    "Forms Service by Adobe": "ADS",
    "SAP Print service": "SPS",
    "SAP Integration Suite": "SIS",
    "SAP HANA Cloud": "HCDB",
    "SAP Datasphere": "SDP",
    "SAP Analytics Cloud": "SAC",
    "SAP Cloud Identity Services": "SCI",
    "SAP Identity Authentication Services": "IAS",
    "SAP Identity Provisioning Services": "IPS",
    "SAP BTP ABAP Cloud": "BAC",
    "SAP Web IDE Full-Stack": "IDE",
    "SAP Task Center": "STC",
    "SAP Audit Log Service": "SAU",
    "SAP Application Logging Service for SAP BTP": "SALS",
    "SAP Custom Domain Service": "CDS",
    "SAP Continuous Integration and Delivery": "CICD",
    "Application Autoscaler": "SAA",
    "Business Entity Recognition": "BER",
    "Job Scheduling Service": "JSS",
    "Alert Notification": "ANS",
    "Cloud Integration Automation": "CIA",
    "SAP Event Mesh": "SEM",
    "Content Agent": "CAS",
    "SAP Cloud ALM": "CALM",
    "SAP Cloud Transport Management": "CTMS",
    "SAP BTP AI": "SAI",
    "SAP AI Core": "SAIC",
    "SAP AI Launchpad": "SAIL",
    "SAP AI Services": "SAIS"
};

function toggleDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const selectedServices = document.getElementById('selectedServices');
        selectedServices.innerHTML = '';
        document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked').forEach(function(checkedBox) {
            const li = document.createElement('li');
            li.textContent = checkedBox.value;
            selectedServices.appendChild(li);
        });
    });
});

document.getElementById('customerDomain').addEventListener('input', function () {
    const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const isValid = domainPattern.test(this.value);
    document.getElementById('errorMessage').style.display = isValid ? 'none' : 'inline';
});

document.getElementById('customerName').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 3);
});



//BACK BUTTON
document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('outputContainer').classList.add('hidden');
    document.getElementById('inputForm').classList.remove('hidden');
    this.classList.add('hidden');
});


//COPY TEXT FUNCTIONALITY
document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input.text");
        input.select();
        document.execCommand("copy");
        this.parentElement.classList.add("active");
        window.getSelection().removeAllRanges();
        
        setTimeout(() => this.parentElement.classList.remove("active"), 2500);
    });
});

// COPY FOR THE GENERATED OBJECTS -- MUST HAVE AS THESE HAVE DIFFERENT BEHAVIOUR
document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("copy-button")) {
        const input = event.target.parentElement.querySelector("input.text");
        if (input) {
            input.select();
            document.execCommand("copy");
            event.target.parentElement.classList.add("active");
            window.getSelection().removeAllRanges();
            
       

            // Remove the 'active' class after 2.5 seconds
            setTimeout(() => {
                event.target.parentElement.classList.remove("active");
            }, 2500);
        }
    }
});



//CALL FUNCTION FOR REGENERATION OF RANDOMIZER SUBDOMAIN
document.getElementById('regenerateButton').addEventListener('click', function () {
    updateGeneratedValues();
});

// REGENERATE RANDOM VALUES FOR SUBDOMAIN
function updateGeneratedValues() {
    function generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const randomString = generateRandomString(4);

    const customerName = document.getElementById('customerName').value.toLowerCase();
    const directory = document.getElementById('directory').value;
    const environment = document.getElementById('environment').value.toUpperCase();
    const dirDetails = directoryMap[directory];

    const textFields = {
     
        subdomain: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}-${randomString}`
        
    };

    Object.keys(textFields).forEach(fieldId => {
        document.getElementById(fieldId).value = textFields[fieldId];
    });
}

//SHOW AND CLOSE POPUP FOR BTP SELECTED SERVICES
document.addEventListener('DOMContentLoaded', function () {
    const showPopupButton = document.getElementById('showPopupButton');
    const popupContainer = document.getElementById('popupContainer');  
    const closePopupButton = document.getElementById('closePopupButton');

    // Click event listener for showPopupButton
    showPopupButton.addEventListener('click', function () {
        // Generate or fetch content for the popup (example content)


        // Show the popup
        popupContainer.classList.add('visible');
    });

    // Close popup button event listener
    closePopupButton.addEventListener('click', function () {
        // Hide the popup
        popupContainer.classList.remove('visible');
    });
});


//GENERATION LOGIC
document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault();

    function generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const randomString = generateRandomString(4);
    const customerName = document.getElementById('customerName').value.toLowerCase();
    const directory = document.getElementById('directory').value;
    const environment = document.getElementById('environment').value.toUpperCase();
    const project = document.getElementById('project').value;
    const target = document.getElementById('target').value;
    const type = document.getElementById('type').value;
    const customerDomain = document.getElementById('customerDomain').value.toLowerCase();
    const envDetails = environmentMap[environment];
    const dirDetails = directoryMap[directory];

    // Get selected checkbox prefixes and labels
    const selectedServices = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    const instanceContainer = document.getElementById('instanceContainer');
    instanceContainer.innerHTML = ''; // Clear previous instances

    selectedServices.forEach(function (checkbox) {
        if (checkboxToPrefixMap.hasOwnProperty(checkbox.value)) {
            const selectedService = checkbox.value;
            const selectedPrefix = checkboxToPrefixMap[selectedService];
            const instanceValue = `${dirDetails.nr}${envDetails.nr}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}-${selectedPrefix}`.toLowerCase();
            
            // Service Key calculation
            const serviceKey = `${instanceValue.toLowerCase()}-${target}-key`.toLowerCase();

            // Destination calculation
            const destination = `${selectedPrefix}-${target}-${project}-${type}`.toLowerCase();

            // Create and append separate copy containers for instance, destination, and service key
            const instanceCopyContainer = createCopyContainer(selectedService, instanceValue, 'Instance');
            const destinationCopyContainer = createCopyContainer(`${selectedService} Destination`, destination, 'Destination');
            const serviceKeyCopyContainer = createCopyContainer(`${selectedService} Service Key`, serviceKey, 'Service Key');

            instanceContainer.appendChild(instanceCopyContainer);
            instanceContainer.appendChild(destinationCopyContainer);
            instanceContainer.appendChild(serviceKeyCopyContainer);
        }
    });

    const textFields = {
        subaccount: `${dirDetails.nr}${envDetails.nr}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}`,
        subdomain: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}-${randomString}`,
        cfOrgName: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}`,
        cfSpaceName: `${project}_Space_${envDetails.nr}`,
        kymaCluster: `${customerName}_${envDetails.nr}_Cluster`,
        kymaNamespaces: `${customerName}_${envDetails.nr}_Namespaces`,
        cloudConnectorVRT: `s4.ext.${customerDomain}`,
        cloudConnectorINT: `s4-${environment.toLowerCase()}.ext.${customerDomain}`
    };

    // Set other field values (if needed)
    Object.keys(textFields).forEach(fieldId => {
        document.getElementById(fieldId).value = textFields[fieldId];
    });

    document.getElementById('inputForm').classList.add('hidden');
    document.getElementById('outputContainer').classList.remove('hidden');
    document.getElementById('backButton').classList.remove('hidden');

    // Get the checkbox element
    const checkbox = document.querySelector('.checkbox-wrapper-44 input[type="checkbox"]');

    // Get the checked value
    const isChecked = checkbox.checked;

    const vrtField = document.getElementById('vrtContainer');
    const intField = document.getElementById('intContainer');

    if (isChecked) {
        vrtField.style.display = 'block';
        intField.style.display = 'none';
    } else {
        vrtField.style.display = 'none';
        intField.style.display = 'block';
    }
});

/**
 * Create a copy container element
 * @param {string} label - The label text
 * @param {string} value - The input value
 * @param {string} type - The type for ID and class naming
 */
function createCopyContainer(label, value, type) {
    const copyContainer = document.createElement('div');
    copyContainer.classList.add('copy-container');

    const labelDiv = document.createElement('div');
    labelDiv.classList.add('label');
    labelDiv.textContent = label;

    const copyTextDiv = document.createElement('div');
    copyTextDiv.classList.add('copy-text');

    const inputText = document.createElement('input');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('class', 'text');
    inputText.setAttribute('readonly', true);
    inputText.value = value;

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-button');
    copyButton.innerHTML = '<i class="fa fa-clone"></i>';
    copyButton.addEventListener('click', function () {
        inputText.select();
        document.execCommand('copy');
        copyButton.classList.add('active');
        setTimeout(() => copyButton.classList.remove('active'), 2500);
    });

    copyTextDiv.appendChild(inputText);
    copyTextDiv.appendChild(copyButton);

    copyContainer.appendChild(labelDiv);
    copyContainer.appendChild(copyTextDiv);

    return copyContainer;
}


