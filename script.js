// Sample JavaScript for BOQ file upload and table display
function loadBOQ() {
    const fileInput = document.getElementById('boqFile');
    const container = document.getElementById('boqTableContainer');

    if (!fileInput.files[0]) {
        alert("Please select a CSV file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const rows = text.split('\n');
        let tableHTML = '<table><tr>';

        // Header row
        const headers = rows[0].split(',');
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr>';

        // Data rows
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(',');
            if(cells.length === headers.length){
                tableHTML += '<tr>';
                cells.forEach(cell => {
                    tableHTML += `<td>${cell}</td>`;
                });
                tableHTML += '</tr>';
            }
        }
        tableHTML += '</table>';
        container.innerHTML = tableHTML;
    };

    reader.readAsText(fileInput.files[0]);
}
