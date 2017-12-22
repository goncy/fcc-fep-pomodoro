const getDuration = limit => moment.duration(limit - moment().valueOf())

window.app = new Vue({
  el: '#app',
  data: {
    workTime: 20,
    restTime: 5,
    intervalLimit: null,
    timer: null,
    type: 'work'
  },
  methods: {
    startTimer() {
      const intervalTime = this.type === "work"
        ? (this.workTime * 60000)
        : (this.restTime * 60000)
      this.intervalLimit = moment().valueOf() + intervalTime
      this.timer = getDuration(this.intervalLimit)

      this.interval = setInterval(() => {
        const timer = getDuration(this.intervalLimit)
        if (timer.valueOf() <= 1000) {
          this.type = this.type === "work"
            ? "rest"
            : "work"
          this.stopTimer()
          } else {
          this.timer = timer
        }
      }, 1000)
    },
    stopTimer() {
      this.intervalLimit = null
      this.timer = 
      this.type = "work"

      clearInterval(this.interval)
    },
    changeWorkTime(time) {
      const result = this.workTime + time
      this.workTime = (result >= 1 || result >= 40) ? result : this.workTime
    },
    changeRestTime(time) {
      const result = this.restTime + time
      this.restTime = (result >= 1 || result >= 40) ? result : this.restTime
    }
  },
  computed: {
    formatedTimer() {
      return `${this.timer.minutes()} minutes ${this.timer.seconds()} seconds`
    }
  }
})