import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { text: "The present is theirs; the future, for which I have really worked, is mine.", author: "Nikola Tesla" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "What worries you, masters you.", author: "John Locke" },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Find what you love and let it kill you.", author: "Charles Bukowski" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

@customElement('gdm-motivational-quote')
export class GdmMotivationalQuote extends LitElement {
  @state()
  private currentQuote: { text: string; author: string } | null = null;
  private intervalId: number | undefined;

  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 4vh; /* Positioned at the top */
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      max-width: 800px; /* Slightly wider for longer quotes */
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      z-index: 20; /* Ensure it's above other elements */
      /* Removed background, border-radius, box-shadow, padding */
    }
    .quote-text {
      font-size: 1.3em; /* Slightly larger for better impact */
      font-weight: bold;
      margin-bottom: 0.6em;
      font-style: italic;
      opacity: 0;
      transition: opacity 0.7s ease-in-out;
      min-height: 3em; /* Reserve space to reduce layout shift */

      background-image: linear-gradient(60deg, #ff6ec4, #7873f5); /* Pink to Purple */
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0 0 6px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4);
    }
    .quote-text.visible {
      opacity: 1;
    }
    .quote-author {
      font-size: 1.1em; /* Slightly larger */
      opacity: 0;
      transition: opacity 0.7s ease-in-out 0.3s; /* Staggered transition for author */
      min-height: 1.2em; /* Reserve space */

      background-image: linear-gradient(60deg, #4facfe, #00f2fe); /* Blue to Cyan */
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 8px rgba(255, 255, 255, 0.3);
    }
    .quote-author.visible {
      opacity: 1;
    }

    @media (max-width: 768px) {
      :host {
        width: 90%;
        top: 3vh; /* Adjust if needed for smaller screens */
      }
      .quote-text {
        font-size: 1.1em;
        min-height: 2.5em;
      }
      .quote-author {
        font-size: 0.9em;
        min-height: 1em;
      }
    }
    @media (max-height: 600px) { /* Adjust for very short screens */
        :host {
            top: 2vh;
        }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Ensure quotes array is not empty
    if (quotes.length > 0) {
        this.pickRandomQuote(); // Show a quote immediately
        this.intervalId = window.setInterval(() => this.pickRandomQuote(), 30000);
    } else {
        console.warn("Motivational quotes array is empty.");
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private pickRandomQuote() {
    const textEl = this.shadowRoot?.querySelector('.quote-text');
    const authorEl = this.shadowRoot?.querySelector('.quote-author');

    // Start fade-out
    if (textEl) (textEl as HTMLElement).classList.remove('visible');
    if (authorEl) (authorEl as HTMLElement).classList.remove('visible');

    setTimeout(() => {
      let newQuoteIndex = Math.floor(Math.random() * quotes.length);
      // Try to avoid immediate repetition if possible and more than one quote exists
      if (quotes.length > 1 && this.currentQuote) {
        let currentQuoteIndex = quotes.findIndex(q => q.text === this.currentQuote.text);
        while (newQuoteIndex === currentQuoteIndex) {
          newQuoteIndex = Math.floor(Math.random() * quotes.length);
        }
      }
      this.currentQuote = quotes[newQuoteIndex];

      // Wait for LitElement to update the DOM with the new quote
      this.updateComplete.then(() => {
        const newTextEl = this.shadowRoot?.querySelector('.quote-text');
        const newAuthorEl = this.shadowRoot?.querySelector('.quote-author');
        // Start fade-in
        if (newTextEl) (newTextEl as HTMLElement).classList.add('visible');
        if (newAuthorEl) (newAuthorEl as HTMLElement).classList.add('visible');
      });
    }, 700); // Duration of fade-out transition
  }

  render() {
    if (!this.currentQuote) {
      return html`<div class="quote-text"></div><div class="quote-author"></div>`; // Render empty placeholders
    }
    return html`
      <div class="quote-container" aria-live="polite" aria-atomic="true">
        <p class="quote-text">${this.currentQuote.text}</p>
        <p class="quote-author">- ${this.currentQuote.author}</p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gdm-motivational-quote': GdmMotivationalQuote;
  }
}