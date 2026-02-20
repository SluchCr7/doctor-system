// ─────────────────────────────────────────────────────────────────────────────
// CLINIC DOCTOR — Static doctor profile (single-doctor system)
// ─────────────────────────────────────────────────────────────────────────────

export const clinicDoctor = {
    id: "D001",
    name: "Dr. Alexander Hayes",
    title: "Dr.",
    firstName: "Alexander",
    lastName: "Hayes",
    specialty: "General Medicine & Family Care",
    qualifications: "MD, MBBS, MRCP",
    experience: "14 years",
    email: "dr.hayes@alexanderclinic.com",
    phone: "+1 (888) 204-7700",
    image: "https://i.pravatar.cc/150?u=alexander",
    availability: "Mon – Fri",
    clinicHours: "09:00 AM – 06:00 PM",
    bio: "Dr. Hayes specializes in general medicine and preventive care, with over 14 years of clinical experience. He is committed to building long-term relationships with his patients through compassionate, evidence-based care.",
    address: "42 Halcyon Medical Center, Suite 3, Downtown District",
    rating: 4.9,
    reviewCount: 312,
    languagesSpoken: ["English", "French"],
    licenseNumber: "MD-2010-4421",
};

// ─────────────────────────────────────────────────────────────────────────────
// Patients
// ─────────────────────────────────────────────────────────────────────────────

export const patients = [
    {
        id: "P001",
        name: "John Doe",
        age: 45,
        gender: "Male",
        phone: "+1 234-567-8901",
        email: "john.doe@example.com",
        address: "123 Maple St, Springfield",
        lastVisit: "2024-02-10",
        status: "Regular",
        bloodGroup: "O+",
        allergies: ["Penicillin", "Peanuts"],
        chronicDiseases: ["Hypertension"],
        history: [
            { date: "2024-02-10", reason: "Annual Checkup", doctor: clinicDoctor.name, diagnosis: "Healthy, BP slightly elevated" },
            { date: "2023-08-15", reason: "Fever & Fatigue", doctor: clinicDoctor.name, diagnosis: "Common Viral Infection" },
        ],
    },
    {
        id: "P002",
        name: "Jane Smith",
        age: 32,
        gender: "Female",
        phone: "+1 234-567-8902",
        email: "jane.smith@example.com",
        address: "456 Oak Ave, Riverside",
        lastVisit: "2024-02-15",
        status: "New",
        bloodGroup: "A-",
        allergies: ["Sulfa drugs"],
        chronicDiseases: ["Asthma"],
        history: [
            { date: "2024-02-15", reason: "Shortness of breath", doctor: clinicDoctor.name, diagnosis: "Mild Asthma Flare-up" },
        ],
    },
    {
        id: "P003",
        name: "Robert Johnson",
        age: 58,
        gender: "Male",
        phone: "+1 234-567-8903",
        email: "robert.j@example.com",
        address: "789 Pine Rd, Hilltop",
        lastVisit: "2024-01-20",
        status: "Regular",
        bloodGroup: "B+",
        allergies: [],
        chronicDiseases: ["Type 2 Diabetes"],
        history: [
            { date: "2024-01-20", reason: "Diabetes Follow-up", doctor: clinicDoctor.name, diagnosis: "Stable — A1C improved" },
        ],
    },
    {
        id: "P004",
        name: "Emily Davis",
        age: 27,
        gender: "Female",
        phone: "+1 234-567-8904",
        email: "emily.d@example.com",
        address: "321 Elm St, Downtown",
        lastVisit: "2024-02-05",
        status: "Emergency",
        bloodGroup: "AB+",
        allergies: ["Latex"],
        chronicDiseases: [],
        history: [
            { date: "2024-02-05", reason: "Sprained Ankle", doctor: clinicDoctor.name, diagnosis: "Grade 1 Sprain" },
        ],
    },
    {
        id: "P005",
        name: "Michael Chen",
        age: 41,
        gender: "Male",
        phone: "+1 234-567-8905",
        email: "m.chen@example.com",
        address: "654 Birch Lane, Eastside",
        lastVisit: "2024-02-18",
        status: "Regular",
        bloodGroup: "O-",
        allergies: ["Aspirin"],
        chronicDiseases: ["Hypertension", "High Cholesterol"],
        history: [
            { date: "2024-02-18", reason: "Lipid Panel Review", doctor: clinicDoctor.name, diagnosis: "Cholesterol moderately elevated — medication adjusted" },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Appointments (all linked to the single clinic doctor)
// ─────────────────────────────────────────────────────────────────────────────

export const appointments = [
    {
        id: "A001",
        patientName: "John Doe",
        patientId: "P001",
        date: "2026-02-20",
        time: "09:00 AM",
        status: "Confirmed",
        reason: "Annual Checkup",
        notes: "Patient requested follow-up on BP readings.",
    },
    {
        id: "A002",
        patientName: "Jane Smith",
        patientId: "P002",
        date: "2026-02-20",
        time: "10:30 AM",
        status: "Pending",
        reason: "Asthma Review",
        notes: "Bring latest inhaler and peak flow meter records.",
    },
    {
        id: "A003",
        patientName: "Robert Johnson",
        patientId: "P003",
        date: "2026-02-21",
        time: "11:00 AM",
        status: "Confirmed",
        reason: "Diabetes Follow-up",
        notes: "Blood glucose log required.",
    },
    {
        id: "A004",
        patientName: "Emily Davis",
        patientId: "P004",
        date: "2026-02-21",
        time: "02:00 PM",
        status: "Completed",
        reason: "Ankle Follow-up",
        notes: "X-ray results to be reviewed.",
    },
    {
        id: "A005",
        patientName: "Michael Chen",
        patientId: "P005",
        date: "2026-02-22",
        time: "09:30 AM",
        status: "Confirmed",
        reason: "Lipid Panel Review",
        notes: "Bring updated lipid panel test results.",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Clinic-level Stats (no multi-doctor metrics)
// ─────────────────────────────────────────────────────────────────────────────

export const stats = {
    totalPatients: 1284,
    todayAppointments: 8,
    pendingPayments: 4820,
    monthlyRevenue: 12840,
};

// ─────────────────────────────────────────────────────────────────────────────
// Invoices
// ─────────────────────────────────────────────────────────────────────────────

export const invoices = [
    { id: "INV-001", patient: "John Doe", patientId: "P001", service: "Annual Checkup", amount: 150, status: "Paid", date: "2024-02-10" },
    { id: "INV-002", patient: "Jane Smith", patientId: "P002", service: "Asthma Consultation", amount: 200, status: "Pending", date: "2024-02-15" },
    { id: "INV-003", patient: "Robert Johnson", patientId: "P003", service: "Diabetes Follow-up", amount: 75, status: "Paid", date: "2024-01-20" },
    { id: "INV-004", patient: "Emily Davis", patientId: "P004", service: "Emergency Consultation", amount: 120, status: "Overdue", date: "2024-01-15" },
    { id: "INV-005", patient: "Michael Chen", patientId: "P005", service: "Lipid Panel Review", amount: 95, status: "Paid", date: "2024-02-18" },
];
