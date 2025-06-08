document.getElementById('daftar').addEventListener('submit', function(event) {
    event.preventDefault(); 


    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (password.length < 8) {
        document.getElementById('pesan').innerText = 'Password minimal 8 karakter!!';
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

  
    document.getElementById('pesan').innerText = 'Pendaftaran berhasil! Silakan login.';


    setTimeout(function() {
        window.location.href = 'Login.html';
    }, 2000);
});




const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');

// Fungsi generate kode unik 6 digit
const generateQuizCode = async () => {
  let code;
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString(); // Angka 100000-999999
  } while (await Quiz.exists({ quizCode: code })); // Pastikan kode unik
  return code;
};

// CREATE QUIZ + AUTO-GENERATE CODE
const createQuiz = async (req, res) => {
  const { topicId, question, options, answer, score } = req.body;

  // Validasi input
  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    return res.status(400).json({ message: 'ID Topik tidak valid' });
  }

  if (!question || !options || !answer || !options.includes(answer) || score <= 0 || score > 100) {
    return res.status(400).json({ message: 'Data tidak lengkap atau tidak valid' });
  }

  try {
    // Cek duplikat pertanyaan
    const existingQuiz = await Quiz.findOne({ topicId, question });
    if (existingQuiz) {
      return res.status(400).json({ message: 'Pertanyaan sudah ada untuk topik ini' });
    }

    // Generate kode unik
    const quizCode = await generateQuizCode();

    // Simpan quiz + kode
    const newQuiz = new Quiz({ 
      topicId, 
      question, 
      options, 
      answer, 
      score,
      quizCode // Tambahkan kode otomatis
    });

    await newQuiz.save();
    res.status(201).json({ 
      message: 'Soal berhasil disimpan', 
      quiz: newQuiz,
      quizCode // Kirim kode ke frontend
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal menyimpan soal', 
      error: error.message 
    });
  }
};

// GET QUIZ BY CODE (UNTUK SISWA JOIN)
const getQuizByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const quiz = await Quiz.findOne({ quizCode: code });
    if (!quiz) {
      return res.status(404).json({ message: 'Kode quiz tidak valid' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal mengambil quiz', 
      error: error.message 
    });
  }
};

// GET QUIZZES BY TOPIC
const getQuizzesByTopic = async (req, res) => {
  const { topicId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    return res.status(400).json({ message: 'ID Topik tidak valid' });
  }

  try {
    const quizzes = await Quiz.find({ topicId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ 
      message: 'Gagal mengambil soal', 
      error: error.message 
    });
  }
};


// Ekspor semua fungsi
module.exports = { 
  createQuiz, 
  getQuizzesByTopic, 
  getQuizByCode 
};?