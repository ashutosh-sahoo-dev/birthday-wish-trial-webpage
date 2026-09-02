const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const letters = {
  appreciate: "I appreciate the little things about you more than I probably say. The way you can make a normal conversation memorable, the way you get excited about things you love, and the fact that somehow you always manage to be completely yourself.",
  memory: "Some memories don't need a perfect photograph. They stay because of the feeling attached to them — the stupid jokes, random conversations, and those ordinary moments that somehow became important.",
  wish: "I hope this year gives you more reasons to smile, more places to explore, more sunsets, more time near the sea, and the courage to chase the things you really want.",
  quiet: "I don't say this enough, but I'm genuinely glad I know you. Out of all the random people life could have put in my path, I'm grateful that you became one of the people I get to call my friend."
};

const progress = $("#progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.min(100, (scrollY / max) * 100)}%`;
}, {passive:true});

$$("[data-scroll]").forEach(btn => btn.addEventListener("click", () => {
  const target = btn.dataset.scroll;
  if(target === "#top") window.scrollTo({top:0, behavior:"smooth"});
  else $(target)?.scrollIntoView({behavior:"smooth"});
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
}, {threshold:.15});
$$(".reveal").forEach(el => revealObserver.observe(el));

/* Photo lightbox */
const modal = $("#photoModal"), modalImg = $("#modalImage"), modalCaption = $("#modalCaption");
$$(".grid-photo").forEach(btn => btn.addEventListener("click", () => {
  modalImg.src = btn.dataset.photo;
  modalCaption.textContent = btn.dataset.caption || "";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}));
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); };
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

/* Letters */
$$(".letter-card").forEach(card => card.addEventListener("click", () => {
  const key = card.dataset.letter;
  $("#letterDisplay").innerHTML = `<p>${letters[key]}</p>`;
  $("#letterDisplay").scrollIntoView({behavior:"smooth", block:"center"});
}));

/* Flowers */
$$(".flower").forEach(flower => flower.addEventListener("click", () => {
  $("#flowerMessage").textContent = flower.dataset.message;
  $$(".flower").forEach(x => x.style.filter = "");
  flower.style.filter = "drop-shadow(0 0 22px rgba(245,223,155,.8))";
}));

/* Secret page — CHANGE THIS WORD */
const SECRET_WORD = "dahibara";
$("#unlockBtn").addEventListener("click", () => {
  const value = $("#secretInput").value.trim().toLowerCase();
  const result = $("#secretResult");
  if(value === SECRET_WORD) {
    result.innerHTML = "🔓 Secret unlocked.<br><br><em>There are some people you meet, and some people you are simply lucky to have.</em> ❤️";
  } else {
    result.textContent = "Nope. Nice try. 😌";
  }
});
$("#secretInput").addEventListener("keydown", e => {
  if(e.key === "Enter") $("#unlockBtn").click();
});

/* Cake */
let candlesOut = 0;
$$(".flame").forEach((flame, i) => {
  flame.addEventListener("click", () => {
    if(flame.classList.contains("out")) return;
    flame.classList.add("out");
    candlesOut++;
    if(candlesOut === 3) {
      $("#cakeMessage").textContent = "Happy Birthday, Maanisha! 🎂✨";
      makeConfetti();
    } else {
      $("#cakeMessage").textContent = `${3-candlesOut} candle${3-candlesOut===1?"":"s"} left...`;
    }
  });
});

function makeConfetti(){
  const box = $("#confetti");
  box.innerHTML = "";
  for(let i=0;i<110;i++){
    const bit = document.createElement("i");
    bit.className = "confetti-bit";
    bit.style.left = Math.random()*100 + "%";
    bit.style.animationDelay = Math.random()*0.8 + "s";
    bit.style.animationDuration = (1.8 + Math.random()*1.8) + "s";
    bit.style.background = ["#f5df9b","#e6a7a0","#83bac2","#f1eadf","#6e8c78"][i%5];
    box.appendChild(bit);
  }
}

/* Optional sound button. Put assets/ambient.mp3 in the repo to enable it. */
let audio = null, playing = false;
$("#soundToggle").addEventListener("click", () => {
  if(!audio){
    audio = new Audio("assets/ambient.mp3");
    audio.loop = true;
    audio.volume = .22;
  }
  if(playing){ audio.pause(); playing=false; }
  else { audio.play().then(()=>playing=true).catch(()=>{}); }
  $("#soundToggle").innerHTML = playing ? "♫ <span>on</span>" : "♫ <span>sound</span>";
});
