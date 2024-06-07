// Mapping of environments, their numbers, and components
const environmentMap = {
    SBX: { nr: 0, prefix: "BC" },
    DEV: { nr: 1, prefix: "APPS" },
    ACC: { nr: 2, prefix: "INT" },
    TST: { nr: 3, prefix: "DB" },
    PRD: { nr: 4, prefix: "" }
};

// Mapping of directory numbers and prefixes
const directoryMap = {
    "BC": { nr: 1, prefix: "BC" },
    "APPS": { nr: 2, prefix: "APPS" },
    "INT": { nr: 3, prefix: "INT" },
    "DB": { nr: 4, prefix: "DB" }
};

document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const customerName = document.getElementById('customerName').value.toLowerCase();
    const directory = document.getElementById('directory').value;
    const environment = document.getElementById('environment').value.toUpperCase();
    const project = document.getElementById('project').value;
    const customerDomain = document.getElementById('customerDomain').value.toLowerCase();

    const envDetails = environmentMap[environment];
    const dirDetails = directoryMap[directory];

    // Prepare the generated values according to the logic
    const textFields = {
        subaccount: `${envDetails.nr}${dirDetails.nr}-${dirDetails.prefix}-${environment}`,  // Subaccount
        subdomain: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}`,  // Subdomain
        cfOrgName: `${project}_Org_${envDetails.nr}`,  // CF Org Name
        cfSpaceName: `${project}_Space_${envDetails.nr}`,  // CF Space Name
        kymaCluster: `${customerName}_${envDetails.nr}_Cluster`,  // Kyma Cluster
        kymaNamespaces: `${customerName}_${envDetails.nr}_Namespaces`,  // Kyma Namespaces
        cloudConnectorVRT: `s4.ext.${customerDomain}`,  // Cloud Connector VRT
        cloudConnectorINT: `s4-${environment.toLowerCase()}.ext.${customerDomain}`  // Cloud Connector INT
    };

    // Populate text fields
    const fieldIds = ['subaccount', 'subdomain', 'cfOrgName', 'cfSpaceName', 'kymaCluster', 'kymaNamespaces', 'cloudConnectorVRT', 'cloudConnectorINT'];
    fieldIds.forEach(fieldId => {
        document.getElementById(fieldId).value = textFields[fieldId];
    });

    // Hide input form and show output container
    document.getElementById('inputForm').classList.add('hidden');
    document.getElementById('outputContainer').classList.remove('hidden');
});

// Handle "Back" button click
document.getElementById('backButton').addEventListener('click', function() {
    // Hide output container and show input form
    document.getElementById('outputContainer').classList.add('hidden');
    document.getElementById('inputForm').classList.remove('hidden');
});

// Copy to clipboard functionality for text fields
document.querySelectorAll('.text-field').forEach(textField => {
    textField.addEventListener('click', function() {
        navigator.clipboard.writeText(this.value).then(() => {

        }).catch(err => {
      
        });
    });
});

const textFields = document.querySelectorAll('.text-field');

textFields.forEach(field => {
    field.addEventListener('click', () => {
        const originalText = field.value  ;
        navigator.clipboard.writeText(field.value)
            .then(() => {
                field.value = 'Copied to clipboard';
                setTimeout(() => {
                    field.value = originalText;
                }, 2000);
            })
            .catch(err => console.error('Failed to copy text: ', err));
    });
});

// Additional JavaScript code as needed...

