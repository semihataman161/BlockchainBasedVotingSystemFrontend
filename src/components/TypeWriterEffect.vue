<template>
    <div class="css-typing">
      <h1 :style="[textStyle]">
        {{ text }}
      </h1>
    </div>
  </template>
  
  <script>
  export default {
    props: ["text", "textStyle"],
    data() {
      return {
      };
    },
    methods: {
    },
    computed: {
      textLengthStyle() {
        const STYLE_RATIO = 1.6;
        const textLength = this.$props.text.length;
        
        return {
          width: `${textLength / STYLE_RATIO}em`,
          animationDuration: `${textLength / (STYLE_RATIO * 22)}s`,
          animationStep: Math.ceil(textLength * STYLE_RATIO),
        };
      },
    },
    mounted() {
      
    },
  };
  </script>
  <style scoped>
  @media screen and (max-width: 768px) {
    .css-typing h1 {
      display: none;
    }
  }

  .css-typing {
    display: flex;
    justify-content: center;
  }
  .css-typing h1 {
    border-right: 0.15em solid blue;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    width: v-bind(textLengthStyle.width);
  }
  .css-typing h1:nth-child(1) {
    opacity: 0;
    -webkit-animation: type 1s steps(80, end);
    animation: type v-bind(textLengthStyle.animationDuration) steps(v-bind(textLengthStyle.animationStep), end);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  
  @keyframes type {
    0% {
      width: 0;
    }
    1% {
      opacity: 1;
    }
    99.9% {
      border-right: 0.15em solid blue;
    }
    100% {
      opacity: 1;
      border: none;
    }
  }
  
  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
  @-webkit-keyframes blink {
    50% {
      border-color: tranparent;
    }
  }
  </style>
  