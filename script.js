const imagesAndSubtitles = [
    {
        image: 'https://en.numista.com/catalogue/photos/coree_du_sud/474-original.jpg',
        subtitle: 'Heads'
    },
    {
        image: 'https://en.numista.com/catalogue/photos/coree_du_sud/475-original.jpg',
        subtitle: 'Tails'
    }
];

const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const subtitle1 = document.querySelector('#image1 + .subtitle');
const subtitle2 = document.querySelector('#image2 + .subtitle');
const orText = document.querySelector('.or-text');
const flipButton = document.getElementById('flipButton');

function flipCoin() {
    return new Promise(resolve => {
        const randomIndex = Math.floor(Math.random() * imagesAndSubtitles.length);
        const { image, subtitle } = imagesAndSubtitles[randomIndex];
        const randomContainer = Math.random() < 0.5 ? image1 : image2;

        randomContainer.src = image;
        randomContainer.style.display = 'block'; // Show the selected image

        // Hide the other image
        const otherContainer = randomContainer === image1 ? image2 : image1;
        otherContainer.style.display = 'none';

        // Set the subtitle for the displayed image
        if (randomContainer === image1) {
            subtitle1.textContent = subtitle;
            subtitle2.textContent = ''; // Clear the other subtitle
        } else {
            subtitle2.textContent = subtitle;
            subtitle1.textContent = ''; // Clear the other subtitle
        }

        // Hide the "or" text
        orText.style.display = 'none';

        // Resolve the promise after a delay
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

async function flipAlternately() {
    // Hide subtitles during delay
    subtitle1.style.display = 'none';
    subtitle2.style.display = 'none';

    // Alternate images for a few times
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
            image1.style.display = 'block';
            image2.style.display = 'none';
        } else {
            image1.style.display = 'none';
            image2.style.display = 'block';
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Show the result
    await flipCoin();

    // Show subtitles for the result
    subtitle1.style.display = 'block';
    subtitle2.style.display = 'block';
}

function stopFlipping() {
    flipAlternately();
}

flipButton.addEventListener('click', stopFlipping);
