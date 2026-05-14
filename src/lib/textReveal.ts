import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Tags whose content must never be touched
const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'VIDEO', 'AUDIO', 'IMG',
  'SVG', 'PATH', 'CIRCLE', 'RECT', 'LINE', 'POLYLINE',
  'POLYGON', 'ELLIPSE', 'G', 'DEFS', 'USE', 'SYMBOL', 'ANIMATE',
  'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'OPTGROUP',
  'IFRAME', 'CANVAS', 'BR', 'HR', 'WBR',
]);

function shouldSkipElement(el: Element): boolean {
  if (SKIP_TAGS.has(el.tagName)) return true;
  // Already wrapped by a component (About, etc.)
  if (el.classList.contains('reveal-word')) return true;
  // Opt-out class
  if (el.classList.contains('no-reveal')) return true;
  // Never touch the navbar
  if (el.tagName === 'NAV' || el.closest('nav')) return true;
  return false;
}

// Walk the tree and collect raw text nodes that haven't been wrapped yet
function collectTextNodes(root: Element, acc: Text[]): void {
  if (shouldSkipElement(root)) return;
  for (const node of Array.from(root.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      if ((node as Text).textContent?.trim()) acc.push(node as Text);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      collectTextNodes(node as Element, acc);
    }
  }
}

// Replace one text node with per-word <span class="reveal-word"> elements
function wrapTextNode(textNode: Text): HTMLElement[] {
  const parent = textNode.parentElement;
  // Guard: don't double-wrap inside an existing reveal span
  if (!parent || parent.classList.contains('reveal-word')) return [];

  const text = textNode.textContent ?? '';
  if (!text.trim()) return [];

  // Split preserving whitespace runs so layout is unchanged
  const parts = text.split(/(\s+)/);
  const fragment = document.createDocumentFragment();
  const newSpans: HTMLElement[] = [];

  for (const part of parts) {
    if (/^\s*$/.test(part)) {
      // Pure whitespace — keep as a text node so spacing is preserved
      if (part) fragment.appendChild(document.createTextNode(part));
    } else {
      const span = document.createElement('span');
      span.className = 'reveal-word';
      span.textContent = part;
      fragment.appendChild(span);
      newSpans.push(span);
    }
  }

  if (newSpans.length) parent.replaceChild(fragment, textNode);
  return newSpans;
}

export function applyGlobalTextReveal(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Step 1: collect every unwrapped text node in the page ──────────────
  const textNodes: Text[] = [];
  collectTextNodes(document.body, textNodes);

  // ── Step 2: wrap into word spans ───────────────────────────────────────
  const allWords: HTMLElement[] = [];
  for (const tn of textNodes) allWords.push(...wrapTextNode(tn));

  if (!allWords.length) return;

  // ── Step 3: set initial color ─────────────────────────────────────────
  // Words already visible on screen start white (no flash).
  // Words below the fold start dark gray and will animate to white.
  if (prefersReducedMotion) return; // keep inherited colors, no animation

  const vh = window.innerHeight;
  allWords.forEach(w => {
    const top = w.getBoundingClientRect().top;
    w.style.color = top < vh * 0.88 ? '#ffffff' : '#444';
  });

  // ── Step 4: one ScrollTrigger per word ────────────────────────────────
  allWords.forEach(word => {
    gsap.to(word, {
      color: '#ffffff',
      ease: 'none',
      scrollTrigger: {
        trigger: word,
        start: 'top 88%',
        end: 'top 58%',
        scrub: true,
      },
    });
  });
}
