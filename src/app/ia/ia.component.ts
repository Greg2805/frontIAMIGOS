import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.scss']
})
export class IaComponent {
  isRecording = false;
  transcript = '';
  finalTranscript = '';
  recognition: any;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'fr-FR';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        console.log('Reconnaissance vocale démarrée');
      };

      this.recognition.onresult = (event: any) => {
        console.log('Résultat reçu', event);
        let tempTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            tempTranscript += event.results[i][0].transcript;
          }
        }
        this.transcript = tempTranscript;
      };

      this.recognition.onend = () => {
        this.isRecording = false;
        this.finalTranscript = this.transcript;
        console.log('Reconnaissance terminée, finalTranscript:', this.finalTranscript);
        this.cdr.detectChanges();
        this.sendToBackend(this.finalTranscript); // <-- Envoi au backend ici
      };
    } else {
      alert('La reconnaissance vocale n\'est pas supportée par ce navigateur.');
    }
  }

  toggleRecording() {
    if (!this.recognition) {
      alert('La reconnaissance vocale n\'est pas supportée par ce navigateur.');
      return;
    }
    if (this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      console.log('Reconnaissance arrêtée');
    } else {
      this.transcript = '';
      this.finalTranscript = '';
      this.recognition.start();
      this.isRecording = true;
      console.log('Reconnaissance démarrée');
    }
  }

  sendToBackend(text: string) {
    // Remplace l'URL par celle de ton backend
    this.http.post('http://localhost:5000/api/ask', { question: text })
      .subscribe({
        next: (response) => console.log('Réponse du backend:', response),
        error: (err) => console.error('Erreur backend:', err)
      });
  }
}