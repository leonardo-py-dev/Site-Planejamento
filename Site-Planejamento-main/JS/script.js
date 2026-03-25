// Intersection Observer for smooth Apple-like scroll reveals
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Terminal Simulator JS - Minimal Apple Terminal feel
const terminalBody = document.getElementById('live-logs');

const logTemplates = [
    '<span class="time">14:23:01</span> <span class="info">INFO: log_analyzer started</span>',
    '<span class="time">14:23:02</span> <span class="info">INFO: Ingesting access.log [3.2MB]</span>',
    '<span class="time">14:23:02</span> <span class="warn">WARN: Rule 2 [Path Scanning] caught IP 192.168.1.105</span>',
    '<span class="time">14:23:03</span> <span class="crit">CRIT: Penalty reached. IP 192.168.1.105 blocked</span>',
    '<span class="time">14:23:04</span> <span class="info">INFO: Generating matrix for IP 10.0.0.52</span>',
    '<span class="time">14:23:05</span> <span class="warn">WARN: Rule 1 [Rate Limiting] -> Base Score +30pts</span>',
    '<span class="time">14:23:05</span> <span class="info">INFO: Rendering JSON export process initialized.</span>',
    '<span class="time">14:23:06</span> <span class="info">DONE: report.json written successfully.</span>',
];

let logIndex = 0;
function typeLogLine() {
    if (logIndex >= logTemplates.length) {
        logIndex = 0;
    }
    
    // Auto-clear terminal loop
    if (logIndex === 0) {
        terminalBody.innerHTML = '';
    }
    
    const logNode = document.createElement('div');
    logNode.className = 'log-line';
    logNode.innerHTML = logTemplates[logIndex];
    logNode.style.animation = 'fadeInUp 0.4s ease forwards';
    
    terminalBody.appendChild(logNode);
    logIndex++;
    
    const waitTimeMs = logIndex === logTemplates.length ? 3000 : Math.random() * 800 + 400;
    setTimeout(typeLogLine, waitTimeMs);
}

setTimeout(typeLogLine, 1000);
