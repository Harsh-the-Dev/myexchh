// MyExch Interactive Client Logic

// 1. Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (navMenu && mobileToggle) {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    }
}

// Close mobile menu when links are clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.querySelector('.mobile-toggle');
        if (navMenu && mobileToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// 2. FAQ Accordion Click Listeners
document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Collapse all items first
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle the clicked one
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// 3. Login Submission Simulation
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('loginSubmitBtn');
    if (!submitBtn) return;
    
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    
    // Disable inputs and show loader
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Verifying Account...';
    if (btnSpinner) btnSpinner.classList.remove('hidden');
    
    // Simulate API authorization wait time
    setTimeout(() => {
        // Redirect to the Sports Exchange dashboard page
        window.location.href = 'exchange.html';
    }, 1500);
}

// 4. Signup Form WhatsApp Redirection
function handleSignupSubmit(event) {
    event.preventDefault();
    
    const regName = document.getElementById('regName')?.value;
    const regPhone = document.getElementById('regPhone')?.value;
    const regMethod = document.getElementById('regMethod')?.value;
    
    if (!regName || !regPhone || !regMethod) {
        alert('Please fill out all fields.');
        return;
    }
    
    const submitBtn = document.getElementById('signupSubmitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
    }
    
    // Build pre-filled WhatsApp message
    const rawMessage = `Hi MyExch, I want to create a new betting ID.\n\n` +
                       `• Name: ${regName}\n` +
                       `• WhatsApp Mobile: ${regPhone}\n` +
                       `• Preferred Payment Deposit Method: ${regMethod}\n\n` +
                       `Please set up my account and credit my 100% welcome bonus!`;
                       
    const encodedText = encodeURIComponent(rawMessage);
    
    // Open WhatsApp in a new window/tab
    window.open(`https://wa.me/917970352439?text=${encodedText}`, '_blank');
    
    // Re-enable button after click redirect
    setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
    }, 1000);
}


// 5. Live Sports Betting Exchange Simulator (Only runs on exchange.html)
const INITIAL_MATCHES = [
    {
        id: 'match-1',
        sport: 'cricket',
        teamA: 'India',
        teamB: 'Australia',
        league: 'T20 International Match Series',
        oddsA: 1.84,
        oddsB: 2.06,
        time: 'Live - Overs 14.3'
    },
    {
        id: 'match-2',
        sport: 'football',
        teamA: 'Real Madrid',
        teamB: 'Barcelona',
        league: 'La Liga Championship',
        oddsA: 2.12,
        oddsB: 1.76,
        time: 'Live - 64 mins'
    },
    {
        id: 'match-3',
        sport: 'tennis',
        teamA: 'Carlos Alcaraz',
        teamB: 'Jannik Sinner',
        league: 'Wimbledon Men\'s Singles Semi-Finals',
        oddsA: 1.95,
        oddsB: 1.95,
        time: 'Live - Set 3, Game 4'
    }
];

function renderLiveOdds(matches) {
    const oddsGrid = document.getElementById('oddsGrid');
    if (!oddsGrid) return; // Silent return if not on exchange.html
    
    oddsGrid.innerHTML = ''; // Clear skeleton loader
    
    matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'odd-card';
        card.id = match.id;
        
        // Dynamic Sports Icon
        let sportEmoji = '🏏';
        if (match.sport === 'football') sportEmoji = '⚽';
        if (match.sport === 'tennis') sportEmoji = '🎾';
        
        card.innerHTML = `
            <div class="card-top">
                <span class="sport-tag">${sportEmoji} ${match.sport}</span>
                <span class="live-indicator">LIVE</span>
            </div>
            <h3 class="card-match-title">${match.teamA} vs ${match.teamB}</h3>
            <p class="card-league">${match.league}</p>
            <div class="odds-row">
                <div class="odds-box back">
                    <div class="odds-team-name">${match.teamA}</div>
                    <div class="odds-value-wrapper">
                        <span class="odds-value" id="${match.id}-oddsA">${match.oddsA.toFixed(2)}</span>
                    </div>
                </div>
                <div class="odds-box lay">
                    <div class="odds-team-name">${match.teamB}</div>
                    <div class="odds-value-wrapper">
                        <span class="odds-value" id="${match.id}-oddsB">${match.oddsB.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="card-time">
                    <span>⏱ ${match.time}</span>
                </div>
                <span class="odds-link-lbl">Bet Live ➔</span>
            </div>
        `;
        
        // Redirect to WhatsApp when clicking anywhere on match cards
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const prefilledText = encodeURIComponent(`Hi MyExch, I want to place a bet on the live match ${match.teamA} vs ${match.teamB} with odds ${match.oddsA.toFixed(2)} / ${match.oddsB.toFixed(2)}. Please issue my login credentials.`);
            window.open(`https://wa.me/917970352439?text=${prefilledText}`, '_blank');
        });
        
        oddsGrid.appendChild(card);
    });
}

// Simulated odds updater loop
function updateOddsEngine() {
    const oddsGrid = document.getElementById('oddsGrid');
    if (!oddsGrid) return; // Stop updater if not on exchange.html
    
    INITIAL_MATCHES.forEach(match => {
        // Decide if this match odds will fluctuate (50% chance each cycle)
        if (Math.random() > 0.5) {
            const oddsChangeA = (Math.random() * 0.08 - 0.04);
            const oddsChangeB = (Math.random() * 0.08 - 0.04);
            
            const elementA = document.getElementById(`${match.id}-oddsA`);
            const elementB = document.getElementById(`${match.id}-oddsB`);
            
            if (elementA) {
                const oldVal = match.oddsA;
                match.oddsA = Math.max(1.01, match.oddsA + oddsChangeA);
                elementA.textContent = match.oddsA.toFixed(2);
                
                // Trigger green/red flashing effects
                const direction = match.oddsA > oldVal ? 'flash-up' : 'flash-down';
                elementA.classList.add(direction);
                setTimeout(() => elementA.classList.remove(direction), 1000);
            }
            
            if (elementB) {
                const oldVal = match.oddsB;
                match.oddsB = Math.max(1.01, match.oddsB + oddsChangeB);
                elementB.textContent = match.oddsB.toFixed(2);
                
                const direction = match.oddsB > oldVal ? 'flash-up' : 'flash-down';
                elementB.classList.add(direction);
                setTimeout(() => elementB.classList.remove(direction), 1000);
            }
        }
        
        // Randomly update match minutes or overs
        if (Math.random() > 0.8) {
            if (match.sport === 'cricket') {
                const parts = match.time.split(' ');
                const over = parseFloat(parts[2]);
                match.time = `Live - Overs ${(over + 0.1).toFixed(1)}`;
                const timeEl = document.querySelector(`#${match.id} .card-time span`);
                if (timeEl) timeEl.textContent = `⏱ ${match.time}`;
            }
            if (match.sport === 'football') {
                const parts = match.time.split(' ');
                const mins = parseInt(parts[2]);
                match.time = `Live - ${mins + 1} mins`;
                const timeEl = document.querySelector(`#${match.id} .card-time span`);
                if (timeEl) timeEl.textContent = `⏱ ${match.time}`;
            }
        }
    });
}

// 6. Initialize Page Actions
document.addEventListener('DOMContentLoaded', () => {
    // Only trigger live odds engine if #oddsGrid exists (runs on exchange.html)
    const oddsGrid = document.getElementById('oddsGrid');
    if (oddsGrid) {
        setTimeout(() => {
            renderLiveOdds(INITIAL_MATCHES);
            setInterval(updateOddsEngine, 3500);
        }, 800); // skeleton loading simulation
    }
});
