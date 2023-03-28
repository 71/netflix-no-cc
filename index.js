// ==UserScript==
// @name        Netflix — No closed captions
// @match       https://www.netflix.com/watch/*
// @grant       none
// ==/UserScript==

// Disable the condition below if the script is not running in ViolentMonkey.
if (true) {
  document.body.appendChild(
    Object.assign(
      document.createElement("style"), {
        innerHTML: `
          .player-timedtext {
            display: flex!important;
            justify-content: center;
          }

          .player-timedtext-text-container {
            left: auto!important;
          }
        `,
      },
    ),
  );
}

let lastContainer = null;

function removeClosedCaptions() {
  const els = document.getElementsByClassName("player-timedtext-text-container");

  if (els.length === 1) {
    const el = els[0];

    if (el !== lastContainer && el.children !== null) {
      lastContainer = el;

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);

      for (;;) {
        const node = walker.nextNode();

        if (node === null) {
          break;
        }

        node.nodeValue = node.nodeValue.replace(/ *-? *\[.+?\] */g, "");
      }
    }
  }

  requestAnimationFrame(removeClosedCaptions);
}

removeClosedCaptions();
