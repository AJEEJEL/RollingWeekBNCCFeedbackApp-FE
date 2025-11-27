# BNCC Internal Event Feedback System - Backend

Ini adalah repository backend untuk sistem feedback acara internal BNCC. Backend ini dibangun menggunakan **Node.js** dan **Express.js**, menyediakan API untuk operasi CRUD (Create, Read, Update, Delete) data feedback.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Utilities:** Cors, Nodemon

## Cara Menjalankan (Run Locally)

Ikuti langkah-langkah berikut untuk menjalankan server di lokal:

1.  **Clone Repository**
    ```bash
    git clone <URL_REPOSITORY_KAMU>
    cd bncc-feedback-backend
    ```

2.  **Install Dependencies**
    Install semua library yang dibutuhkan (Express, Cors, dll).
    ```bash
    npm install
    ```

3.  **Jalankan Server**
    Mode development (auto-restart saat ada perubahan):
    ```bash
    npm run dev
    ```
    Atau mode standar:
    ```bash
    node server.js
    ```

4.  **Selesai**
    Server akan berjalan di: `http://localhost:3000`

---

## Dokumentasi API

Berikut adalah daftar endpoint yang tersedia untuk Frontend.

### 1. Get All Feedbacks
Mengambil semua data feedback. Bisa juga difilter berdasarkan status.

* **Endpoint:** `GET /api/feedback`
* **Query Param (Opsional):** `?status=open` (atau `resolved`, `in-review`)

### 2. Create Feedback
Mengirim feedback baru (dari Form Public).

* **Endpoint:** `POST /api/feedback`
* **Body (JSON):**
    ```json
    {
      "name": "Budi Santoso",
      "email": "budi@binus.ac.id",
      "eventName": "Workshop React",
      "division": "LnT",
      "rating": 5,
      "comment": "Materi sangat bagus",
      "suggestion": "AC ruangan tolong didinginkan",
      "status": "open"
    }
    ```
    *Note: `division` harus salah satu dari: "LnT", "EEO", "PR", "HRD", "RnD".*

### 3. Update Feedback
Mengupdate data feedback (misalnya mengubah status di Admin Panel).

* **Endpoint:** `PUT /api/feedback/:id`
* **Contoh URL:** `http://localhost:3000/api/feedback/173250123456`
* **Body (JSON):**
    ```json
    {
      "status": "resolved",
      "comment": "Materi sangat bagus (Edited)"
    }
    ```

### 4. Delete Feedback
Menghapus satu data feedback.

* **Endpoint:** `DELETE /api/feedback/:id`

---

## Catatan Penting
Saat ini penyimpanan data menggunakan **In-Memory Array**.
Artinya, jika server dimatikan atau direstart, **semua data yang sudah diinput akan hilang (reset)**.

---
**Created for Quest Rolling Week - RnD BNCC 37**
