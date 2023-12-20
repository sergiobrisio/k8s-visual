document.getElementById('fileInput').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        try {
            const yamlData = jsyaml.load(reader.result);
            visualizeK8sObjects(yamlData);
        } catch (e) {
            console.error(e);
            alert("Error parsing YAML file.");
        }
    };
    reader.readAsText(event.target.files[0]);
});

function visualizeK8sObjects(data) {
    const architectureDiv = document.getElementById('architecture');
    architectureDiv.innerHTML = ''; // Clear previous visualization

    if (Array.isArray(data)) {
        // Handle multiple documents in one YAML file
        data.forEach(doc => processK8sObject(doc, architectureDiv));
    } else {
        // Handle a single document
        processK8sObject(data, architectureDiv);
    }
}

function processK8sObject(object, container) {
    if (object && object.kind) {
        const kind = object.kind;
        const name = object.metadata && object.metadata.name ? object.metadata.name : 'Unnamed';
        const element = document.createElement('div');
        element.textContent = `Kind: ${kind}, Name: ${name}`;
        container.appendChild(element);
        // Add more details or styling as needed
    }
}
