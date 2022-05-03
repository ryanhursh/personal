const app = Vue.createApp({
    data() {
      return {
        items: [{ page: "about" }, { page: "works" }, { page: "contact" }],
        cursorPosX: 960,
        cursorPosY: 540,
        cursorFollowActiveBuffer: 16,
        buttonHoverFlag: false
      };
    },
    mounted() {
      this.cursorPointer = this.$refs.cursorPointer;
      this.cursorFollow = this.$refs.cursorFollow;
      this.button = document.querySelectorAll(".js-button");
  
      window.addEventListener("mousemove", (e) => {
        if (this.buttonHoverFlag === true) {
          return;
        }
        this.mouseMoveCursor(this.cursorPointer, e, 1.0);
        this.mouseMoveCursor(this.cursorFollow, e, 1.0);
      });
  
      this.onMouseMove();
      this.onMouseLeave();
    },
    methods: {
      mouseMoveCursor(element, event, friction) {
        this.cursorPosX += (event.clientX - this.cursorPosX) * friction;
        this.cursorPosY += (event.clientY - this.cursorPosY) * friction;
        element.style.transform = `translate(${
          this.cursorPosX - element.clientWidth / 2
        }px,${this.cursorPosY - element.clientHeight / 2}px)`;
      },
      onMouseMove() {
        for (let i = 0; i < this.button.length; i++) {
          this.button[i].addEventListener("mousemove", (e) => {
            this.buttonHoverFlag = true;
            this.cursorPointer.style.backgroundColor = "transparent";
            this.cursorFollow.style.transform = `translate(${
              e.target.getBoundingClientRect().left -
              this.cursorFollowActiveBuffer
            }px,${
              e.target.getBoundingClientRect().top - this.cursorFollowActiveBuffer
            }px)`;
            this.cursorFollow.style.width =
              e.target.getBoundingClientRect().width + "px";
            this.cursorFollow.style.height =
              e.target.getBoundingClientRect().height + "px";
            this.cursorFollow.style.padding =
              this.cursorFollowActiveBuffer + "px";
            this.cursorFollow.style.borderRadius = 0;
          });
        }
      },
      onMouseLeave() {
        for (let i = 0; i < this.button.length; i++) {
          this.button[i].addEventListener("mouseleave", () => {
            this.buttonHoverFlag = false;
            this.cursorPointer.style.backgroundColor = "#fff";
            this.cursorFollow.style.width = 10 + "px";
            this.cursorFollow.style.height = 10 + "px";
            this.cursorFollow.style.padding = 32 + "px";
            this.cursorFollow.style.borderRadius = "100%";
          });
        }
      }
    }
  });
  
  app.mount("#app");
 