document.getElementById('fileInput').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const allYamlDocs = reader.result.split(/\n---\s*\n/);
        const k8sObjects = allYamlDocs.map(yamlDoc => yamlDoc.trim() ? jsyaml.load(yamlDoc) : null).filter(obj => obj);
        visualizeK8sObjects(k8sObjects);
    };
    reader.readAsText(event.target.files[0]);
});

function visualizeK8sObjects(objects) {
    const architectureDiv = document.getElementById('architecture');
    architectureDiv.innerHTML = ''; // Clear previous visualization

    objects.forEach(obj => processK8sObject(obj, architectureDiv, objects));
    // Call drawDependencies here if implementing connections
}

function processK8sObject(object, container, allObjects) {
    if (!object || !object.kind) return;

    const element = document.createElement('div');
    element.classList.add('k8s-object');
    element.setAttribute('data-kind', object.kind);
    element.setAttribute('data-name', object.metadata.name);

    switch (object.kind) {
        case 'Service':
            processService(object, element, allObjects);
            break;
        case 'Deployment':
            processDeployment(object, element);
            break;
        // Add cases for other kinds as needed
    }

    container.appendChild(element);
}

function processService(service, element, allObjects) {
    element.textContent = `Service: ${service.metadata.name}`;
    // Logic to find and display related deployments
    // This is a placeholder; you'll need to implement matching logic based on selectors, etc.
}

function processDeployment(deployment, element) {
    element.textContent = `Deployment: ${deployment.metadata.name}`;
    const replicaCount = deployment.spec.replicas || 1;
    for (let i = 0; i < replicaCount; i++) {
        const pod = document.createElement('div');
        pod.classList.add('k8s-pod');
        pod.textContent = `Pod ${i + 1} of ${deployment.metadata.name}`;
        // Display container names and images
        const containers = deployment.spec.template.spec.containers;
        containers.forEach(container => {
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('k8s-container');
            containerDiv.textContent = `Container: ${container.name}, Image: ${container.image}`;
            pod.appendChild(containerDiv);
        });
        element.appendChild(pod);
    }
}

// ... Add more functions or logic as needed ...
// ... Add CSS for visualization ...
