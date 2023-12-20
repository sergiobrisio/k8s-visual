document.getElementById('fileInput').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const allYamlDocs = reader.result.split(/\n---\s*\n/); // Improved splitting logic
        allYamlDocs.forEach(yamlDoc => {
            if (yamlDoc.trim()) {
                try {
                    const yamlData = jsyaml.load(yamlDoc);
                    visualizeK8sObjects(yamlData);
                } catch (e) {
                    console.error(e);
                    alert("Error parsing YAML document.");
                }
            }
        });
    };
    reader.readAsText(event.target.files[0]);
});

function visualizeK8sObjects(data) {
    const architectureDiv = document.getElementById('architecture');
    // Process each YAML document
    if (data) {
        processK8sObject(data, architectureDiv);
    }
    drawDependencies(architectureDiv);
}

function processK8sObject(object, container) {
    if (object && object.kind) {
        const kind = object.kind;
        const name = object.metadata && object.metadata.name ? object.metadata.name : 'Unnamed';
        const element = document.createElement('div');
        element.classList.add('k8s-object');
        element.setAttribute('data-kind', kind);
        element.setAttribute('data-name', name);
        element.textContent = `Kind: ${kind}, Name: ${name}`;
        container.appendChild(element);
    }
}

function drawDependencies(container) {
    // Example logic to draw dependencies (you'll need to expand this)
    // This is a placeholder for demonstration purposes
    const objects = container.getElementsByClassName('k8s-object');
    for (let i = 0; i < objects.length; i++) {
        for (let j = 0; j < objects.length; j++) {
            if (i !== j && shouldConnect(objects[i], objects[j])) {
                // Draw an arrow or line between objects[i] and objects[j]
                // Implement your own logic for drawing connections
                console.log(`Draw a connection from ${objects[i].getAttribute('data-name')} to ${objects[j].getAttribute('data-name')}`);
            }
        }
    }
}

function shouldConnect(obj1, obj2) {
    // Placeholder logic to determine if there should be a connection
    // Implement your own logic based on Kubernetes relationships
    return Math.random() > 0.5; // Randomly decides to connect for demonstration
}

// Add CSS for visualization (e.g., positioning of elements, arrows)
// ... [Previous JavaScript code] ...

function drawDependencies(container) {
    const objects = container.getElementsByClassName('k8s-object');
    let yPos = 20;

    for (let i = 0; i < objects.length; i++) {
        objects[i].style.top = `${yPos}px`;
        objects[i].style.left = `${i * 150}px`;
        yPos += 60;

        for (let j = 0; j < objects.length; j++) {
            if (i !== j && shouldConnect(objects[i], objects[j])) {
                const line = document.createElement('div');
                line.className = 'connection-line';
                line.style.top = `${Math.min(parseInt(objects[i].style.top), parseInt(objects[j].style.top)) + 25}px`;
                line.style.left = `${Math.min(parseInt(objects[i].style.left), parseInt(objects[j].style.left)) + 75}px`;
                line.style.width = `${Math.abs(parseInt(objects[i].style.left) - parseInt(objects[j].style.left))}px`;
                container.appendChild(line);
            }
        }
    }
}

// ... [Rest of the JavaScript code] ...
