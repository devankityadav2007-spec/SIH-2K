// MediConnect Main JavaScript File

// Global Variables
let puneMap;
let hospitalMarkers = [];
let currentUser = null;

// Pune Hospitals Data with Real-time Resource Information
const puneHospitals = [
    {
        id: 'RUBY_HALL_01',
        name: 'Ruby Hall Clinic',
        lat: 18.5204,
        lng: 73.8567,
        type: 'Multi-specialty',
        availability: 'high',
        resources: {
            icuBeds: { total: 45, available: 23, status: 'high' },
            oxygenCylinders: { total: 120, available: 89, status: 'high' },
            ambulances: { total: 8, available: 5, status: 'medium' },
            doctors: { total: 65, onDuty: 42, status: 'high' }
        },
        contact: '+91 20 2605 1000',
        address: '40, Sassoon Road, Pune'
    },
    {
        id: 'KEM_HOSPITAL_02',
        name: 'KEM Hospital',
        lat: 18.4889,
        lng: 73.8531,
        type: 'Government',
        availability: 'medium',
        resources: {
            icuBeds: { total: 35, available: 12, status: 'medium' },
            oxygenCylinders: { total: 95, available: 45, status: 'medium' },
            ambulances: { total: 12, available: 7, status: 'high' },
            doctors: { total: 85, onDuty: 58, status: 'high' }
        },
        contact: '+91 20 2612 9884',
        address: 'Rasta Peth, Pune'
    },
    {
        id: 'JEHANGIR_03',
        name: 'Jehangir Hospital',
        lat: 18.5314,
        lng: 73.8446,
        type: 'Multi-specialty',
        availability: 'requesting',
        resources: {
            icuBeds: { total: 28, available: 3, status: 'low' },
            oxygenCylinders: { total: 75, available: 15, status: 'low' },
            ambulances: { total: 6, available: 2, status: 'low' },
            doctors: { total: 48, onDuty: 35, status: 'medium' }
        },
        contact: '+91 20 2605 3232',
        address: '32, Sassoon Road, Pune'
    },
    {
        id: 'APOLLO_04',
        name: 'Apollo Clinic',
        lat: 18.5679,
        lng: 73.9143,
        type: 'Chain Hospital',
        availability: 'high',
        resources: {
            icuBeds: { total: 25, available: 18, status: 'high' },
            oxygenCylinders: { total: 60, available: 42, status: 'high' },
            ambulances: { total: 5, available: 4, status: 'high' },
            doctors: { total: 35, onDuty: 28, status: 'high' }
        },
        contact: '+91 20 3982 3982',
        address: 'Aundh, Pune'
    },
    {
        id: 'MANIPAL_05',
        name: 'Manipal Hospital',
        lat: 18.5018,
        lng: 73.9322,
        type: 'Multi-specialty',
        availability: 'medium',
        resources: {
            icuBeds: { total: 40, available: 15, status: 'medium' },
            oxygenCylinders: { total: 100, available: 55, status: 'medium' },
            ambulances: { total: 10, available: 6, status: 'medium' },
            doctors: { total: 70, onDuty: 48, status: 'high' }
        },
        contact: '+91 20 6805 8058',
        address: 'Baner, Pune'
    },
    {
        id: 'DEENANATH_06',
        name: 'Deenanath Mangeshkar Hospital',
        lat: 18.4668,
        lng: 73.8131,
        type: 'Multi-specialty',
        availability: 'high',
        resources: {
            icuBeds: { total: 38, available: 22, status: 'high' },
            oxygenCylinders: { total: 85, available: 67, status: 'high' },
            ambulances: { total: 7, available: 5, status: 'high' },
            doctors: { total: 55, onDuty: 39, status: 'high' }
        },
        contact: '+91 20 2454 5454',
        address: 'Erandwane, Pune'
    },
    {
        id: 'POONA_07',
        name: 'Poona Hospital',
        lat: 18.5392,
        lng: 73.8950,
        type: 'Multi-specialty',
        availability: 'requesting',
        resources: {
            icuBeds: { total: 22, available: 2, status: 'low' },
            oxygenCylinders: { total: 50, available: 8, status: 'low' },
            ambulances: { total: 4, available: 1, status: 'low' },
            doctors: { total: 32, onDuty: 25, status: 'medium' }
        },
        contact: '+91 20 2553 0393',
        address: 'Shivajinagar, Pune'
    },
    {
        id: 'BHARATI_08',
        name: 'Bharati Vidyapeeth Medical College',
        lat: 18.4594,
        lng: 73.8736,
        type: 'Medical College',
        availability: 'medium',
        resources: {
            icuBeds: { total: 32, available: 14, status: 'medium' },
            oxygenCylinders: { total: 80, available: 38, status: 'medium' },
            ambulances: { total: 8, available: 4, status: 'medium' },
            doctors: { total: 95, onDuty: 67, status: 'high' }
        },
        contact: '+91 20 2437 2181',
        address: 'Dhankawadi, Pune'
    }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Initialize Navigation
    initializeNavigation();
    
    // Initialize Map
    initializePuneMap();
    
    // Initialize Login Form
    initializeLoginForm();
    
    // Initialize Animations
    initializeAnimations();
    
    // Initialize Real-time Updates
    startRealTimeUpdates();
    
    console.log('MediConnect Application Initialized');
}

// Navigation Functions
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Map Initialization
function initializePuneMap() {
    try {
        // Initialize Leaflet map centered on Pune
        puneMap = L.map('pune-map').setView([18.5204, 73.8567], 12);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(puneMap);

        // Add hospital markers
        addHospitalMarkers();
        
        console.log('Pune Map Initialized Successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        document.getElementById('pune-map').innerHTML = 
            '<div class="flex items-center justify-center h-full bg-gray-100 text-gray-600">' +
            '<div class="text-center">' +
            '<i class="fas fa-map-marked-alt text-4xl mb-4"></i>' +
            '<p>Map is loading...</p>' +
            '</div></div>';
    }
}

// Add Hospital Markers to Map
function addHospitalMarkers() {
    puneHospitals.forEach(hospital => {
        // Create custom marker icon based on availability
        const markerClass = `hospital-marker ${hospital.availability}`;
        const icon = getHospitalIcon(hospital.availability);
        
        // Create marker
        const marker = L.marker([hospital.lat, hospital.lng], {
            icon: L.divIcon({
                html: `<div class="${markerClass}">${icon}</div>`,
                className: 'custom-div-icon',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            })
        }).addTo(puneMap);

        // Create popup content
        const popupContent = createHospitalPopup(hospital);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'hospital-popup-wrapper'
        });

        // Store marker reference
        hospitalMarkers.push({
            id: hospital.id,
            marker: marker,
            data: hospital
        });
    });
}

// Get Hospital Icon based on availability
function getHospitalIcon(availability) {
    switch(availability) {
        case 'high':
            return '<i class="fas fa-hospital"></i>';
        case 'medium':
            return '<i class="fas fa-hospital"></i>';
        case 'low':
            return '<i class="fas fa-hospital"></i>';
        case 'requesting':
            return '<i class="fas fa-exclamation"></i>';
        default:
            return '<i class="fas fa-hospital"></i>';
    }
}

// Create Hospital Popup Content
function createHospitalPopup(hospital) {
    return `
        <div class="hospital-popup">
            <h3>${hospital.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${hospital.type} • ${hospital.address}</p>
            
            <div class="space-y-2">
                <div class="resource-item">
                    <span><i class="fas fa-bed mr-2"></i>ICU Beds</span>
                    <span class="resource-status status-${hospital.resources.icuBeds.status}">
                        ${hospital.resources.icuBeds.available}/${hospital.resources.icuBeds.total}
                    </span>
                </div>
                
                <div class="resource-item">
                    <span><i class="fas fa-lungs mr-2"></i>Oxygen Cylinders</span>
                    <span class="resource-status status-${hospital.resources.oxygenCylinders.status}">
                        ${hospital.resources.oxygenCylinders.available}/${hospital.resources.oxygenCylinders.total}
                    </span>
                </div>
                
                <div class="resource-item">
                    <span><i class="fas fa-ambulance mr-2"></i>Ambulances</span>
                    <span class="resource-status status-${hospital.resources.ambulances.status}">
                        ${hospital.resources.ambulances.available}/${hospital.resources.ambulances.total}
                    </span>
                </div>
                
                <div class="resource-item">
                    <span><i class="fas fa-user-md mr-2"></i>Doctors on Duty</span>
                    <span class="resource-status status-${hospital.resources.doctors.status}">
                        ${hospital.resources.doctors.onDuty}/${hospital.resources.doctors.total}
                    </span>
                </div>
            </div>
            
            <div class="mt-3 pt-3 border-t">
                <p class="text-xs text-gray-500">
                    <i class="fas fa-phone mr-1"></i>${hospital.contact}
                </p>
                <button onclick="requestResources('${hospital.id}')" 
                        class="mt-2 w-full bg-primary text-white py-1 px-3 rounded text-sm hover:bg-blue-600 transition-colors">
                    Request Resources
                </button>
            </div>
        </div>
    `;
}

// Hospital Login System
function initializeLoginForm() {
    const loginForm = document.getElementById('hospital-login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const hospitalId = document.getElementById('hospital-id').value;
    const password = document.getElementById('password').value;
    
    // Simple demo authentication
    if (hospitalId === 'RUBY_HALL_01' && password === 'demo123') {
        showLoginSuccess();
        currentUser = puneHospitals.find(h => h.id === hospitalId);
        showHospitalDashboard();
    } else {
        showLoginError('Invalid credentials. Use RUBY_HALL_01 / demo123 for demo.');
    }
}

// Show Login Success
function showLoginSuccess() {
    const loginSection = document.getElementById('login');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Login successful! Welcome to MediConnect Network.';
    
    loginSection.querySelector('.container').prepend(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Show Login Error
function showLoginError(message) {
    const loginSection = document.getElementById('login');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-error';
    alertDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    
    loginSection.querySelector('.container').prepend(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Show Hospital Dashboard
function showHospitalDashboard() {
    const loginForm = document.querySelector('#hospital-login-form').parentElement;
    
    const dashboardHTML = `
        <div class="dashboard-preview active">
            <h3 class="text-2xl font-bold text-dark mb-4">
                <i class="fas fa-tachometer-alt mr-2"></i>
                ${currentUser.name} - Live Dashboard
            </h3>
            
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h4>ICU Beds</h4>
                    <div class="value text-blue-600">${currentUser.resources.icuBeds.available}</div>
                    <div class="trend up">Available now</div>
                </div>
                
                <div class="dashboard-card">
                    <h4>Oxygen Supply</h4>
                    <div class="value text-green-600">${currentUser.resources.oxygenCylinders.available}</div>
                    <div class="trend up">Cylinders ready</div>
                </div>
                
                <div class="dashboard-card">
                    <h4>Ambulances</h4>
                    <div class="value text-purple-600">${currentUser.resources.ambulances.available}</div>
                    <div class="trend up">Ready for dispatch</div>
                </div>
                
                <div class="dashboard-card">
                    <h4>Medical Staff</h4>
                    <div class="value text-red-600">${currentUser.resources.doctors.onDuty}</div>
                    <div class="trend up">Doctors on duty</div>
                </div>
            </div>
            
            <div class="mt-6 flex space-x-4">
                <button onclick="updateResources()" class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <i class="fas fa-sync-alt mr-2"></i>Update Resources
                </button>
                <button onclick="requestEmergencySupport()" class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    <i class="fas fa-exclamation-triangle mr-2"></i>Emergency Request
                </button>
                <button onclick="logout()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    <i class="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
            </div>
        </div>
    `;
    
    loginForm.innerHTML = dashboardHTML;
}

// Update Resources
function updateResources() {
    showAlert('Resources updated successfully!', 'success');
    
    // Simulate real-time update
    setTimeout(() => {
        const dashboard = document.querySelector('.dashboard-preview');
        if (dashboard) {
            dashboard.style.opacity = '0.7';
            setTimeout(() => {
                dashboard.style.opacity = '1';
            }, 500);
        }
    }, 1000);
}

// Request Emergency Support
function requestEmergencySupport() {
    const message = 'Emergency support request sent to MediConnect network. Nearby hospitals will be notified.';
    showAlert(message, 'info');
}

// Request Resources from another hospital
function requestResources(hospitalId) {
    const hospital = puneHospitals.find(h => h.id === hospitalId);
    const message = `Resource request sent to ${hospital.name}. They will respond within 15 minutes.`;
    showAlert(message, 'info');
}

// Logout Function
function logout() {
    currentUser = null;
    location.reload();
}

// Show Alert
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.minWidth = '300px';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 4000);
}

// Animation Initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-on-scroll, .problem-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Real-time Updates Simulation
function startRealTimeUpdates() {
    // Simulate resource updates every 30 seconds
    setInterval(() => {
        updateResourceCounters();
        updateMapMarkers();
    }, 30000);
    
    console.log('Real-time updates started');
}

// Update Resource Counters
function updateResourceCounters() {
    const counters = [
        { selector: '.resource-stat:nth-child(1) .text-2xl', min: 200, max: 300 },
        { selector: '.resource-stat:nth-child(2) .text-2xl', min: 1500, max: 2000 },
        { selector: '.resource-stat:nth-child(3) .text-2xl', min: 50, max: 80 },
        { selector: '.resource-stat:nth-child(4) .text-2xl', min: 350, max: 500 }
    ];

    counters.forEach(counter => {
        const element = document.querySelector(counter.selector);
        if (element) {
            const newValue = Math.floor(Math.random() * (counter.max - counter.min + 1)) + counter.min;
            animateCounter(element, parseInt(element.textContent), newValue);
        }
    });
}

// Animate Counter
function animateCounter(element, start, end) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Update Map Markers
function updateMapMarkers() {
    // Simulate resource changes
    puneHospitals.forEach(hospital => {
        // Random small changes to simulate real-time updates
        const resources = hospital.resources;
        
        // Simulate minor changes
        Object.keys(resources).forEach(key => {
            const resource = resources[key];
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2 change
            resource.available = Math.max(0, Math.min(resource.total, resource.available + change));
            
            // Update status based on availability percentage
            const percentage = resource.available / resource.total;
            if (percentage > 0.6) resource.status = 'high';
            else if (percentage > 0.3) resource.status = 'medium';
            else resource.status = 'low';
        });
    });
}

// Utility Functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getStatusColor(status) {
    switch(status) {
        case 'high': return '#10b981';
        case 'medium': return '#f59e0b';
        case 'low': return '#ef4444';
        default: return '#6b7280';
    }
}

// Export for global use
window.MediConnect = {
    updateResources,
    requestEmergencySupport,
    requestResources,
    logout,
    showAlert
};