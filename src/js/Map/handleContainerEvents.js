import Util from '../Util/Util'

export default function handleContainerEvents() {
  var mouseDown = false, oldPageX, oldPageY, map = this

  if (this.params.draggable) {
    this.container
      .on('mousemove', (e) => {
        if (mouseDown) {
          map.transX -= (oldPageX - e.pageX) / map.scale
          map.transY -= (oldPageY - e.pageY) / map.scale
          map.applyTransform()
          oldPageX = e.pageX
          oldPageY = e.pageY
        }
        return false
      }).on('mousedown', (e) => {
        mouseDown = true
        oldPageX = e.pageX
        oldPageY = e.pageY
        return false
      })

    Util.$('body').on('mouseup', () => {
      mouseDown = false
    })
  }

  if (this.params.zoomOnScroll) {
    // I hate this block!
    this.container.on('mousewheel', (event) => {
      var bClientRect = this.container.selector.getBoundingClientRect(),
        centerY = event.clientY - bClientRect.top,
        centerX = event.clientX - bClientRect.left,
        zoomStep = Math.pow(1 + map.params.zoomOnScrollSpeed / 1000, -1.25 * event.deltaY)

      map.tooltip.hide()
      map.setScale(map.scale * zoomStep, centerX, centerY)
      event.preventDefault()
    })
  }
}