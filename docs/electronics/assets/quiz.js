/**
 * Quiz & Interactive Calculator Helper for Electronics Lessons
 * Hallmark Interactive Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Quizzes
  initQuizzes();

  // 2. Initialize Amplifier Gain Calculator (if present)
  initAmpCalc();

  // 3. Initialize STC Frequency Response Calculator (if present)
  initStcCalc();
});

function initQuizzes() {
  const quizCards = document.querySelectorAll('.quiz-card');
  quizCards.forEach((card) => {
    const options = card.querySelectorAll('.quiz-option');
    const feedback = card.querySelector('.quiz-feedback');
    const correctIndex = parseInt(card.dataset.correct, 10);
    const explanation = card.dataset.explanation || '';

    options.forEach((opt, idx) => {
      opt.addEventListener('click', () => {
        // Clear previous selection
        options.forEach(o => {
          o.classList.remove('is-correct', 'is-wrong');
        });

        if (idx === correctIndex) {
          opt.classList.add('is-correct');
          if (feedback) {
            feedback.className = 'quiz-feedback show-feedback feedback-correct';
            feedback.innerHTML = `<strong>✓ 正確！</strong> ${explanation}`;
          }
        } else {
          opt.classList.add('is-wrong');
          if (feedback) {
            feedback.className = 'quiz-feedback show-feedback feedback-wrong';
            feedback.innerHTML = `<strong>✗ 再想一下：</strong> ${explanation}`;
          }
        }
      });
    });
  });
}

function initAmpCalc() {
  const calc = document.getElementById('amp-calculator');
  if (!calc) return;

  const vsInput = document.getElementById('calc-vs');
  const rsInput = document.getElementById('calc-rs');
  const riInput = document.getElementById('calc-ri');
  const avoInput = document.getElementById('calc-avo');
  const roInput = document.getElementById('calc-ro');
  const rlInput = document.getElementById('calc-rl');

  function calculate() {
    const vs = parseFloat(vsInput.value) || 0; // mV
    const rs = parseFloat(rsInput.value) || 0; // kOhm
    const ri = parseFloat(riInput.value) || 1; // kOhm
    const avo = parseFloat(avoInput.value) || 0; // V/V
    const ro = parseFloat(roInput.value) || 0; // kOhm
    const rl = parseFloat(rlInput.value) || 1; // kOhm

    // 1. Input division: vi = vs * (Ri / (Rs + Ri))
    const inputRatio = ri / (rs + ri);
    const vi = vs * inputRatio; // mV

    // 2. Output division: vo = (Avo * vi) * (RL / (Ro + RL))
    const outputRatio = rl / (ro + rl);
    const vo = (avo * (vi / 1000)) * outputRatio; // V

    // 3. Loaded voltage gain Av = vo / (vi * 10^-3)
    const avLoaded = avo * outputRatio;

    // 4. Overall voltage gain Gv = vo / (vs * 10^-3)
    const gvLoaded = inputRatio * avLoaded;
    const gvDb = gvLoaded > 0 ? (20 * Math.log10(gvLoaded)).toFixed(2) : '-∞';

    document.getElementById('res-vi').textContent = vi.toFixed(2) + ' mV';
    document.getElementById('res-vo').textContent = (vo * 1000).toFixed(2) + ' mV';
    document.getElementById('res-av').textContent = avLoaded.toFixed(2) + ' V/V';
    document.getElementById('res-gv').textContent = `${gvLoaded.toFixed(2)} V/V (${gvDb} dB)`;
  }

  [vsInput, rsInput, riInput, avoInput, roInput, rlInput].forEach(inp => {
    if (inp) inp.addEventListener('input', calculate);
  });

  calculate();
}

function initStcCalc() {
  const calc = document.getElementById('stc-calculator');
  if (!calc) return;

  const rInput = document.getElementById('stc-r'); // kOhm
  const cInput = document.getElementById('stc-c'); // pF
  const typeSelect = document.getElementById('stc-type');

  function calculate() {
    const r = (parseFloat(rInput.value) || 1) * 1000; // Ohm
    const c = (parseFloat(cInput.value) || 1) * 1e-12; // Farad
    const type = typeSelect.value; // 'lp' or 'hp'

    const tau = r * c; // Seconds
    const f0 = 1 / (2 * Math.PI * tau); // Hz
    const w0 = 1 / tau; // rad/s

    document.getElementById('stc-tau').textContent = (tau * 1e6).toFixed(3) + ' μs';
    document.getElementById('stc-w0').textContent = (w0 / 1000).toFixed(2) + ' krad/s';
    document.getElementById('stc-f0').textContent = f0 > 1e6 
      ? (f0 / 1e6).toFixed(3) + ' MHz' 
      : (f0 / 1000).toFixed(2) + ' kHz';
  }

  [rInput, cInput, typeSelect].forEach(inp => {
    if (inp) inp.addEventListener('input', calculate);
  });

  calculate();
}
