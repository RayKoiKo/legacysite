// Intro overlay logic (cinématique + countdown + texte dynamique)
document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('introOverlay');
    var btn = document.getElementById('introEnterBtn');
    var countdownEl = document.getElementById('introCountdown');
    var taglineEl = document.getElementById('introTagline');
    if (!overlay) return;

    var closed = false;

    // Textes dynamiques qui tournent
    var taglines = [
        "Règlement strict",
        "RP sérieux",
        "Whitelist obligatoire"
    ];
    var taglineIndex = 0;

    function rotateTagline() {
        if (!taglineEl) return;
        taglineIndex = (taglineIndex + 1) % taglines.length;
        taglineEl.textContent = taglines[taglineIndex];
    }

    // Lancer la rotation de texte toutes les 1.4s environ
    if (taglineEl) {
        // premier texte déjà affiché, on démarre le cycle
        setInterval(rotateTagline, 1400);
    }

    function closeOverlay() {
        if (closed) return;
        closed = true;
        overlay.classList.add('closing');
        setTimeout(function () {
            overlay.classList.add('hidden');
        }, 650);
    }

    if (btn) {
        btn.addEventListener('click', function () {
            closeOverlay();
        });
    }

    // Countdown 3 → 2 → 1 → entrée automatique
    var count = 3;
    if (countdownEl) {
        countdownEl.textContent = count;
        var countdownInterval = setInterval(function () {
            if (closed) {
                clearInterval(countdownInterval);
                return;
            }
            count--;
            if (countdownEl) {
                countdownEl.textContent = count > 0 ? count : "GO";
            }
            if (count <= 0) {
                clearInterval(countdownInterval);
                // petit délai avant fermeture pour laisser "GO" visible
                setTimeout(closeOverlay, 600);
            }
        }, 1000);
    } else {
        // fallback : fermeture auto après 5s si pas de countdown
        setTimeout(closeOverlay, 5000);
    }
});