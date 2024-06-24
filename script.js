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
            const instanceValue = `${dirDetails.nr}${envDetails.nr}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}-${selectedPrefix}`;
            
            // Service Key calculation
            const serviceKey = `${instanceValue}-${target}-key`;

            // Destination calculation
            const destination = `${selectedPrefix}-${target}-${project}-${type}`;

            // Create instance container elements
            const copyContainer = document.createElement('div');
            copyContainer.classList.add('copy-container');

            const instanceLabel = document.createElement('div');
            instanceLabel.classList.add('label');
            instanceLabel.textContent = selectedService;

            // Create instance container elements
            const copytext = document.createElement('div');
            copytext.classList.add('copy-text');


            const instanceText = document.createElement('input');
            instanceText.setAttribute('type', 'text');
            instanceText.setAttribute('class', 'text');
            instanceText.setAttribute('readonly', true);
            instanceText.value = instanceValue;

            const instanceCopyButton = document.createElement('button');
            instanceCopyButton.classList.add('copy-button');
            instanceCopyButton.innerHTML = '<i class="fa fa-clone"></i>';
            instanceCopyButton.addEventListener('click', function () {
                instanceText.select();
                document.execCommand('copy');
                instanceCopyButton.classList.add('active');
                setTimeout(() => instanceCopyButton.classList.remove('active'), 2500);
            });

            const destinationLabel = document.createElement('div');
            destinationLabel.classList.add('label');
            destinationLabel.textContent = `${selectedService} Destination:`;

            const destinationText = document.createElement('input');
            destinationText.setAttribute('type', 'text');
            destinationText.setAttribute('class', 'text');
            destinationText.setAttribute('readonly', true);
            destinationText.value = destination;

            const destinationCopyButton = document.createElement('button');
            destinationCopyButton.classList.add('copy-button');
            destinationCopyButton.innerHTML = '<i class="fa fa-clone"></i>';
            destinationCopyButton.addEventListener('click', function () {
                destinationText.select();
                document.execCommand('copy');
                destinationCopyButton.classList.add('active');
                setTimeout(() => destinationCopyButton.classList.remove('active'), 2500);
            });

            const serviceKeyLabel = document.createElement('div');
            serviceKeyLabel.classList.add('label');
            serviceKeyLabel.textContent = `${selectedService} Service Key:`;

            const serviceKeyText = document.createElement('input');
            serviceKeyText.setAttribute('type', 'text');
            serviceKeyText.setAttribute('class', 'text');
            serviceKeyText.setAttribute('readonly', true);
            serviceKeyText.value = serviceKey;

            const serviceKeyCopyButton = document.createElement('button');
            serviceKeyCopyButton.classList.add('copy-button');
            serviceKeyCopyButton.innerHTML = '<i class="fa fa-clone"></i>';
            serviceKeyCopyButton.addEventListener('click', function () {
                serviceKeyText.select();
                document.execCommand('copy');
                serviceKeyCopyButton.classList.add('active');
                setTimeout(() => serviceKeyCopyButton.classList.remove('active'), 2500);
            });

            const instanceDiv = document.createElement('div');
            instanceDiv.classList.add('copy-text');
            instanceDiv.appendChild(instanceText);
            instanceDiv.appendChild(instanceCopyButton);

            const destinationDiv = document.createElement('div');
            destinationDiv.classList.add('copy-text');
            destinationDiv.appendChild(destinationText);
            destinationDiv.appendChild(destinationCopyButton);

            const serviceKeyDiv = document.createElement('div');
            serviceKeyDiv.classList.add('copy-text');
            serviceKeyDiv.appendChild(serviceKeyText);
            serviceKeyDiv.appendChild(serviceKeyCopyButton);

            copyContainer.appendChild(instanceLabel);
            copyContainer.appendChild(instanceDiv);
            copyContainer.appendChild(destinationLabel);
            copyContainer.appendChild(destinationDiv);
            copyContainer.appendChild(serviceKeyLabel);
            copyContainer.appendChild(serviceKeyDiv);

            instanceContainer.appendChild(copyContainer);
        }
    });

    const textFields = {
        subaccount: `${dirDetails.nr}${envDetails.nr}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}`,
        subdomain: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}-${randomString}`,
        cfOrgName: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}`,
        cfSpaceName: `${project}_Space_${envDetails.nr}`,
        kymaCluster: `${customerName}_${envDetails.nr}_Cluster`,
        kymaNamespaces: `${customerName}_${envDetails.nr}_Namespaces`,
        cloudConnectorVRT: `s4-${environment.toLowerCase()}.ext.${customerDomain}`
    };

    // Set other field values (if needed)
    Object.keys(textFields).forEach(fieldId => {
        document.getElementById(fieldId).value = textFields[fieldId];
    });

    document.getElementById('inputForm').classList.add('hidden');
    document.getElementById('outputContainer').classList.remove('hidden');
    document.getElementById('backButton').classList.remove('hidden');
});








document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('outputContainer').classList.add('hidden');
    document.getElementById('inputForm').classList.remove('hidden');
    this.classList.add('hidden');
});

document.querySelectorAll(".copy-text button").forEach(button => {
    button.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input.text");
        input.select();
        document.execCommand("copy");
        this.parentElement.classList.add("active");
        window.getSelection().removeAllRanges();
        setTimeout(() => this.parentElement.classList.remove("active"), 2500);
    });
});

document.getElementById('regenerateButton').addEventListener('click', function () {
    updateGeneratedValues();
});

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

