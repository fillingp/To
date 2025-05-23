
/* tslint:disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {GoogleGenAI, LiveServerMessage, Modality, Session} from '@google/genai';
import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {createBlob, decode, decodeAudioData} from './utils';
import './visual-3d';
import './gdm-motivational-quote.ts';
import './gdm-info-modal.ts'; // Added import for the info modal component

@customElement('gdm-live-audio')
export class GdmLiveAudio extends LitElement {
  @state() isRecording = false;
  @state() status = '';
  @state() error = '';

  private client: GoogleGenAI;
  private session: Session | null = null; // Initialize as null
  // Fix: Replace deprecated 'webkitAudioContext' with 'AudioContext'
  private inputAudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)({sampleRate: 16000});
  // Fix: Replace deprecated 'webkitAudioContext' with 'AudioContext'
  private outputAudioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)({sampleRate: 24000});
  @state() inputNode = this.inputAudioContext.createGain();
  @state() outputNode = this.outputAudioContext.createGain();
  private nextStartTime = 0;
  private mediaStream: MediaStream;
  private sourceNode: AudioBufferSourceNode;
  private scriptProcessorNode: ScriptProcessorNode;
  private sources = new Set<AudioBufferSourceNode>();

  static styles = css`
    #status {
      position: absolute;
      bottom: 5vh;
      left: 0;
      right: 0;
      z-index: 10;
      text-align: center;
      color: white; /* Ensure status text is visible */
      padding: 0 10px; /* Add some padding */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .controls {
      z-index: 10;
      position: absolute;
      bottom: 10vh;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;

      button {
        outline: none;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.1);
        width: 64px;
        height: 64px;
        cursor: pointer;
        font-size: 24px;
        padding: 0;
        margin: 0;
        display: flex; /* For centering icon */
        align-items: center; /* For centering icon */
        justify-content: center; /* For centering icon */

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }

      button[disabled] {
        display: none;
      }
    }
  `;

  constructor() {
    super();
    this.initClient();
  }

  private initAudio() {
    this.nextStartTime = this.outputAudioContext.currentTime;
  }

  private async initClient() {
    this.initAudio();

    if (!process.env.API_KEY) {
      this.updateError('CHYBA: API klíč není nastaven v prostředí (process.env.API_KEY)! Aplikace nemůže fungovat.');
      console.error('FATAL: API_KEY is not set in process.env. Application cannot function. Please set the API_KEY environment variable.');
      // Consider disabling interaction buttons here if the key is missing.
      return; // Stop further initialization.
    }

    try {
      this.client = new GoogleGenAI({
        apiKey: process.env.API_KEY,
      });
    } catch (e) {
        console.error('Failed to initialize GoogleGenAI client:', e);
        this.updateError(`Chyba inicializace klienta: ${e.message}. Zkontrolujte API klíč.`);
        return;
    }
    

    this.outputNode.connect(this.outputAudioContext.destination);

    this.initSession();
  }

  private async initSession() {
    if (!this.client) {
        this.updateError('Klient není inicializován. API klíč chybí nebo je neplatný.');
        console.error('initSession: client is not initialized. Cannot create session.');
        return;
    }
    const model = 'gemini-2.5-flash-preview-native-audio-dialog';

    try {
      this.updateStatus('Připojování k session...');
      this.session = await this.client.live.connect({
        model: model,
        callbacks: {
          onopen: () => {
            this.updateStatus('Připojeno');
            console.log('Session opened.');
          },
          onmessage: async (message: LiveServerMessage) => {
            console.log('onmessage received:', JSON.stringify(message, null, 2));
            try {
              const serverContent = message.serverContent;
              let accumulatedText = "";
              let audioProcessed = false;

              if (serverContent?.modelTurn?.parts && serverContent.modelTurn.parts.length > 0) {
                for (const part of serverContent.modelTurn.parts) {
                  if (part.inlineData) { // Audio part
                    console.log('Processing audio part.');
                    const audio = part.inlineData;
                    this.nextStartTime = Math.max(
                      this.nextStartTime,
                      this.outputAudioContext.currentTime,
                    );

                    const audioBuffer = await decodeAudioData(
                      decode(audio.data),
                      this.outputAudioContext,
                      24000, // Output sample rate
                      1,     // Mono channel
                    );
                    const source = this.outputAudioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(this.outputNode);
                    source.addEventListener('ended', () =>{
                      this.sources.delete(source);
                    });

                    source.start(this.nextStartTime);
                    this.nextStartTime = this.nextStartTime + audioBuffer.duration;
                    this.sources.add(source);
                    audioProcessed = true;
                  } else if (part.text) { // Text part
                    console.log('Processing text part:', part.text);
                    accumulatedText += part.text + " ";
                  }
                }
              } else {
                console.log('onmessage: serverContent.modelTurn.parts is null, empty, or not an array. Message:', message);
              }


              if (accumulatedText.trim()) {
                console.log('Updating status with accumulated text:', accumulatedText.trim());
                this.updateStatus(`AI: ${accumulatedText.trim()}`);
              } else if (audioProcessed) {
                console.log('Audio processed, no new text status to set.');
                 // Optionally, update status to indicate audio is playing if no text.
                 // this.updateStatus('AI přehrává audio...');
              } else {
                console.log('onmessage: No audio processed and no text accumulated.');
              }


              if (serverContent?.interrupted) {
                console.log('Server content interrupted.');
                for (const source of this.sources.values()) {
                  source.stop();
                  this.sources.delete(source);
                }
                this.nextStartTime = 0;
                if (!accumulatedText.trim() && !audioProcessed) {
                   this.updateStatus('AI: Přerušeno');
                }
              }
            } catch (e) {
              console.error('Error processing message in onmessage:', e);
              this.updateError(`Chyba zpracování odpovědi: ${e.message}`);
            }
          },
          onerror: (e: ErrorEvent | Error) => { // ErrorEvent might not have message property
            const errorMessage = (e instanceof ErrorEvent && e.message) ? e.message : (e as Error).message || 'Neznámá chyba spojení';
            console.error('Connection error:', e);
            this.updateError(`Chyba spojení: ${errorMessage}`);
            this.isRecording = false; // Stop recording on connection error
          },
          onclose: (e: CloseEvent) => {
            console.log('Connection closed:', e);
            this.updateStatus(`Spojení uzavřeno: ${e.code} ${e.reason || 'Neznámý důvod'}`);
            this.isRecording = false; // Stop recording if connection closes
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {prebuiltVoiceConfig: {voiceName: 'Orus'}},
            // languageCode: 'en-GB'
          },
          systemInstruction: "Jste hlasový asistent. Pokud se vás uživatel zeptá na vašeho tvůrce, autora, vývojáře, nebo kdo vytvořil tuto aplikaci, odpovězte, že vás vytvořil František Kalášek. Můžete dodat, že František Kalášek je talentovaný vývojář."
        },
      });
    } catch (e) {
      console.error('Failed to initialize session:', e);
      this.updateError(e.message || 'Nepodařilo se inicializovat session. Zkontrolujte API klíč a síťové připojení.');
      this.session = null; // Ensure session is null on failure
    }
  }

  private updateStatus(msg: string) {
    this.status = msg;
    this.error = ''; // Clear error when status updates
  }

  private updateError(msg: string) {
    this.error = msg;
    // this.status = ''; // Optionally clear status when error occurs
  }

  private async startRecording() {
    if (this.isRecording) {
      return;
    }
    this.error = ''; // Clear previous errors

    if (!this.session) {
        this.updateError('Nelze spustit nahrávání: session není aktivní. Zkuste reset nebo zkontrolujte konzoli pro chyby.');
        console.error('startRecording: Cannot start, session is not active.');
        return;
    }

    this.inputAudioContext.resume();
    this.outputAudioContext.resume(); // Ensure output context is resumed as well

    this.updateStatus('Žádost o přístup k mikrofonu...');

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      this.updateStatus('Přístup k mikrofonu udělen. Spouštění záznamu...');

      this.sourceNode = this.inputAudioContext.createMediaStreamSource(
        this.mediaStream,
      );
      this.sourceNode.connect(this.inputNode);

      const bufferSize = 1024; // Using a common buffer size
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(
        bufferSize,
        1,
        1,
      );

      this.scriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
        if (!this.isRecording) return;

        if (!this.session) {
            console.error('onaudioprocess: Session is not active. Stopping audio send.');
            // This state should ideally be caught earlier, but as a safeguard:
            // this.stopRecording(); 
            // this.updateError('Chyba: Session byla ztracena během nahrávání.');
            return;
        }

        const inputBuffer = audioProcessingEvent.inputBuffer;
        const pcmData = inputBuffer.getChannelData(0);
        
        try {
            this.session.sendRealtimeInput({media: createBlob(pcmData)});
        } catch (e) {
            console.error('Error sending realtime input:', e);
            this.updateError(`Chyba odesílání audia: ${e.message}`);
            this.stopRecording(); // Stop if sending fails
        }
      };

      this.sourceNode.connect(this.scriptProcessorNode);
      // scriptProcessorNode does not need to be connected to destination for capture only

      this.isRecording = true;
      this.updateStatus('🔴 Nahrávání... Mluvte nyní.');
    } catch (err) {
      console.error('Chyba při spouštění nahrávání:', err);
      this.updateError(`Chyba při spouštění nahrávání: ${err.message}. Zkontrolujte oprávnění k mikrofonu.`);
      this.stopRecording(); // Clean up if starting failed
    }
  }

  private stopRecording() {
    if (!this.isRecording && !this.mediaStream && !(this.inputAudioContext.state === 'running' && this.scriptProcessorNode)) {
      // If not recording and resources seem released, do nothing to prevent errors on multiple calls.
      // console.log('stopRecording: Already stopped or resources not initialized.');
      // return;
    }
    
    this.updateStatus('Zastavování nahrávání...');
    this.isRecording = false; // Set this first

    if (this.scriptProcessorNode) {
      this.scriptProcessorNode.disconnect();
      this.scriptProcessorNode.onaudioprocess = null; // Remove reference to avoid memory leaks
      // Setting to null is good practice if it's checked before use elsewhere.
      // this.scriptProcessorNode = null; 
    }
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      // this.sourceNode = null;
    }
    
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    // Optionally, inform the session that input has ended if API supports it.
    // if (this.session) {
    //   this.session.sendRealtimeInput({ media: null, lastChunk: true }); // Example, API might differ
    // }

    this.updateStatus('Nahrávání zastaveno. Klikněte na Start pro nový začátek.');
  }

  private reset() {
    this.stopRecording(); 
    
    if (this.session) {
       try {
           this.session.close();
           console.log('Previous session closed during reset.');
       } catch (e) {
           console.warn('Error closing existing session during reset:', e);
       }
       this.session = null; // Ensure session is cleared before re-init
    }
    
    for(const source of this.sources.values()) {
        try {
            source.stop();
        } catch(e) {
            console.warn('Error stopping an audio source during reset:', e);
        }
    }
    this.sources.clear();
    this.nextStartTime = 0;

    // It's good practice to resume contexts if they were suspended, though startRecording also does this.
    if (this.outputAudioContext.state === 'suspended') {
      this.outputAudioContext.resume().catch(e => console.error("Error resuming output context:", e));
    }
    if (this.inputAudioContext.state === 'suspended') {
      this.inputAudioContext.resume().catch(e => console.error("Error resuming input context:", e));
    }

    this.initSession(); // Attempt to establish a new session
    // Status update is now handled by initSession callbacks or errors
  }

  render() {
    return html`
      <div>
        <gdm-motivational-quote></gdm-motivational-quote>
        <div class="controls">
          <button
            id="resetButton"
            aria-label="Resetovat session"
            title="Resetovat session"
            @click=${this.reset}
            ?disabled=${this.isRecording}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#ffffff">
              <path
                d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
            </svg>
          </button>
          <button
            id="startButton"
            aria-label="Spustit nahrávání"
            title="Spustit nahrávání"
            @click=${this.startRecording}
            ?disabled=${this.isRecording || !!this.error.includes('API klíč není nastaven')}>
            <svg
              viewBox="0 0 100 100"
              width="32px"
              height="32px"
              fill="#c80000"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" />
            </svg>
          </button>
          <button
            id="stopButton"
            aria-label="Zastavit nahrávání"
            title="Zastavit nahrávání"
            @click=${this.stopRecording}
            ?disabled=${!this.isRecording}>
            <svg
              viewBox="0 0 100 100"
              width="32px"
              height="32px"
              fill="#ffffff" 
              xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="15" width="70" height="70" rx="10" />
            </svg>
          </button>
        </div>

        <div id="status" role="status" aria-live="polite"> ${this.error || this.status} </div>
        <gdm-live-audio-visuals-3d
          .inputNode=${this.inputNode}
          .outputNode=${this.outputNode}></gdm-live-audio-visuals-3d>
        <gdm-info-modal></gdm-info-modal>
      </div>
    `;
  }
}
