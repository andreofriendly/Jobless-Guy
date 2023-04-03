class Timer {
    constructor(scene, startTime) {
      this.scene = scene;
      this.startTime = startTime;
      this.timerDuration = 24 * 60 * 1000;
      this.timerText = scene.add.text(1800, 880, '00:00', {
        font: '32px Arial',
        fill: '#f8b936'
      }).setName('timerText');
      this.timerEvent = scene.time.addEvent({
        delay: 500, 
        loop: true,
        callback: this.updateTimer,
        callbackScope: this
      });
      this.timerRunning = true;
    }
  
    updateTimer() {
      var elapsed = Date.now() - this.startTime;
      var elapsedTimerTime = elapsed * 2;
    
      var minutes = Math.floor(elapsedTimerTime / 60000);
      var seconds = Math.floor((elapsedTimerTime % 60000) / 1000);
    
      var minutesText = (minutes < 10) ? '0' + minutes : minutes;
      var secondsText = (seconds < 10) ? '0' + seconds : seconds;
    
      // Update the timer text object with the new time
      this.timerText.setText(minutesText + ':' + secondsText);
    
      // Check if the elapsed time is equal to or greater than 2 minutes

      if (elapsedTimerTime < 1080000){
        day = "morning";
      }else if(elapsedTimerTime >= 1080000){
        day = "night";
      }
      if (elapsedTimerTime >= 1440000) {
        // Call the updateLevel function in game.js
        level = 1;
        this.startTime = Date.now();
      }
    }
    
    
  
    stop() {
      this.timerEvent.destroy();
      this.timerRunning = false;
    }
  
    resume() {
      this.timerEvent = this.scene.time.addEvent({
        delay: 500,
        loop: true,
        callback: this.updateTimer,
        callbackScope: this
      });
      this.timerRunning = true;
    }
  
    destroy() {
      this.stop();
      this.timerText.destroy();
    }
  }
  