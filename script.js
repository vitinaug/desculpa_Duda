document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const body = document.body;
    const petalContainer = document.getElementById('petal-container');

    let petalGenerationInterval;

    const petalColors = ['red', 'yellow', 'violet', 'white'];

    function toggleEnvelope() {
        const isOpening = !envelope.classList.contains('open');
        envelope.classList.toggle('open');
        body.classList.toggle('envelope-opened', isOpening);

        if (isOpening) {
            setTimeout(() => { letter.scrollTop = 0; }, 10);
            startPetalRain();
        } else {
            letter.scrollTop = 0;
            stopPetalRain();
        }
    }

    envelope.addEventListener('click', toggleEnvelope);

    function generatePetal() {
        if (!petalContainer) return;

        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const randomColor = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.classList.add(randomColor);

        petal.style.left = Math.random() * 100 + 'vw';
        
        petal.style.setProperty('--petal-sway-x', (Math.random() - 0.5) * 200 + 'px');
        petal.style.setProperty('--petal-sway-rotate', Math.random() * 720 + 'deg');
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';

        petalContainer.appendChild(petal);

        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    function startPetalRain() {
        stopPetalRain();
        petalGenerationInterval = setInterval(generatePetal, 400);
    }

    function stopPetalRain() {
        clearInterval(petalGenerationInterval);
        if (petalContainer) {
            petalContainer.innerHTML = '';
        }
    }
});