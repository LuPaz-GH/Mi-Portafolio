import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Fondo de circuito dibujado en canvas: nítido en cualquier resolución.
// Capa estática (pistas + pads) + capa animada (pulsos de luz que recorren las pistas y destellos).

const CELL = 14;
const DIRS = [
  [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1],
];
const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));

// Un "bus" de pistas paralelas que entra desde un borde y gira a 45° hacia el centro
function makeBus(w, h) {
  const side = randInt(0, 3);
  let x, y, dir;
  if (side === 0) { x = -20; y = rand(0, h); dir = 0; }
  else if (side === 1) { x = w + 20; y = rand(0, h); dir = 4; }
  else if (side === 2) { x = rand(0, w); y = -20; dir = 2; }
  else { x = rand(0, w); y = h + 20; dir = 6; }

  // camino base: lista de [dirección, pasos]
  const mainDir = dir;
  const steps = [];
  let total = 0;
  let bx = x, by = y;
  const maxLen = Math.max(w, h) * rand(0.18, 0.42);
  while (total < maxLen) {
    const len = randInt(3, 12);
    const [sx, sy] = DIRS[dir];
    const k = sx && sy ? 0.7071 : 1;
    const nx = bx + sx * len * CELL * k, ny = by + sy * len * CELL * k;
    // deja libre un óvalo en el centro, como en el fondo original
    if (((nx - w / 2) / (w * 0.3)) ** 2 + ((ny - h / 2) / (h * 0.32)) ** 2 < 1) break;
    bx = nx; by = ny;
    steps.push([dir, len]);
    total += len * CELL;
    // alterna entre la dirección principal y giros de 45°
    dir = dir === mainDir ? (mainDir + (Math.random() < 0.5 ? 1 : 7)) % 8 : mainDir;
  }

  if (!steps.length) return [];
  const count = randInt(2, 6);
  const [dx, dy] = DIRS[mainDir];
  const px = -dy, py = dx; // perpendicular a la dirección principal
  const traces = [];
  for (let i = 0; i < count; i++) {
    const off = (i - (count - 1) / 2) * 11;
    let cx = x + px * off, cy = y + py * off;
    const pts = [[cx, cy]];
    // cada copia corta en un punto distinto para que los pads queden escalonados
    const cut = steps.length - randInt(0, Math.min(2, steps.length - 1));
    for (let s = 0; s < cut; s++) {
      const [d, len] = steps[s];
      const extra = s === cut - 1 ? randInt(-2, 3) : 0;
      const n = Math.max(1, len + extra);
      const [sx, sy] = DIRS[d];
      const k = sx && sy ? 0.7071 : 1;
      cx += sx * n * CELL * k;
      cy += sy * n * CELL * k;
      pts.push([cx, cy]);
    }
    traces.push(withLengths(pts));
  }
  return traces;
}

function withLengths(pts) {
  const lens = [0];
  for (let i = 1; i < pts.length; i++) {
    lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  return { pts, lens, length: lens[lens.length - 1] };
}

function pointAt(trace, d) {
  const { pts, lens } = trace;
  let i = 1;
  while (i < lens.length - 1 && lens[i] < d) i++;
  const t = (d - lens[i - 1]) / (lens[i] - lens[i - 1] || 1);
  return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
}

export default function Background() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const layer = document.createElement('canvas');
    const lctx = layer.getContext('2d');
    let w = 0, h = 0, dpr = 1, traces = [], pulses = [], bokeh = [], frame, last = performance.now();

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      for (const c of [canvas, layer]) { c.width = w * dpr; c.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const buses = Math.round((w + h) / 45);
      traces = Array.from({ length: buses }, () => makeBus(w, h)).flat();

      // capa estática: gradiente + pistas con brillo + pads
      const g = lctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      g.addColorStop(0, '#7a22d6');
      g.addColorStop(0.3, '#3d0b78');
      g.addColorStop(0.62, '#14041f');
      g.addColorStop(1, '#040108');
      lctx.fillStyle = g;
      lctx.fillRect(0, 0, w, h);

      lctx.lineCap = 'round';
      lctx.lineJoin = 'round';
      lctx.shadowColor = '#a855f7';
      lctx.shadowBlur = 10;
      lctx.strokeStyle = 'rgba(176, 100, 255, 0.85)';
      lctx.lineWidth = 1.5;
      for (const t of traces) {
        lctx.beginPath();
        t.pts.forEach(([x, y], i) => (i ? lctx.lineTo(x, y) : lctx.moveTo(x, y)));
        lctx.stroke();
      }
      for (const t of traces) {
        const [x, y] = t.pts[t.pts.length - 1];
        lctx.beginPath();
        lctx.arc(x, y, 3.6, 0, Math.PI * 2);
        lctx.fillStyle = '#12051f';
        lctx.fill();
        lctx.lineWidth = 1.8;
        lctx.stroke();
        t.pad = [x, y];
      }
      lctx.shadowBlur = 0;

      pulses = [];
      bokeh = Array.from({ length: Math.round(w / 110) }, () => ({
        x: rand(0, w), y: rand(0, h), r: rand(18, 60), vx: rand(-6, 6), vy: rand(-6, 6), a: rand(0.12, 0.3),
      }));
    };

    const spawnPulse = () => {
      const t = traces[randInt(0, traces.length - 1)];
      if (t.length < 80) return;
      pulses.push({ t, d: 0, speed: rand(140, 260), green: Math.random() < 0.35 });
    };

    const render = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // la ventana puede medir 0 por un instante (p. ej. al acomodar DevTools): no hay nada que dibujar
      if (!w || !h) {
        if (!reduce) frame = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(layer, 0, 0, w, h);

      // círculos de luz desenfocados que flotan
      for (const b of bokeh) {
        b.x += b.vx * dt; b.y += b.vy * dt;
        if (b.x < -80) b.x = w + 80; if (b.x > w + 80) b.x = -80;
        if (b.y < -80) b.y = h + 80; if (b.y > h + 80) b.y = -80;
        const rg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        rg.addColorStop(0, `rgba(200, 120, 255, ${b.a})`);
        rg.addColorStop(1, 'rgba(200, 120, 255, 0)');
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      }

      // pulsos que recorren las pistas y encienden el pad al llegar
      const target = Math.round(traces.length / 5);
      while (pulses.length < target) spawnPulse();
      ctx.lineCap = 'round';
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.d += p.speed * dt;
        const color = p.green ? '122, 222, 48' : '240, 220, 255';
        if (p.d >= p.t.length) {
          p.flash = (p.flash ?? 1) - dt * 2.5;
          const [x, y] = p.t.pad;
          ctx.fillStyle = `rgba(${color}, ${Math.max(p.flash, 0)})`;
          ctx.shadowColor = `rgb(${color})`;
          ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
          if (p.flash <= 0) pulses.splice(i, 1);
          continue;
        }
        const tail = 60;
        for (let k = 0; k < 10; k++) {
          const dd = p.d - (tail / 10) * k;
          if (dd < 0) break;
          const [x, y] = pointAt(p.t, dd);
          ctx.fillStyle = `rgba(${color}, ${1 - k / 10})`;
          ctx.beginPath(); ctx.arc(x, y, 2.4 - k * 0.15, 0, Math.PI * 2); ctx.fill();
        }
        const [hx, hy] = pointAt(p.t, p.d);
        ctx.shadowColor = `rgb(${color})`;
        ctx.shadowBlur = 14;
        ctx.fillStyle = `rgb(${color})`;
        ctx.beginPath(); ctx.arc(hx, hy, 2.8, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduce) frame = requestAnimationFrame(render);
    };

    build();
    frame = requestAnimationFrame(render);

    // en celular la barra de direcciones cambia el alto: solo se regenera si el cambio es grande
    let lastW = w, lastH = h;
    const onResize = () => {
      if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 160) return;
      lastW = window.innerWidth; lastH = window.innerHeight;
      build();
      if (reduce) render(performance.now());
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [reduce]);

  return (
    <div className="bg" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  );
}
