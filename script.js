
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
        Steel Grade: ${steelGrade}<br>
        Bars: ${bars} x ${barSize}mm
    `;
}

// Slab Design Calculation
function calculateSlab() {
    const length = parseFloat(document.getElementById('slabLength').value); // Slab Length (L)
    const width = parseFloat(document.getElementById('slabWidth').value); // Slab Width (b)
    const thickness = parseFloat(document.getElementById('slabThickness').value); // Slab Thickness (h)
    const concreteGrade = document.getElementById('slabConcreteGrade').value; // Concrete Grade
    const steelGrade = document.getElementById('slabSteelGrade').value; // Steel Grade
    const mainBars = parseInt(document.getElementById('slabMainBars').value); // Number of main bars
    const barSize = parseInt(document.getElementById('slabBarSize').value); // Bar Size

    // Formula for slab bending moment (simplified for one-way slab)
    const bendingMoment = (length * width * thickness * 0.12);  // Simplified formula for bending moment
    
    // Output results
    document.getElementById('slabOutput').innerHTML = `
        Bending Moment = ${bendingMoment} kNm<br>
        Concrete Grade: ${concreteGrade}<br>
        Steel Grade: ${steelGrade}<br>
        Main Bars: ${mainBars} x ${barSize}mm
    `;
}

// Foundation Design Calculation
function calculateFoundation() {
    const width = parseFloat(document.getElementById('foundationWidth').value); // Foundation Width (b)
    const length = parseFloat(document.getElementById('foundationLength').value); // Foundation Length (L)
    const depth = parseFloat(document.getElementById('foundationDepth').value); // Foundation Depth (d)
    const soilBearingCapacity = parseFloat(document.getElementById('soilBearingCapacity').value); // Soil Bearing Capacity
    const columnLoad = parseFloat(document.getElementById('columnLoad').value); // Column Load

    // Formula for foundation bearing capacity
    const foundationCapacity = width * length * depth * soilBearingCapacity;
    const factorSafety = 3;  // Typical factor of safety for foundation design

    // Output results
    document.getElementById('foundationOutput').innerHTML = `
        Foundation Capacity = ${foundationCapacity} kN<br>
        Column Load = ${columnLoad} kN<br>
        Factor of Safety = ${factorSafety}
    `;
}
