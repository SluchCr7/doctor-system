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
            { date: "2024-02-10", reason: "Annual Checkup", doctor: "Dr. Sarah Smith", diagnosis: "Healthy" },
            { date: "2023-08-15", reason: "Fever", doctor: "Dr. James Wilson", diagnosis: "Common Cold" }
        ]
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
            { date: "2024-02-15", reason: "Shortness of breath", doctor: "Dr. Robert Chen", diagnosis: "Mild Asthma Flare-up" }
        ]
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
            { date: "2024-01-20", reason: "Diabetes Follow-up", doctor: "Dr. Sarah Smith", diagnosis: "Stable" }
        ]
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
            { date: "2024-02-05", reason: "Sprained Ankle", doctor: "Dr. James Wilson", diagnosis: "Grade 1 Sprain" }
        ]
    }
];

export const doctors = [
    {
        id: "D001",
        name: "Dr. Sarah Smith",
        specialty: "General Medicine",
        experience: "15 years",
        email: "sarah.smith@clinic.com",
        phone: "+1 888-123-4567",
        image: "https://i.pravatar.cc/150?u=sarah",
        availability: "Mon, Wed, Fri",
        patients: 450,
        rating: 4.9
    },
    {
        id: "D002",
        name: "Dr. James Wilson",
        specialty: "Orthopedics",
        experience: "10 years",
        email: "james.wilson@clinic.com",
        phone: "+1 888-123-4568",
        image: "https://i.pravatar.cc/150?u=james",
        availability: "Tue, Thu, Sat",
        patients: 320,
        rating: 4.8
    },
    {
        id: "D003",
        name: "Dr. Robert Chen",
        specialty: "Pulmonology",
        experience: "12 years",
        email: "robert.chen@clinic.com",
        phone: "+1 888-123-4569",
        image: "https://i.pravatar.cc/150?u=robert",
        availability: "Mon, Tue, Wed",
        patients: 280,
        rating: 4.7
    },
    {
        id: "D004",
        name: "Dr. Lisa Ray",
        specialty: "Cardiology",
        experience: "20 years",
        email: "lisa.ray@clinic.com",
        phone: "+1 888-123-4570",
        image: "https://i.pravatar.cc/150?u=lisa",
        availability: "Mon, Thu, Fri",
        patients: 600,
        rating: 5.0
    }
];

export const appointments = [
    {
        id: "A001",
        patientName: "John Doe",
        doctorName: "Dr. Sarah Smith",
        date: "2024-02-20",
        time: "09:00 AM",
        status: "Confirmed",
        reason: "Checkup"
    },
    {
        id: "A002",
        patientName: "Jane Smith",
        doctorName: "Dr. Robert Chen",
        date: "2024-02-20",
        time: "10:30 AM",
        status: "Pending",
        reason: "Asthma Review"
    },
    {
        id: "A003",
        patientName: "Robert Johnson",
        doctorName: "Dr. Sarah Smith",
        date: "2024-02-21",
        time: "11:00 AM",
        status: "Confirmed",
        reason: "Blood Test"
    },
    {
        id: "A004",
        patientName: "Emily Davis",
        doctorName: "Dr. James Wilson",
        date: "2024-02-21",
        time: "02:00 PM",
        status: "Completed",
        reason: "Checkup"
    }
];

export const stats = {
    totalPatients: 1284,
    todayAppointments: 36,
    pendingPayments: 4820,
    activeDoctors: 8
};

export const invoices = [
    { id: "INV-001", patient: "John Doe", amount: 150, status: "Paid", date: "2024-02-10" },
    { id: "INV-002", patient: "Jane Smith", amount: 200, status: "Pending", date: "2024-02-15" },
    { id: "INV-003", patient: "Robert Johnson", amount: 75, status: "Paid", date: "2024-01-20" },
    { id: "INV-004", patient: "Emily Davis", amount: 120, status: "Overdue", date: "2024-01-15" }
];
