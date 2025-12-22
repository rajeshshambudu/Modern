
// Beam Design Calculation
function calculateBeam() {
    const span = parseFloat(document.getElementById('beamSpan').value); // Span Length (L)
    const width = parseFloat(document.getElementById('beamWidth').value); // Width (b)
    const depth = parseFloat(document.getElementById('beamDepth').value); // Depth (d)
    const concreteGrade = document.getElementById('concreteGrade').value; // Concrete Grade
    const steelGrade = document.getElementById('steelGrade').value; // Steel Grade
    const mainBars = parseInt(document.getElementById('mainBars').value); // Number of main bars
    const barSize = parseInt(document.getElementById('barSize').value); // Bar Size
    const stirrups = parseInt(document.getElementById('stirrups').value); // Number of stirrups

    // Formula for bending moment (simplified formula for uniform load)
    const moment = (span ** 2) / 8;  // Simplified bending moment formula for a simply supported beam
    
    // Calculate the total moment capacity for the beam
    const capacity = (width * depth ** 2 * 0.138) / 1000;  // Simplified formula for moment capacity
    
    // Output results
    document.getElementById('beamOutput').innerHTML = `
        Bending Moment = ${moment} kNm<br>
        Moment Capacity = ${capacity} kNm<br>
        Concrete Grade: ${concreteGrade}<br>
        Steel Grade: ${steelGrade}<br>
        Main Bars: ${mainBars} x ${barSize}mm<br>
        Stirrups: ${stirrups} stirrups
    `;
}

// Column Design Calculation
function calculateColumn() {
    const width = parseFloat(document.getElementById('colWidth').value); // Column Width (b)
    const depth = parseFloat(document.getElementById('colDepth').value); // Column Depth (d)
    const height = parseFloat(document.getElementById('colHeight').value); // Column Height (h)
    const concreteGrade = document.getElementById('colConcreteGrade').value; // Concrete Grade
    const steelGrade = document.getElementById('colSteelGrade').value; // Steel Grade
    const bars = parseInt(document.getElementById('colBars').value); // Number of Bars
    const barSize = parseInt(document.getElementById('colBarSize').value); // Bar Size

    // Formula for axial load capacity (simplified)
    const axialLoad = (width * depth * height * 0.35);  // Approximation for axial load capacity
    
    // Output results
    document.getElementById('columnOutput').innerHTML = `
        Axial Load Capacity = ${axialLoad} kN<br>
        Concrete Grade: ${concreteGrade}<br>
       
