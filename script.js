document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const customerName = document.getElementById('customerName').value;
    const directory = document.getElementById('directory').value;
    const environment = document.getElementById('environment').value;
    const project = document.getElementById('project').value;
    const customerDomain = document.getElementById('customerDomain').value;

    const textFieldsContainer = document.getElementById('outputContainer');
    const nextButton = document.getElementById('nextButton');

    // Prepare the generated values
    const textFields = [
        `Subaccount: ${customerName}_${environment}`,
        `Subdomain: ${directory}_${environment}`,
        `CF Org Name: ${project}_Org_${environment}`,
        `CF Space Name: ${project}_Space_${environment}`,
        `Kyma Cluster: ${customerName}_${environment}_Cluster`,
        `Kyma Namespaces: ${customerName}_${environment}_Namespaces`,
        `Cloud Connector VRT: ${customerDomain}_${environment}_VRT`,
        `Cloud Connector INT: ${customerDomain}_${environment}_INT`
    ];

    // Show the first text field
    let currentIndex = 0;
    document.getElementById('subaccount').value = textFields[currentIndex];
    textFieldsContainer.classList.remove('hidden');

    // Function to show the next text field
    function showNextTextField() {
        currentIndex++;
        const fields = ['subaccount', 'subdomain', 'cfOrgName', 'cfSpaceName', 'kymaCluster', 'kymaNamespaces', 'cloudConnectorVRT', 'cloudConnectorINT'];
        if (currentIndex < textFields.length) {
            document.getElementById(fields[currentIndex]).value = textFields[currentIndex];
            document.getElementById(fields[currentIndex]).focus();
            document.getElementById(fields[currentIndex]).select();
        } else {
            nextButton.disabled = true;
            nextButton.textContent = "Done";
        }
    }

    // Handle "Next" button click
    nextButton.addEventListener('click', showNextTextField);

    // Handle "Enter" key press on text field
    const textFieldsElements = document.querySelectorAll('.text-field');
    textFieldsElements.forEach(field => {
        field.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                showNextTextField();
                event.preventDefault();
            }
        });
    });
});
