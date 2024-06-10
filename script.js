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

document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value.toLowerCase();
    const directory = document.getElementById('directory').value;
    const environment = document.getElementById('environment').value.toUpperCase();
    const project = document.getElementById('project').value;
    const customerDomain = document.getElementById('customerDomain').value.toLowerCase();

    const envDetails = environmentMap[environment];
    const dirDetails = directoryMap[directory];

    const textFields = {
        subaccount: `${envDetails.nr}${dirDetails.nr}-${dirDetails.prefix}-${environment}`,
        subdomain: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}`,
        cfOrgName: `${customerName}-${dirDetails.prefix.toLowerCase()}-${environment.toLowerCase()}`,
        cfSpaceName: `${project}_Space_${envDetails.nr}`,
        kymaCluster: `${customerName}_${envDetails.nr}_Cluster`,
        kymaNamespaces: `${customerName}_${envDetails.nr}_Namespaces`,
        cloudConnectorVRT:  `s4-${environment.toLowerCase()}.ext.${customerDomain}`,
        cloudConnectorINT: `s4-${environment.toLowerCase()}.ext.${customerDomain}`
    };

    const fieldIds = ['subaccount', 'subdomain', 'cfOrgName', 'cfSpaceName', 'kymaCluster', 'kymaNamespaces', 'cloudConnectorVRT', 'cloudConnectorINT'];
    fieldIds.forEach(fieldId => {
        document.getElementById(fieldId).value = textFields[fieldId];
    });

    document.getElementById('inputForm').classList.add('hidden');
    document.getElementById('outputContainer').classList.remove('hidden');
    drawer.classList.add('is-open');
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('outputContainer').classList.add('hidden');
    document.getElementById('inputForm').classList.remove('hidden');
});

document.querySelectorAll(".copy-text button").forEach(button => {
    button.addEventListener("click", function () {
        const copyText = this.parentElement;
        const input = copyText.querySelector("input.text");
        input.select();
        document.execCommand("copy");
        copyText.classList.add("active");
        window.getSelection().removeAllRanges();
        setTimeout(function () {
            copyText.classList.remove("active");
        }, 2500);
    });
});
