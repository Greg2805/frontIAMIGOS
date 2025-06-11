import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  standalone : true,
  imports: [NgIf],
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  
  private mediaStream: MediaStream | null = null;
  isCameraActive = false;
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit() {}

  async startCamera() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices.length === 0) {
        this.errorMessage = 'Aucune caméra détectée';
        return;
      }

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          deviceId: videoDevices[0].deviceId ? 
            { exact: videoDevices[0].deviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (this.videoElement) {
        const videoEl = this.videoElement.nativeElement;
        videoEl.srcObject = this.mediaStream;

        videoEl.onloadedmetadata = () => {
          videoEl.play().catch(e => {
            console.error('Erreur lors de la lecture:', e);
          });
        };

        this.isCameraActive = true;
        this.errorMessage = null;
      }
    } catch (error) {
      console.error('Erreur détaillée:', error);
      this.errorMessage = `Impossible d\'accéder à la caméra: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
      this.isCameraActive = false;
    }
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      
      if (this.videoElement) {
        const videoEl = this.videoElement.nativeElement;
        videoEl.srcObject = null;
      }
      
      this.mediaStream = null;
      this.isCameraActive = false;
    }
  }

  ngOnDestroy() {
    this.stopCamera();
  }
}