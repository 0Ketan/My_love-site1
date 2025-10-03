document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const message = document.getElementById('message');
    const buttonContainer = document.querySelector('.button-container');
    const container = document.querySelector('.container');
    
    // Variables to track animation states
    let heartInterval;
    let kissInterval;
    
    // Create floating hearts for main page
    function createFloatingHearts() {
        // Clear any existing interval
        if (heartInterval) clearInterval(heartInterval);
        
        // Create hearts continuously
        heartInterval = setInterval(() => {
            if (!message.classList.contains('hidden')) {
                // Stop creating hearts if we're on the love message page
                clearInterval(heartInterval);
                return;
            }
            
            createSimpleHeart();
        }, 300); // Create a new heart every 300ms
    }
    
    // Create a single simple heart
    function createSimpleHeart() {
        const heart = document.createElement('div');
        heart.className = 'simple-heart';
        
        // Random position at the top or left edge
        const startFromTop = Math.random() > 0.5; // 50% chance to start from top, 50% from left
        
        if (startFromTop) {
            // Start from top edge, random horizontal position
            const left = Math.random() * 100;
            heart.style.left = `${left}vw`;
            heart.style.top = `-30px`; // Start above the viewport
        } else {
            // Start from left edge, random vertical position
            const top = Math.random() * 50; // Within top 50% of viewport
            heart.style.left = `-30px`; // Start left of viewport
            heart.style.top = `${top}vh`;
        }
        
        // Random size (10px to 30px)
        const size = 10 + Math.random() * 20;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Set consistent color
        heart.style.backgroundColor = '#ff6b6b';
        
        // Random animation duration (5s to 15s)
        const duration = 5 + Math.random() * 10;
        heart.style.animationDuration = `${duration}s`;
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration * 1000);
    }
    
    // Create continuous kiss animation
    function createContinuousKisses() {
        // Clear any existing interval
        if (kissInterval) clearInterval(kissInterval);
        
        // Create kisses continuously
        kissInterval = setInterval(() => {
            if (message.classList.contains('hidden')) {
                // Stop creating kisses if we're back on the main page
                clearInterval(kissInterval);
                return;
            }
            
            createKiss();
        }, 150); // Create a new kiss every 150ms
    }
    
    // Create a single kiss
    function createKiss() {
        const kiss = document.createElement('div');
        kiss.className = 'kiss';
        kiss.textContent = getRandomKiss();
        
        // Random position at the top
        const left = Math.random() * 100;
        kiss.style.left = `${left}%`;
        kiss.style.top = '-30px'; // Start above the viewport
        
        // Random size (20px to 50px)
        const size = 20 + Math.random() * 30;
        kiss.style.fontSize = `${size}px`;
        
        // Random animation duration (3s to 8s)
        const duration = 3 + Math.random() * 5;
        kiss.style.animationDuration = `${duration}s`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        kiss.style.transform = `rotate(${rotation}deg)`;
        
        document.body.appendChild(kiss);
        
        // Remove kiss after animation completes
        setTimeout(() => {
            if (kiss.parentNode) {
                kiss.parentNode.removeChild(kiss);
            }
        }, duration * 1000);
    }
    
    // Get random kiss emoji
    function getRandomKiss() {
        const kisses = ['💋', '💖', '💕', '💓', '💗', '💘', '💞', '😘', '🥰', '😍'];
        return kisses[Math.floor(Math.random() * kisses.length)];
    }
    
    // Function to move the "No" button to a random position within the container
    function moveNoButton() {
        // Get container dimensions
        const containerRect = buttonContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // Get button dimensions
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        
        // Calculate max positions to keep button within container
        const maxX = containerWidth - buttonWidth;
        const maxY = containerHeight - buttonHeight;
        
        // Generate random positions within valid range
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        // Apply new position
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
    
    // Add mouseover event to the "No" button
    noBtn.addEventListener('mouseover', moveNoButton);
    
    // Add touch event for mobile devices
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    // Add click event to the "Yes" button
    yesBtn.addEventListener('click', function() {
        // Hide the buttons
        buttonContainer.style.display = 'none';
        // Hide the question
        document.querySelector('h1').style.display = 'none';
        // Show the message
        message.classList.remove('hidden');
        
        // Start continuous kiss animation
        createContinuousKisses();
    });
    
    // Initialize floating hearts
    createFloatingHearts();
});