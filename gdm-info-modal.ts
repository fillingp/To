
import { LitElement, css, html, svg } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// SVG Icons
const closeIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
const infoIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`;
const facebookIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.086h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>`;
const instagramIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.233.195-6.481 2.443-6.677 6.677-.058 1.281-.072 1.689-.072 4.948s.014 3.667.072 4.947c.196 4.233 2.444 6.481 6.677 6.677 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.233-.195 6.481-2.443 6.677-6.677.058-1.281.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.196-4.233-2.444-6.481-6.677-6.677-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
const whatsappIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z"/></svg>`;
const emailIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-1.518 14h-18v-10.722l9.12 7.388c.168.136.384.204.604.204s.436-.068.604-.204l9.272-7.388v10.722z"/></svg>`;
const linkIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 13.41c.44-.44.44-1.15 0-1.59l-4-4c-.44-.44-1.15-.44-1.59 0L3.31 9.49c-.44.44-.44 1.15 0 1.59l4 4c.44.44 1.15.44 1.59 0l1.69-1.67zm6.82-6.82c-.44-.44-1.15-.44-1.59 0l-1.69 1.67c.44.44.44 1.15 0 1.59l4 4c.44.44 1.15.44 1.59 0l1.69-1.69c.44-.44.44-1.15 0-1.59l-4-4zm-1.18 8.99l-1.59 1.59c-1.56 1.56-4.09 1.56-5.66 0l-4-4c-1.56-1.56-1.56-4.09 0-5.66l1.59-1.59c1.56-1.56 4.09-1.56 5.66 0l4 4c1.56 1.56 1.56 4.09 0 5.66z"/></svg>`;


@customElement('gdm-info-modal')
export class GdmInfoModal extends LitElement {
  @state()
  private isModalOpen = false;

  // Changed to a more reliable Imgur direct link
  private readonly profileImageUrl = 'https://i.imgur.com/9y8zH9A.png';

  static styles = css`
    :host {
      --modal-background-color: rgba(20, 20, 30, 0.95);
      --modal-text-color: #e0e0e0;
      --modal-header-color: #ffffff;
      --modal-link-color: #8ab4f8;
      --modal-link-hover-color: #bbe1fa;
      --modal-border-color: rgba(138, 180, 248, 0.3);
      --modal-shadow-color: rgba(138, 180, 248, 0.2);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .info-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: rgba(40, 40, 50, 0.8);
      color: var(--modal-link-color);
      border: 1px solid var(--modal-border-color);
      border-radius: 50%;
      width: 48px; /* Slightly larger button */
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;
      transition: background-color 0.3s ease, transform 0.2s ease;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .info-button:hover {
      background-color: rgba(60, 60, 80, 0.9);
      transform: scale(1.1);
    }
    .info-button svg {
      width: 24px; /* Adjusted for new button size */
      height: 24px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0s linear 0.3s;
    }
    .modal-overlay.open {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s ease;
    }
    .modal-content {
      background-color: var(--modal-background-color);
      color: var(--modal-text-color);
      padding: 25px; /* Increased padding slightly for better spacing */
      border-radius: 12px;
      box-shadow: 0 5px 25px var(--modal-shadow-color);
      width: 90%;
      max-width: 450px; /* Reduced max-width */
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      transform: scale(0.95);
      transition: transform 0.3s ease;
    }
    .modal-overlay.open .modal-content {
      transform: scale(1);
    }

    .modal-close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      color: var(--modal-text-color);
      cursor: pointer;
      padding: 5px;
    }
    .modal-close-button svg {
      width: 20px; /* Adjusted size */
      height: 20px;
    }
    .modal-close-button:hover {
      color: var(--modal-link-hover-color);
    }

    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--modal-border-color);
      padding-bottom: 15px;
    }
    .profile-image {
      width: 90px; /* Reduced size */
      height: 90px; /* Reduced size */
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 12px; /* Adjusted margin */
      border: 3px solid var(--modal-link-color);
    }
    .profile-name {
      font-size: 1.4em; /* Adjusted size */
      font-weight: 600;
      color: var(--modal-header-color);
      margin-bottom: 4px;
    }
    .profile-role {
      font-size: 0.95em; /* Adjusted size */
      color: var(--modal-link-color);
      margin-bottom: 10px;
    }

    .quote-section {
      margin-bottom: 20px;
      font-style: italic;
      color: #b0b0b0; /* Slightly lighter for quote */
      text-align: center;
    }
    .quote-text {
      font-size: 0.9em; /* Adjusted size */
      line-height: 1.5;
    }
    .quote-attribution {
      font-size: 0.8em; /* Adjusted size */
      margin-top: 8px;
      color: #909090;
    }
     .signature {
      font-family: 'Brush Script MT', 'Brush Script Std', cursive; /* Example cursive font */
      font-size: 1.1em; /* Adjusted size */
      color: var(--modal-link-color);
      text-align: center;
      margin-top: 8px;
    }

    .contact-links {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    .contact-links li {
      margin-bottom: 8px; /* Reduced margin */
    }
    .contact-links a {
      color: var(--modal-link-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px; /* Increased gap for better spacing with larger icons */
      padding: 6px 0; /* Adjusted padding */
      transition: color 0.3s ease;
      font-size: 0.9em; /* Adjusted font size */
    }
    .contact-links a:hover {
      color: var(--modal-link-hover-color);
    }
    .contact-links svg {
      width: 22px; /* Increased icon size */
      height: 22px; /* Increased icon size */
      fill: currentColor;
    }
    
    .project-section {
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid var(--modal-border-color);
    }
    .project-section h3 {
      font-size: 1.1em;
      color: var(--modal-header-color);
      margin-bottom: 8px;
    }
    .project-section p {
      font-size: 0.85em;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .project-link {
      display: inline-flex; /* To align icon and text */
      align-items: center;
      gap: 8px;
      color: var(--modal-link-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      font-size: 0.9em;
    }
    .project-link:hover {
      color: var(--modal-link-hover-color);
    }
    .project-link svg {
       width: 20px;
       height: 20px;
       fill: currentColor;
    }

    /* Scrollbar styling for webkit browsers */
    .modal-content::-webkit-scrollbar {
      width: 8px;
    }
    .modal-content::-webkit-scrollbar-track {
      background: rgba(0,0,0,0.1);
      border-radius: 10px;
    }
    .modal-content::-webkit-scrollbar-thumb {
      background: var(--modal-link-color);
      border-radius: 10px;
    }
    .modal-content::-webkit-scrollbar-thumb:hover {
      background: var(--modal-link-hover-color);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.handleEscKey = this.handleEscKey.bind(this);
    document.addEventListener('keydown', this.handleEscKey);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleEscKey);
  }

  private handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isModalOpen) {
      this.closeModal();
    }
  }

  private toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  private closeModal() {
    this.isModalOpen = false;
  }

  render() {
    return html`
      <button class="info-button" @click=${this.toggleModal} aria-label="Informace o vývojáři" title="Informace o vývojáři">
        ${infoIcon}
      </button>

      <div class="modal-overlay ${this.isModalOpen ? 'open' : ''}" @click=${this.closeModal}>
        <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
          <button class="modal-close-button" @click=${this.closeModal} aria-label="Zavřít okno">
            ${closeIcon}
          </button>

          <div class="profile-header">
            <img src="${this.profileImageUrl}" alt="František Kalášek" class="profile-image">
            <h2 class="profile-name">František Kalášek</h2>
            <p class="profile-role">Designer & Developer</p>
          </div>

          <div class="quote-section">
            <p class="quote-text">"Bridge the gap, create the world. We envision a world, where boundaries are transcended and cultures are united by creativity. We thank you for being part of our universe."</p>
            <p class="quote-attribution">- Filling Pieces</p>
            <p class="signature">TopBot.PwnZ™</p>
          </div>

          <ul class="contact-links">
            <li><a href="https://facebook.com/frantisek.kalasek/" target="_blank" rel="noopener noreferrer">${facebookIcon} Facebook</a></li>
            <li><a href="https://instagram.com/topbot_pwnz.qq" target="_blank" rel="noopener noreferrer">${instagramIcon} Instagram</a></li>
            <li><a href="https://wa.me/420722426195" target="_blank" rel="noopener noreferrer">${whatsappIcon} WhatsApp</a></li>
            <li><a href="mailto:FandaKalasek@icloud.com">${emailIcon} FandaKalasek@icloud.com</a></li>
          </ul>

          <div class="project-section">
            <h3>Další projekt: VerseVis</h3>
            <p>VerseVis je kreativní aplikace, která tvoří obrazy z básní a textů. Promění vaše slova v umělecká díla pomocí pokročilých AI technologií.</p>
            <a href="https://studio--versevis.us-central1.hosted.app/" target="_blank" rel="noopener noreferrer" class="project-link">
              ${linkIcon} Navštívit VerseVis
            </a>
          </div>

        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gdm-info-modal': GdmInfoModal;
  }
}
