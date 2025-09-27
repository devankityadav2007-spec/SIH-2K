// Hospital Data Configuration for MediConnect
// Real-time resource data for Pune Healthcare Network

const HOSPITAL_CONFIG = {
    updateInterval: 30000, // 30 seconds
    alertThresholds: {
        icuBeds: { low: 20, medium: 50 },
        oxygenCylinders: { low: 30, medium: 60 },
        ambulances: { low: 25, medium: 50 },
        doctors: { low: 40, medium: 70 }
    }
};

// Extended hospital network data
const EXTENDED_PUNE_HOSPITALS = [
    // Major Government Hospitals
    {
        id: 'SASSOON_09',
        name: 'Sassoon General Hospital',
        lat: 18.4867,
        lng: 73.8550,
        type: 'Government',
        availability: 'medium',
        resources: {
            icuBeds: { total: 50, available: 18, status: 'medium' },
            oxygenCylinders: { total: 150, available: 72, status: 'medium' },
            ambulances: { total: 15, available: 8, status: 'medium' },
            doctors: { total: 120, onDuty: 85, status: 'high' }
        },
        contact: '+91 20 2612 7394',
        address: 'Near Pune Railway Station, Pune'
    },
    
    // Specialty Hospitals
    {
        id: 'ADITYA_BIRLA_10',
        name: 'Aditya Birla Memorial Hospital',
        lat: 18.5314,
        lng: 73.8667,
        type: 'Multi-specialty',
        availability: 'high',
        resources: {
            icuBeds: { total: 42, available: 28, status: 'high' },
            oxygenCylinders: { total: 95, available: 78, status: 'high' },
            ambulances: { total: 9, available: 7, status: 'high' },
            doctors: { total: 68, onDuty: 51, status: 'high' }
        },
        contact: '+91 20 2605 6200',
        address: '90, Pune-Mumbai Highway, Pune'
    },

    // Emergency & Trauma Centers
    {
        id: 'SANCHETI_11',
        name: 'Sancheti Hospital',
        lat: 18.5125,
        lng: 73.8354,
        type: 'Orthopedic Specialty',
        availability: 'requesting',
        resources: {
            icuBeds: { total: 18, available: 2, status: 'low' },
            oxygenCylinders: { total: 40, available: 8, status: 'low' },
            ambulances: { total: 4, available: 1, status: 'low' },
            doctors: { total: 25, onDuty: 18, status: 'medium' }
        },
        contact: '+91 20 2553 9999',
        address: '16, Shivajinagar, Pune'
    }
];

// Emergency Contact Information
const EMERGENCY_CONTACTS = {
    police: '100',
    fire: '101',
    ambulance: '108',
    disaster: '1077',
    medical: '1066',
    coordinationCenter: '+91 20 2555 0000'
};

// Resource sharing agreements between hospitals
const SHARING_AGREEMENTS = {
    'RUBY_HALL_01': ['KEM_HOSPITAL_02', 'APOLLO_04', 'ADITYA_BIRLA_10'],
    'KEM_HOSPITAL_02': ['RUBY_HALL_01', 'BHARATI_08', 'SASSOON_09'],
    'JEHANGIR_03': ['RUBY_HALL_01', 'DEENANATH_06', 'SANCHETI_11'],
    'APOLLO_04': ['MANIPAL_05', 'RUBY_HALL_01', 'ADITYA_BIRLA_10'],
    'MANIPAL_05': ['APOLLO_04', 'DEENANATH_06', 'POONA_07'],
    'DEENANATH_06': ['JEHANGIR_03', 'MANIPAL_05', 'BHARATI_08'],
    'POONA_07': ['MANIPAL_05', 'SANCHETI_11', 'ADITYA_BIRLA_10'],
    'BHARATI_08': ['KEM_HOSPITAL_02', 'DEENANATH_06', 'SASSOON_09']
};

// Medical equipment categories
const EQUIPMENT_CATEGORIES = {
    critical: ['ICU Ventilators', 'Defibrillators', 'Dialysis Machines'],
    monitoring: ['ECG Machines', 'Pulse Oximeters', 'Blood Pressure Monitors'],
    diagnostic: ['X-ray Machines', 'CT Scanners', 'MRI Machines', 'Ultrasound'],
    surgical: ['OT Tables', 'Anesthesia Machines', 'Surgical Instruments'],
    emergency: ['Ambulances', 'Emergency Trolleys', 'Crash Carts']
};

// Real-time alert system configuration
const ALERT_SYSTEM = {
    criticalLevels: {
        icuBeds: 5, // Alert when less than 5 beds available
        oxygenCylinders: 10, // Alert when less than 10 cylinders
        ambulances: 2, // Alert when less than 2 ambulances
        doctors: 5 // Alert when less than 5 doctors on duty
    },
    notificationTypes: {
        shortage: 'Resource Shortage Alert',
        emergency: 'Emergency Response Required', 
        sharing: 'Resource Sharing Request',
        update: 'Resource Status Update'
    }
};

// Mock IoT sensor data simulation
const IOT_SENSORS = {
    temperatureRanges: { min: 18, max: 24 }, // Celsius for medical storage
    humidityRanges: { min: 45, max: 65 }, // Percentage for optimal conditions
    oxygenPressure: { min: 2000, max: 2200 }, // PSI for oxygen tanks
    powerStatus: { backup: true, main: true }, // Power supply status
    securityStatus: { doors: 'locked', cameras: 'active' }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HOSPITAL_CONFIG,
        EXTENDED_PUNE_HOSPITALS,
        EMERGENCY_CONTACTS,
        SHARING_AGREEMENTS,
        EQUIPMENT_CATEGORIES,
        ALERT_SYSTEM,
        IOT_SENSORS
    };
}