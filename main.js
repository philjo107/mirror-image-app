document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                document.getElementById('options').classList.remove('d-none');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('invertBtn').addEventListener('click', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const invertOption = document.querySelector('input[name="invertOption"]:checked').value;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const width = canvas.width;
    const height = canvas.height;

    const invertHorizontally = () => {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width / 2; x++) {
                const idx1 = (y * width + x) * 4;
                const idx2 = (y * width + (width - x - 1)) * 4;
                for (let i = 0; i < 4; i++) {
                    const temp = data[idx1 + i];
                    data[idx1 + i] = data[idx2 + i];
                    data[idx2 + i] = temp;
                }
            }
        }
    };

    const invertVertically = () => {
        for (let y = 0; y < height / 2; y++) {
            for (let x = 0; x < width; x++) {
                const idx1 = (y * width + x) * 4;
                const idx2 = ((height - y - 1) * width + x) * 4;
                for (let i = 0; i < 4; i++) {
                    const temp = data[idx1 + i];
                    data[idx1 + i] = data[idx2 + i];
                    data[idx2 + i] = temp;
                }
            }
        }
    };

    if (invertOption === 'horizontal') {
        invertHorizontally();
    } else {
        invertVertically();
    }

    ctx.putImageData(imageData, 0, 0);
    canvas.classList.remove('d-none');
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.href = canvas.toDataURL();
    downloadBtn.classList.remove('d-none');
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');

    mobileMenu.addEventListener('click', function() {
        menu.classList.toggle('show');
    });
});
