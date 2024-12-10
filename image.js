var saturate = document.getElementById("saturate");
var contrast = document.getElementById("contrast");
var brightness = document.getElementById("brightness");
var sepia = document.getElementById("sepia");
var grayscale = document.getElementById("grayscale");
var blur = document.getElementById("blur");
var hueRotate = document.getElementById("hue-rotate");

var upload = document.getElementById("upload");
var download = document.getElementById("download");
var img = document.getElementById("img");

var reset = document.querySelector("span");
var imgbox = document.querySelector(".img-box");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resetValue() {
    ctx.filter = "none";
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
reset.addEventListener("click", resetValue);

window.onload = function () {
    download.style.display = "none";
    reset.style.display = "none";
    imgbox.style.display = "none";
};

upload.addEventListener("change", function () {
    resetValue();
    const file = upload.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        img.src = reader.result;
        img.onload = function () {
            imgbox.style.display = "block";
            download.style.display = "block";
            reset.style.display = "block";

            // Adjust canvas size and draw the image
            const aspectRatio = img.width / img.height;
            canvas.width = window.innerWidth * 0.9; // 90% of the screen width
            canvas.height = canvas.width / aspectRatio;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            img.style.display = "none";
        };
    };

    reader.onerror = function () {
        alert("Failed to read the file!");
    };
});

var filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
    filter.addEventListener("input", function () {
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
});

download.onclick = function () {
    download.href = canvas.toDataURL();
};