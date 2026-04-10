import React, { useState, useEffect } from 'react';
import './index.css';

// Memanggil gambar dari folder lokal
import logoImage from './assets/logo.jpeg';
import fotoPakar1 from './assets/melissa.jpg';
import fotoPakar2 from './assets/dr-bret.jpg';
import fotoPakar3 from './assets/ellie.jpg';
import imgHbm from './assets/hbn.jpg';
import imgAndersen from './assets/andersen.jpg';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [gigiKondisi, setGigiKondisi] = useState('preventif');

  // State Kuis
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScores, setQuizScores] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    // Optimasi Scroll dengan passive: true agar tidak menahan scroll bawaan browser
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Efek Animasi Scroll (Reveal)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Hentikan observasi setelah elemen muncul agar lebih ringan
          // observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 }); // Turunkan threshold agar lebih cepat terpicu

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Data Kuis PIMNAS
  const questions = [
    "1. Biaya perawatan gigi terasa memberatkan bagi saya.",
    "2. Saya menunda periksa gigi karena khawatir dengan biayanya.",
    "3. Meskipun ada BPJS/asuransi, saya tetap merasa biaya perawatan gigi mahal.",
    "4. Jika biaya perawatan gigi lebih murah, saya akan lebih rutin kontrol."
  ];

  const handleAnswer = (score) => {
    const newScores = [...quizScores, score];
    setQuizScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newScores.reduce((a, b) => a + b, 0);
      let resultText = "";
      if (totalScore >= 16) {
        resultText = "Tingkat Hambatan Biaya Anda TINGGI (Red Zone). Anda sangat rentan membiarkan masalah gigi memburuk. Segera manfaatkan fasilitas BPJS di FKTP terdekat!";
      } else if (totalScore >= 10) {
        resultText = "Tingkat Hambatan Biaya Anda SEDANG (Yellow Zone). Anda masih ragu ke dokter gigi. Edukasi lebih lanjut tentang asuransi kesehatan sangat Anda butuhkan.";
      } else {
        resultText = "Tingkat Hambatan Biaya Anda RENDAH (Green Zone). Bagus! Anda memiliki kesadaran preventif yang baik. Pertahankan jadwal kontrol 6 bulan sekali.";
      }
      setQuizResult(resultText);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setQuizScores([]);
    setQuizResult(null);
  };

  // Data Kalkulator Lengkap
  const calcData = {
    preventif: {
      title: "Sangat Hemat & Terkendali! 🟢",
      cost: "Rp 0 (BPJS) - Rp 200.000",
      desc: "Konsultasi medik (Rp 15.000). Pembersihan karang gigi dikenakan Rp 75.000 per rahang atau Rp 50.000 per kuadran.",
      bpjs: "Ditanggung 100% oleh BPJS Kesehatan (1x setahun atas indikasi medis)."
    },
    sensitif: {
      title: "Perawatan Ringan 🟡",
      cost: "Rp 0 (BPJS) - Rp 100.000",
      desc: "Penanganan gigi ngilu/tambal leher gigi. Tumpatan tetap GIC/ART (Rp 70.000 - Rp 75.000) atau tumpatan Komposit (Rp 100.000).",
      bpjs: "Pemeriksaan dan penambalan leher gigi ditanggung penuh jika ada indikasi medis."
    },
    gusi_bengkak: {
      title: "Perawatan Gusi (Periodontal) 🟠",
      cost: "Rp 0 (BPJS) - Rp 80.000+",
      desc: "Gusi sering berdarah atau bengkak. Memerlukan tindakan relief of pain (Rp 20.000) hingga splinting (Rp 80.000 per gigi).",
      bpjs: "Perawatan radang gusi dasar dan medikasi (obat) ditanggung 100% oleh BPJS."
    },
    lubang_kecil: {
      title: "Segera Tindak Lanjut! 🟡",
      cost: "Rp 0 (BPJS) - Rp 150.000",
      desc: "Gigi mulai berlubang tapi belum sakit. Tumpatan GIC (Rp 70.000) hingga tumpatan komposit light curing (Rp 100.000 - Rp 150.000).",
      bpjs: "Penambalan bahan standar (GIC/Komposit) ditanggung penuh oleh BPJS."
    },
    lubang_besar: {
      title: "Butuh Perawatan Bertahap 🔴",
      cost: "Rp 20.000 - Rp 150.000 (per kunjungan)",
      desc: "Lubang mencapai saraf. Butuh Open Bor/Grinding (Rp 25.000), tumpatan dengan perawatan syaraf (Rp 20.000/tindakan), hingga ditambal permanen (Rp 150.000).",
      bpjs: "Perawatan Saluran Akar (PSA) dasar ditanggung penuh oleh BPJS di FKTP/Puskesmas."
    },
    cabut_gigi_biasa: {
      title: "Pencabutan Standar 🟠",
      cost: "Rp 0 (BPJS) - Rp 60.000",
      desc: "Gigi goyang atau sisa akar. Cabut gigi sulung/anak (Rp 25.000 - Rp 50.000) dan cabut gigi tetap (Rp 60.000).",
      bpjs: "Pencabutan gigi tanpa penyulit ditanggung 100% oleh BPJS Kesehatan."
    },
    gigi_bungsu: {
      title: "Tindakan Bedah Minor 🔴",
      cost: "Rp 0 (BPJS) - Rp 150.000+",
      desc: "Gigi bungsu bermasalah. Cabut gigi dengan komplikasi di tingkat Puskesmas (Rp 150.000). Jika impaksi berat, wajib dirujuk ke RS.",
      bpjs: "Operasi bedah mulut gigi bungsu DITANGGUNG PENUH di Rumah Sakit menggunakan surat rujukan dari FKTP."
    },
    gigi_palsu: {
      title: "Rehabilitasi (Prostodontik) 🔵",
      cost: "Rp 350.000 - Rp 1.250.000",
      desc: "Bahan Akrilik (Mulai Rp 350.000 untuk 1 gigi) hingga Full Denture bahan Valplast (Rp 1.250.000 per rahang). Pembongkaran gigi palsu tukang gigi (Rp 150.000).",
      bpjs: "Diberikan SUBSIDI (bantuan dana) maksimal Rp 1.000.000 oleh BPJS, sisanya dibayar pasien (cost-sharing)."
    },
    kawat_gigi: {
      title: "Perawatan Estetika (Ortodonti) 🟣",
      cost: "Rp 450.000/gigi - Rp 15 Juta+",
      desc: "Opsi 1 (Puskesmas): Alat ortodonti lepasan seharga Rp 450.000 PER GIGI. Opsi 2 (Klinik Swasta): Kawat gigi cekat (behel permanen) mulai dari Rp 4 Juta hingga belasan juta rupiah.",
      bpjs: "TIDAK DITANGGUNG BPJS Kesehatan karena masuk kategori perawatan kosmetik/estetika."
    }
  };

  // DATA KLINIK (8 Lokasi)
  const clinics = [
    { name: "RSGM Universitas Brawijaya", area: "Sekitar UB", addr: "Jl. Veteran No.16a, Ketawanggede", phone: "082221674202", map: "https://maps.app.goo.gl/pdWkuRV3VJ33x2ag9", desc: "Rumah Sakit Gigi khusus dengan layanan spesialis terlengkap." },
    { name: "FDC Malang (Dinoyo)", area: "Lowokwaru", addr: "Jl. MT. Haryono No.4, Dinoyo", phone: "081119963992", map: "https://maps.app.goo.gl/biGrPXjR7gfiTu3Q9", desc: "Klinik gigi modern dengan fasilitas nyaman dan estetik." },
    { name: "Smooth Dental Care", area: "Lowokwaru", addr: "Jl. Kalpataru No.33, Jatimulyo", phone: "08113822726", map: "https://maps.app.goo.gl/dHpBisWSvFQhQ5EE6", desc: "Tersedia layanan dokter gigi umum dan berbagai spesialis gigi." },
    { name: "ConfiDental Sigura-gura", area: "Sigura-Gura", addr: "Jl. Sigura - Gura, Sumbersari", phone: "082143180437", map: "https://maps.app.goo.gl/s2EfcLWrud5w98ve6", desc: "Pilihan populer bagi mahasiswa di kawasan Sigura-Gura." },
    { name: "NDC Esthetic Sigura-gura", area: "Sigura-Gura", addr: "Jl. Bend. Sigura-Gura Barat No.56B", phone: "085336376577", map: "https://maps.app.goo.gl/49qyZbNaCpfo58zm9", desc: "Klinik dengan suasana nyaman ala Ubud untuk mengurangi rasa cemas." },
    { name: "ConfiDental W.R. Supratman", area: "Klojen", addr: "Jl. W.R. Supratman No.Kav.6", phone: "082143180437", map: "https://maps.app.goo.gl/TYVVLhgPoci8EcpN9", desc: "Layanan gigi terpadu dengan standar tinggi di pusat kota." },
    { name: "RS Panti Waluya Sawahan", area: "Klojen", addr: "Jl. Nusakambangan No.56", phone: "(0341) 366033", map: "https://maps.app.goo.gl/PF5YF9P2CZtteUQA8", desc: "Poliklinik gigi rumah sakit yang melayani kasus umum dan gawat darurat." },
    { name: "ConfiDental Aluminium", area: "Blimbing", addr: "Jl. Aluminium No.9, Purwantoro", phone: "082143180437", map: "https://maps.app.goo.gl/yJLbArxr5SFR8KhV6", desc: "Klinik gigi profesional untuk akses mudah warga area Blimbing." }
  ];

  // DATA PAKAR
  const expertData = [
    { name: "Melissa Burroughs, MPH", role: "Pakar Kebijakan Publik, CareQuest", quote: "Kita sedang menghadapi krisis kesehatan gigi. Hambatan akses layanan, tingginya persepsi biaya, dan lemahnya edukasi preventif adalah kombinasi berbahaya yang memperburuk keadaan secara sistemik.", photo: fotoPakar1 },
    { name: "Dr. Brett Kessler, DDS", role: "Mantan Presiden ADA", quote: "Pemisahan layanan medis dan gigi dalam asuransi adalah kesalahan. Saatnya perawatan gigi diintegrasikan penuh ke dalam sistem jaminan kesehatan (Universal Coverage) masyarakat esensial.", photo: fotoPakar2 },
    { name: "Dr. Ellie Phillips, DDS", role: "Pakar Kedokteran Gigi Preventif", quote: "Kesehatan yang sejati dimulai dari edukasi. Kekuatan untuk menyembuhkan ada di tangan pasien melalui pencegahan mandiri, bukan hanya berpasrah di kursi dokter gigi.", photo: fotoPakar3 }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-brand-logo-link">
          <img src={logoImage} alt="DENTA·CARE Logo" className="nav-logo-image" />
          <span className="nav-brand-text">DENTA<span>CARE</span></span>
        </a>
        <div className="nav-links">
          <a href="#fakta">Latar Belakang</a>
          <a href="#kalkulator">Edukasi & Simulasi</a>
          <a href="#maps">Cari Klinik</a>
          <a href="#riset">Profil Riset</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero reveal">
        <div className="hero-content">
          <span className="hero-badge hover-float" style={{ background: '#1D9E75', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px', display: 'inline-block' }}>
            Pendekatan Promotif-Preventif
          </span>
          <h1 className="mb-4 text-glow">Jangan Biarkan Persepsi Biaya Menghancurkan Senyummu.</h1>
          <p className="mb-8">
            Lebih dari sekadar mengobati. DENTA-CARE hadir untuk membongkar stigma "dokter gigi itu mahal"
            dan mendorong masyarakat untuk melakukan pencegahan dini sebelum terlambat.
          </p>
          <div className="hero-btns">
            <a href="#kalkulator" className="btn-primary hover-scale">Kalkulator Biaya ↓</a>
            <a href="#kuis" className="btn-primary btn-outline hover-scale">Cek Status Anda</a>
          </div>
        </div>
      </header>

      {/* FAKTA & URGENSI */}
      <section id="fakta" className="section reveal">
        <div className="text-center mb-8">
          <h2>Urgensi Penelitian</h2>
          <p className="text-muted">Mengapa intervensi promotif ini sangat krusial bagi masyarakat?</p>
        </div>
        <div className="grid-3">
          <div className="card text-center hover-lift">
            <h3 className="card-number">57,6%</h3>
            <p className="text-muted">Masyarakat RI memiliki masalah gigi & mulut (Riskesdas 2018)</p>
          </div>
          <div className="card text-center hover-lift">
            <h3 className="card-number">10,2%</h3>
            <p className="text-muted">Populasi yang rutin ke dokter gigi dalam 1 tahun terakhir</p>
          </div>
          <div className="card text-center highlight-card hover-lift">
            <h3 className="card-text-highlight">BIAYA</h3>
            <p className="text-muted">Menjadi <em>Perceived Barrier</em> (Hambatan Utama) berdasarkan studi empiris.</p>
          </div>
        </div>
      </section>

      {/* KERANGKA TEORI */}
      <section id="teori" className="section reveal">
        <div className="text-center mb-8">
          <h2>Kerangka Teori & Intervensi</h2>
          <p className="text-muted">Menggabungkan dua grand theory untuk modifikasi perilaku kesehatan gigi masyarakat.</p>
        </div>

        <div className="grid-2 teori-grid">

          {/* Card 1: Health Belief Model */}
          <div className="card hover-lift teori-card">
            <div className="card-icon">🧠</div>
            <h3 className="mb-3">Health Belief Model (HBM)</h3>

            {/* GAMBAR DIAGRAM HBM */}
            <div className="diagram-container mb-4">
              <img
                src={imgHbm}
                alt="Diagram Health Belief Model"
              />
            </div>

            <p className="text-muted mb-3">
              Aplikasi DENTA-CARE secara spesifik menargetkan komponen <strong>Individual Beliefs</strong> dan <strong>Action</strong> dalam model HBM ini:
            </p>
            <ul className="text-muted teori-list">
              <li className="mb-2"><strong>Perceived Benefits vs Barriers:</strong> Mengubah kalkulasi mental masyarakat. Hambatan (<i>barriers</i>) berupa "takut biaya mahal" ditekan habis dengan transparansi harga, sehingga manfaat (<i>benefits</i>) perawatan preventif terlihat lebih menguntungkan.</li>
              <li className="mb-2"><strong>Perceived Threat:</strong> Menumbuhkan kesadaran akan keparahan (<i>severity</i>) klinis dan finansial jika gigi berlubang dibiarkan.</li>
              <li><strong>Cues to Action:</strong> Kuis dan Kalkulator Biaya berfungsi sebagai stimulus langsung yang memicu tindakan (<i>Individual Behavior</i>) untuk pergi ke dokter gigi.</li>
            </ul>
          </div>

          {/* Card 2: Andersen Healthcare Utilization */}
          <div className="card hover-lift teori-card">
            <div className="card-icon">🏥</div>
            <h3 className="mb-3">Andersen Healthcare Utilization</h3>

            {/* GAMBAR DIAGRAM ANDERSEN */}
            <div className="diagram-container mb-4">
              <img
                src={imgAndersen}
                alt="Diagram Andersen Behavioral Model"
              />
            </div>

            <p className="text-muted mb-3">
              Fokus intervensi DENTA-CARE berada pada area <strong>Population Characteristics</strong> untuk mendorong perubahan pada <strong>Health Behavior</strong>:
            </p>
            <ul className="text-muted teori-list">
              <li className="mb-2"><strong>Enabling Resources:</strong> DENTA-CARE memposisikan JKN/BPJS dan info tarif Perda sebagai sumber daya pemungkin (<i>enabling</i>) yang mengeliminasi kendala finansial masyarakat.</li>
              <li className="mb-2"><strong>Perceived Need:</strong> Melalui fitur kuis <i>Self-Assessment</i>, aplikasi membantu pasien mengevaluasi dan menyadari kebutuhan medis mereka (<i>Need</i>) secara objektif.</li>
              <li><strong>Use of Health Services:</strong> Tujuan akhir intervensi ini adalah meningkatkan perilaku kesehatan (<i>Health Behavior</i>) berupa pemanfaatan fasilitas pelayanan gigi secara nyata.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* KALKULATOR & KUIS */}
      <section id="kalkulator" className="section reveal" style={{ background: '#f8fafc' }}>
        <div className="text-center mb-8">
          <h2>Modul Intervensi Digital</h2>
          <p className="text-muted">Implementasi langsung dari instrumen penelitian untuk mengedukasi masyarakat.</p>
        </div>

        <div className="grid-2">
          {/* Kolom Kiri: Kalkulator & FKTP */}
          <div>
            <div className="calculator-box hover-lift">
              <h3 className="mb-4" style={{ color: '#085041' }}>📊 Kalkulator Persepsi Biaya</h3>
              <label className="input-label">Kondisi Gigi Anda Saat Ini:</label>
              <select className="calc-select interactive-input" value={gigiKondisi} onChange={(e) => setGigiKondisi(e.target.value)}>
                <optgroup label="Preventif & Keluhan Ringan">
                  <option value="preventif">Sehat (Hanya Ingin Cek / Sikat Karang Gigi)</option>
                  <option value="sensitif">Gigi Sering Ngilu (Gigi Sensitif)</option>
                  <option value="gusi_bengkak">Gusi Sering Berdarah / Bengkak</option>
                </optgroup>
                <optgroup label="Keluhan Gigi Berlubang & Sisa Akar">
                  <option value="lubang_kecil">Terdapat Lubang Kecil (Belum Terasa Sakit)</option>
                  <option value="lubang_besar">Berlubang Parah (Sakit Berdenyut hingga Bengkak)</option>
                  <option value="cabut_gigi_biasa">Gigi Sisa Akar / Goyang (Minta Dicabut)</option>
                </optgroup>
                <optgroup label="Kasus Kompleks & Estetika">
                  <option value="gigi_bungsu">Gigi Bungsu Tumbuh Miring / Sakit</option>
                  <option value="gigi_palsu">Gigi Ompong (Ingin Buat Gigi Palsu)</option>
                  <option value="kawat_gigi">Gigi Berantakan (Ingin Pasang Kawat Gigi)</option>
                </optgroup>
              </select>

              <div className="calc-result pop-in" key={gigiKondisi}>
                <h4 style={{ color: '#085041', marginBottom: '5px' }}>{calcData[gigiKondisi].title}</h4>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>Estimasi: <span style={{ color: '#1D9E75' }}>{calcData[gigiKondisi].cost}</span></p>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>{calcData[gigiKondisi].desc}</p>
                <div className="bpjs-info">
                  <strong style={{ color: '#1D9E75' }}>Info BPJS:</strong> {calcData[gigiKondisi].bpjs}
                </div>
              </div>
            </div>

            {/* Kotak Edukasi FKTP */}
            <div className="fktp-info-box hover-lift" style={{ marginTop: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0' }}>💡 Apa itu FKTP?</h4>
              <p><strong>FKTP</strong> adalah singkatan dari <strong>Fasilitas Kesehatan Tingkat Pertama</strong>. Ini merupakan gerbang utama Anda untuk berobat menggunakan BPJS (Bisa gratis!).</p>
              <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                <li><strong>Puskesmas:</strong> Pilihan utama di tiap kecamatan.</li>
                <li><strong>Klinik Pratama:</strong> Klinik swasta yang bekerjasama dengan BPJS.</li>
                <li><strong>Dokter Gigi Keluarga:</strong> Praktik mandiri yang ditunjuk BPJS.</li>
              </ul>
              <p style={{ marginTop: '10px', fontSize: '0.8rem', fontStyle: 'italic' }}>*Pastikan Anda datang ke FKTP yang tertera di kartu/aplikasi Mobile JKN Anda.</p>
            </div>
          </div>

          {/* Kolom Kanan: Kuis PIMNAS */}
          <div id="kuis" className="calculator-box quiz-box hover-lift">
            <h3 style={{ marginBottom: '20px', color: 'white' }}>📝 Self-Assessment Kepedulian</h3>
            {!quizStarted && !quizResult && (
              <div className="text-center pop-in">
                <p style={{ marginBottom: '25px', color: '#E1F5EE', fontSize: '1.05rem' }}>Ukur tingkat hambatan mental Anda terhadap perawatan gigi berdasarkan Instrumen HBM DENTA-CARE.</p>
                <button className="btn-primary btn-outline btn-full hover-scale" onClick={() => setQuizStarted(true)}>Mulai Tes Sekarang</button>
              </div>
            )}
            {quizStarted && !quizResult && (
              <div className="fade-in">
                <p style={{ fontSize: '0.9rem', color: '#C8E6D9', marginBottom: '10px' }}>Pertanyaan {currentQuestion + 1} dari {questions.length}</p>
                <h4 style={{ marginBottom: '20px', fontSize: '1.1rem', lineHeight: '1.5' }}>{questions[currentQuestion]}</h4>
                <div className="quiz-options">
                  {[
                    { label: 'Sangat Tidak Setuju', value: 1 },
                    { label: 'Tidak Setuju', value: 2 },
                    { label: 'Netral', value: 3 },
                    { label: 'Setuju', value: 4 },
                    { label: 'Sangat Setuju', value: 5 }
                  ].map((option) => (
                    <button key={option.value} onClick={() => handleAnswer(option.value)} className="quiz-btn hover-lift">
                      {option.value} - {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {quizResult && (
              <div className="text-center pop-in">
                <h3 style={{ marginBottom: '15px' }}>Hasil Analisis Anda</h3>
                <p className="quiz-result-text">{quizResult}</p>
                <button className="btn-primary btn-outline btn-full hover-scale" onClick={resetQuiz}>Ulangi Tes</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* KLINIK MAPS */}
      <section id="maps" className="section reveal" style={{ background: 'white' }}>
        <div className="text-center mb-8">
          <h2>Lokasi Klinik & RS Gigi Malang</h2>
          <p className="text-muted">Fasilitas kesehatan di daerah Lowokwaru, Klojen, Blimbing, & Sigura-Gura.</p>
        </div>
        <div className="clinic-grid">
          {clinics.map((c, i) => (
            <div key={i} className="clinic-card hover-lift" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <span className="tag-area">{c.area}</span>
              <h4 style={{ marginBottom: '5px' }}>{c.name}</h4>
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1D9E75', marginBottom: '2px' }}>{c.addr}</p>
              <p style={{ fontSize: '0.8rem', color: '#085041', fontWeight: '600', marginBottom: '8px' }}>📞 {c.phone}</p>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px' }}>{c.desc}</p>

              {/* Tambahkan marginTop: 'auto' di sini agar tombol selalu terdorong sejajar ke bawah */}
              <a href={c.map} target="_blank" rel="noreferrer" className="btn-primary hover-scale" style={{ padding: '8px 15px', fontSize: '0.8rem', width: 'max-content', display: 'inline-block', marginTop: 'auto' }}>
                Buka Maps
              </a>
            </div>
          ))}
        </div>
      </section >

      {/* PAKAR (INSIGHT AHLI) */}
      < section id="pakar" className="section reveal" style={{ background: '#f8fafc' }
      }>
        <div className="text-center mb-8">
          <h2>Suara Para Ahli Global</h2>
          <p className="text-muted">Validasi pentingnya intervensi promotif dan integrasi jaminan kesehatan.</p>
        </div>
        <div className="grid-3">
          {expertData.map((expert, index) => (
            <div key={index} className="expert-card hover-lift">
              <div className="expert-img-wrapper">
                <img src={expert.photo} alt={`Foto ${expert.name}`} className="expert-img" />
              </div>
              <div className="expert-info">
                <h4>{expert.name}</h4>
                <span className="expert-role">{expert.role}</span>
                <p className="expert-quote">"{expert.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* PROFIL RISET */}
      < section id="riset" className="section reveal" style={{ background: 'white' }}>
        <div className="text-center mb-8">
          <h2>Metodologi & Luaran Riset</h2>
          <p className="text-muted">Spesifikasi akademis dari Program Kreativitas Mahasiswa (PKM-RSH)</p>
        </div>
        <div className="grid-3">
          <div className="card hover-lift">
            <h4 style={{ color: '#1D9E75', borderBottom: '2px solid #E1F5EE', paddingBottom: '10px', marginBottom: '15px' }}>📍 Metodologi</h4>
            <ul style={{ paddingLeft: '20px', color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
              <li style={{ marginBottom: '8px' }}><strong>Desain:</strong> Mixed-Method</li>
              <li style={{ marginBottom: '8px' }}><strong>Lokasi:</strong> 5 Kecamatan, Kota Malang</li>
              <li style={{ marginBottom: '8px' }}><strong>Sampel:</strong> Usia ≥17 Tahun</li>
              <li><strong>Analisis:</strong> Deskriptif, Uji Korelasi Spearman Rank, Kualitatif
              Regresi dan Analisis Jalur (Path Analysis)</li>
            </ul>
          </div>
          <div className="card hover-lift">
            <h4 style={{ color: '#1D9E75', borderBottom: '2px solid #E1F5EE', paddingBottom: '10px', marginBottom: '15px' }}>🎯 Target Luaran</h4>
            <ul style={{ paddingLeft: '20px', color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>Artikel Ilmiah Terakreditasi SINTA</li>
              <li style={{ marginBottom: '8px' }}>Hak Kekayaan Intelektual (HKI) Modul</li>
              <li style={{ marginBottom: '8px' }}>Platform Intervensi Digital (Website Ini)</li>
              <li>Laporan Kemajuan & Laporan Akhir</li>
            </ul>
          </div>
          <div className="card hover-lift" style={{ background: '#E1F5EE', borderColor: '#C8E6D9' }}>
            <h4 style={{ color: '#085041', borderBottom: '2px solid #9FE1CB', paddingBottom: '10px', marginBottom: '15px' }}>👥 Tim Peneliti</h4>
            <p style={{ color: '#085041', fontSize: '0.95rem', margin: '0 0 8px 0' }}><strong>Ketua:</strong> Aufa Dzaki Setyawan</p>
            <p style={{ color: '#085041', fontSize: '0.95rem', margin: '0 0 8px 0' }}><strong>Instansi:</strong> FKG Universitas Brawijaya</p>
            <p style={{ color: '#085041', fontSize: '0.95rem', margin: '0 0 8px 0' }}><strong>Pendamping:</strong> drg. Trining Widodorini, M.Kes</p>
            <p style={{ color: '#085041', fontSize: '0.95rem', margin: '0' }}><strong>Pendanaan:</strong> Belmawa Kemdikbudristek 2026</p>
          </div>
        </div>
      </section >

      {/* FOOTER */}
      < footer className="footer reveal" >
        <h2>DENTA - CARE</h2>
        <p style={{ color: '#E1F5EE', marginTop: '10px', fontSize: '0.9rem' }}>
          Platform Luaran Riset & Intervensi Promotif Kesehatan Gigi Masyarakat<br />
          Riset Sosial Humaniora Denta-Care Universitas Brawijaya © 2026<br />
          Malang, Jawa Timur
        </p>
      </footer >
    </>
  );
}