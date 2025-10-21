// WebcamApp - modular camera controller
class WebcamApp {
  constructor() {
    this.webcamEl = document.getElementById("webcam");
    this.canvasEl = document.getElementById("canvas");
    this.snapSound = document.getElementById("snapSound");
    this.statusEl = document.getElementById("status");
    this.downloadLink = document.getElementById("download-photo");

    this.buttons = {
      start: document.getElementById("start-camera"),
      stop: document.getElementById("stop-camera"),
      flip: document.getElementById("flip-camera"),
      photo: document.getElementById("take-photo"),
    };

    this.webcam = new Webcam(this.webcamEl, "user", this.canvasEl, this.snapSound);
    this.#bindEvents();
    this.#updateUI(false);
  }

  #bindEvents() {
    this.buttons.start.addEventListener("click", () => this.start());
    this.buttons.stop.addEventListener("click", () => this.stop());
    this.buttons.flip.addEventListener("click", () => this.flip());
    this.buttons.photo.addEventListener("click", () => this.snap());
  }

  async start() {
    this.statusEl.innerHTML = "Starting camera...";
    try {
      await this.webcam.start();
      this.statusEl.classList.add("hidden");
      this.#updateUI(true);
    } catch (err) {
      this.statusEl.innerHTML = `Error: ${err.message}<br>Please allow camera access.`;
    }
  }

  stop() {
    this.webcam.stop();
    this.#updateUI(false);
    this.statusEl.classList.remove("hidden");
    this.statusEl.innerHTML = "Camera is off";
    this.downloadLink.classList.add("hidden");
  }

  flip() {
    this.webcam.flip();
    this.start();
  }

  snap() {
    const photo = this.webcam.snap();
    this.downloadLink.href = photo;
    this.downloadLink.classList.remove("hidden");
    this.#showSnapshot();
  }

  #updateUI(isOn) {
    this.buttons.start.disabled = isOn;
    this.buttons.stop.disabled = !isOn;
    this.buttons.flip.disabled = !isOn;
    this.buttons.photo.disabled = !isOn;
  }

  #showSnapshot() {
    this.canvasEl.classList.remove("hidden");
    this.webcamEl.classList.add("hidden");
    setTimeout(() => {
      this.canvasEl.classList.add("hidden");
      this.webcamEl.classList.remove("hidden");
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => new WebcamApp());
