import { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const audioRef = useRef(null);
  const [isCreepy, setIsCreepy] = useState(false);
  const [frissons, setFrissons] = useState(0);
  const [message, setMessage] = useState("Bienvenue sur un site parfaitement normal ");

  // 3 clics rapides dans le coin haut droit
  const [secretClicks, setSecretClicks] = useState([]);

  // Petite “image creepy” embarquée (SVG en data URI, donc pas besoin d’Internet)
  const creepyImageSrc = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="700" height="500" viewBox="0 0 700 500">
        <defs>
          <radialGradient id="g" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="35%" stop-color="#b6a7ff" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 0.8 0 0 0
              0 0 1 0 0
              0 0 0 0.25 0"/>
          </filter>
        </defs>
        <rect width="700" height="500" fill="#070712"/>
        <circle cx="350" cy="220" r="180" fill="url(#g)"/>
        <g opacity="0.9">
          <ellipse cx="290" cy="220" rx="45" ry="28" fill="#0b0b10"/>
          <ellipse cx="410" cy="220" rx="45" ry="28" fill="#0b0b10"/>
          <circle cx="275" cy="222" r="7" fill="#e6e6ff"/>
          <circle cx="395" cy="222" r="7" fill="#e6e6ff"/>
        </g>
        <path d="M280 310 C330 350, 370 350, 420 310" stroke="#e6e6ff" stroke-opacity="0.5" stroke-width="8" fill="none" stroke-linecap="round"/>
        <rect x="0" y="0" width="700" height="500" filter="url(#n)" opacity="0.55"/>
        <text x="350" y="460" text-anchor="middle" font-family="system-ui, Arial" font-size="24" fill="#e6e6ff" fill-opacity="0.75">
          Tu n'aurais pas dû...
        </text>
      </svg>
    `.trim();

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  /* =========================
     PLEIN ÉCRAN (Fullscreen API)
     ========================= */
  function enterFullscreen() {
    if (!document.fullscreenElement) {
      // Le plein écran doit être déclenché par un geste utilisateur (clic)
      document.documentElement.requestFullscreen?.();
    }
  }

  function exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }

  /* =========================
     MODE CREEPY
     ========================= */
  const creepyMessages = useMemo(
    () => [
      "Je t’ai vu cliquer…",
      "Tu n’aurais pas dû trouver ça.",
      "Reste calme.",
      "Le site te regarde. Poliment.",
      "C’est sûrement un bug… sûrement.",
    ],
    []
  );

  function activerCreepyMode() {
    setIsCreepy(true);
    setFrissons((f) => f + 1);
    setMessage(creepyMessages[Math.floor(Math.random() * creepyMessages.length)]);
    audioRef.current?.play();
    setTimeout(() => {
    enterFullscreen();
  }, 0);
  }

  function quitterCreepyMode() {
    setIsCreepy(false);
    setMessage("Ouf… retour à la normale ");
    if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
    exitFullscreen();
  }

  function handleSecretClick() {
    const now = Date.now();
    const updated = [...secretClicks, now].filter((t) => now - t < 1500);
    setSecretClicks(updated);

    if (updated.length >= 3) {
      setSecretClicks([]);
      activerCreepyMode();
    }
  }

  useEffect(() => {
    document.title = isCreepy ? "Tu es observé…" : "Site normal";
    if (!audioRef.current) {
    const audio = new Audio("/creepy.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;
    }
  }, [isCreepy]);

  /* =========================
     STYLES INLINE (base)
     ========================= */
  const pageStyle = {
    minHeight: "100vh",
    padding: "32px",
    background: isCreepy ? "#0b0b10" : "#f5f5fa",
    color: isCreepy ? "#eaeaff" : "#111",
    fontFamily: "system-ui, Arial, sans-serif",
    transition: "none",
    position: "relative",
    overflow: "hidden",
  };

  const cardStyle = {
    maxWidth: 760,
    margin: "0 auto",
    padding: 24,
    borderRadius: 16,
    background: isCreepy ? "rgba(255,255,255,0.06)" : "#fff",
    border: isCreepy ? "1px solid rgba(255,255,255,0.14)" : "1px solid #eee",
    boxShadow: isCreepy ? "0 18px 40px rgba(0,0,0,0.55)" : "0 18px 40px rgba(0,0,0,0.10)",
    position: "relative",
    zIndex: 5,
    backdropFilter: "blur(6px)",
  };

  const buttonStyle = (variant = "normal") => {
    const creepy = isCreepy;
    const base = {
      padding: "10px 14px",
      borderRadius: 12,
      border: creepy ? "1px solid rgba(255,255,255,0.18)" : "1px solid #ddd",
      cursor: "pointer",
      transition: "transform 120ms ease, background 200ms ease, border 200ms ease",
      userSelect: "none",
    };

    if (variant === "danger") {
      return {
        ...base,
        background: creepy ? "rgba(255, 80, 160, 0.18)" : "#ffe4ef",
        color: creepy ? "#fff" : "#111",
      };
    }

    return {
      ...base,
      background: creepy ? "rgba(255,255,255,0.08)" : "#f3f4f6",
      color: creepy ? "#fff" : "#111",
    };
  };

  return (
    <div style={pageStyle} className={isCreepy ? "creepy-root" : ""}>
      {/* CSS “glitch” (dans le composant pour copier-coller facilement) */}
      <style>{`
        .glitch-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        /* Image “creepy” au centre */
        .creepy-image {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(520px, 86vw);
          transform: translate(-50%, -50%);
          opacity: 0.26;
          filter: contrast(1.1) saturate(1.05);
          mix-blend-mode: screen;
          animation: floaty 3.6s ease-in-out infinite;
        }

        /* “Scanlines” + bruit */
        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.05) 1px,
            rgba(0,0,0,0) 2px,
            rgba(0,0,0,0) 5px
          );
          opacity: 0.18;
          mix-blend-mode: overlay;
          animation: scan 1.6s linear infinite;
        }

        .noise {
          position: absolute;
          inset: -30%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");
          opacity: 0.14;
          mix-blend-mode: overlay;
          animation: noiseMove 600ms steps(2) infinite;
        }

        /* Glitch: décalages rapides par couches */
        .glitch-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(155,89,255,0.22), transparent 45%),
                      radial-gradient(circle at 70% 60%, rgba(0,255,170,0.10), transparent 50%);
          filter: blur(12px);
          transform: translateZ(0);
          opacity: 0.9;
          mix-blend-mode: screen;
        }

        .glitch-layer.one {
  animation: glitch1 420ms steps(2) infinite;
}

      .glitch-layer.two {
  animation: glitch2 260ms steps(2) infinite;
}

.glitch-layer.three {
  animation: glitch3 520ms steps(3) infinite;
}

        .creepy-root .card-glitch {
          animation: cardShake 2.6s infinite;
        }

        @keyframes glitch1 {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-8px, 2px); }
          11% { transform: translate(10px, -1px); }
          12% { transform: translate(-6px, 1px); }
          40% { transform: translate(0,0); }
          78% { transform: translate(6px, -2px); }
          79% { transform: translate(-10px, 2px); }
          80% { transform: translate(4px, 0px); }
        }

        @keyframes glitch2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          20% { transform: translate(12px, -3px) scale(1.02); }
          21% { transform: translate(-10px, 2px) scale(1.01); }
          55% { transform: translate(0,0) scale(1); }
          70% { transform: translate(-8px, 1px) scale(1.02); }
          71% { transform: translate(10px, -2px) scale(1.01); }
        }

        @keyframes glitch3 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          32% { transform: translate(-6px, 0) rotate(0.3deg); }
          33% { transform: translate(8px, -1px) rotate(-0.2deg); }
          34% { transform: translate(-4px, 1px) rotate(0deg); }
          82% { transform: translate(6px, -2px) rotate(0.25deg); }
          83% { transform: translate(-9px, 2px) rotate(-0.2deg); }
        }

        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }

        @keyframes noiseMove {
          0% { transform: translate(0,0); }
          25% { transform: translate(-8px, 6px); }
          50% { transform: translate(10px, -6px); }
          75% { transform: translate(-12px, -8px); }
          100% { transform: translate(0,0); }
        }

        @keyframes floaty {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }

        @keyframes cardShake {
          0%, 92%, 100% { transform: translate(0,0); }
          93% { transform: translate(1px, 0); }
          94% { transform: translate(-1px, 1px); }
          95% { transform: translate(2px, -1px); }
          96% { transform: translate(-2px, 1px); }
          97% { transform: translate(1px, -2px); }
          98% { transform: translate(0,0); }
        }
      `}</style>

      {/* Zone secrète (invisible) */}
      <div
        onClick={handleSecretClick}
        title="(rien à voir ici)"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          cursor: "pointer",
          opacity: 0,
          zIndex: 10,
        }}
      />

      {/* Overlays glitch + image (uniquement en creepy mode) */}
      {isCreepy && (
        <div className="glitch-wrap" aria-hidden="true">
          <div className="glitch-layer one" />
          <div className="glitch-layer two" />
          <div className="glitch-layer three" />
          <div className="scanlines" />
          <div className="noise" />
          <img className="creepy-image" src={creepyImageSrc} alt="" />
        </div>
      )}

      <div style={cardStyle} className={isCreepy ? "card-glitch" : ""}>
        <h1 style={{ marginTop: 0 }}>{isCreepy ? "Pars d'ici MAINTENANT !" : "Bienvenue 👋"}</h1>

        <p style={{ fontSize: 18, lineHeight: 1.5, marginTop: 8 }}>{message}</p>

        <p style={{ marginTop: 12 }}>
          Frissons : <strong>{frissons}</strong>
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
          <button style={buttonStyle()} onClick={() => setFrissons((f) => f + 1)}>
            Ajouter un frisson (+1)
          </button>

          {!isCreepy ? (
            <button style={buttonStyle("danger")} onClick={activerCreepyMode}>
              Activer Creepy Mode (pas recommandé)
            </button>
          ) : (
            <button style={buttonStyle()} onClick={quitterCreepyMode}>
              Revenir à la normale
            </button>
          )}
        </div>

        {isCreepy && (
          <p style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
            (Pour sortir du plein écran : touche <strong>Échap</strong>)
          </p>
        )}
      </div>
    </div>
  );
}