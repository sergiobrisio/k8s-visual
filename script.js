document.getElementById('fileInput').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        try {
            const yamlData = jsyaml.load(reader.result);
            visualizeArchitecture(yamlData);
        } catch (e) {
            console.error(e);
            alert("Error parsing YAML file.");
        }
    };
    reader.readAsText(event.target.files[0]);
});

function visualizeArchitecture(data) {
    const architectureDiv = document.getElementById('architecture');
    architectureDiv.innerHTML = ''; // Clear previous visualization
    // Simple visualization logic (you'll need to expand this)
    for (const key in data) {
        const element = document.createElement('div');
        element.textContent = `${key}: ${JSON.stringify(data[key])}`;
        architectureDiv.appendChild(element);
    }
}