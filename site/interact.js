var steps = 1;

function updateStepSlide() {
    let slideInfo = document.getElementById("stepInfo");
    let slideVal = document.getElementById("stepSlide").value;
    slideInfo.innerText = `Steps: ${slideVal}`;
    steps = slideVal;
}
updateStepSlide();