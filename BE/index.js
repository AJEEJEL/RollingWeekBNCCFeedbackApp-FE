const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Mengizinkan frontend mengakses backend
app.use(express.json()); // Untuk membaca body request format JSON

// --- DATABASE SEMENTARA (IN-MEMORY ARRAY)  ---
let feedbacks = [];

// --- ROUTES / ENDPOINTS [cite: 46-51] ---

// 1. GET: Ambil semua feedback (Bisa untuk Admin Panel)
// [cite: 41, 48]
app.get('/api/feedback', (req, res) => {
    const { status } = req.query;
    
    // Fitur Search/Filter sederhana berdasarkan status (jika ada query param)
    if (status) {
        const filteredFeedbacks = feedbacks.filter(f => f.status === status);
        return res.json(filteredFeedbacks);
    }
    
    res.json(feedbacks);
});

// 2. POST: Buat feedback baru (Dari Form Public)
// [cite: 40, 47]
app.post('/api/feedback', (req, res) => {
    const { name, email, eventName, division, rating, comment, suggestion } = req.body;

    // Validasi sederhana
    if (!name || !email || !eventName || !division || !rating) {
        return res.status(400).json({ message: 'Data tidak lengkap!' });
    }

    const newFeedback = {
        id: Date.now().toString(), // Generate ID unik sederhana
        name,
        email,
        eventName,
        division, // Pastikan frontend mengirim salah satu: "LnT", "EEO", "PR", "HRD", "RnD"
        rating: parseInt(rating),
        comment: comment || "",
        suggestion: suggestion || "",
        createdAt: new Date().toISOString(), // [cite: 37]
        status: "open" // Default status [cite: 38]
    };

    feedbacks.push(newFeedback);
    res.status(201).json({ message: 'Feedback berhasil disimpan', data: newFeedback });
});

// 3. PUT: Update feedback (Admin Panel: Ubah status, edit text, dll)
// [cite: 42, 49, 50]
app.put('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    const { status, eventName, division, rating, comment, suggestion } = req.body;

    const index = feedbacks.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Feedback tidak ditemukan' });
    }

    // Update data yang ada
    feedbacks[index] = {
        ...feedbacks[index], // Pertahankan data lama
        status: status || feedbacks[index].status,
        eventName: eventName || feedbacks[index].eventName,
        division: division || feedbacks[index].division,
        rating: rating || feedbacks[index].rating,
        comment: comment || feedbacks[index].comment,
        suggestion: suggestion || feedbacks[index].suggestion
    };

    res.json({ message: 'Feedback berhasil diupdate', data: feedbacks[index] });
});

// 4. DELETE: Hapus feedback (Admin Panel)
// [cite: 43, 51]
app.delete('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    
    const initialLength = feedbacks.length;
    feedbacks = feedbacks.filter(f => f.id !== id);

    if (feedbacks.length === initialLength) {
        return res.status(404).json({ message: 'Feedback tidak ditemukan' });
    }

    res.json({ message: 'Feedback berhasil dihapus' });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});