let lastContainer = null

function removeClosedCaptions() {
  const els = document.getElementsByClassName('player-timedtext-text-container')

  if (els.length === 1) {
    const el = els[0]

    if (el != lastContainer && el.children != null) {
      lastContainer = el

      for (const e of el.children) {
        for (const n of e.childNodes) {
          if (n.nodeValue)
            n.nodeValue = n.nodeValue.replace(/ *-? *\[.+?\] */g, '')
        }
      }
    }
  }

  requestAnimationFrame(removeClosedCaptions)
}

removeClosedCaptions()
