// Canvas
const ctx = document.getElementById("ctx")
// Handle entering mouse on screen and going out of app window
$(document).on("mouseenter", () => {
  $("#tracking").stop()
  $("#tracking").fadeIn(100)
})
$(document).on("mouseleave", () => {
  $("#tracking").stop()
  $("#tracking").fadeOut(100, () => {
    const context = ctx.getContext("2d")
    context.clearRect(0, 0, ctx.width, ctx.height)
  })
})
// Window
const windowX = $(window).width()
const windowY = $(window).height()
// Eyeball
const eyeX = $("#eye").offset().left
const eyeY = $("#eye").offset().top
const eyeWidth = $("#eye").width()
const eyeHeight = $("#eye").height()
const eyeCenterX = eyeX + eyeWidth / 2
const eyeCenterY = eyeY + eyeHeight / 2
const handleMove = (event) => {
  // Cursor update
  const mouseX = event.pageX
  const mouseY = event.pageY
  const x = mouseX / windowX
  const y = mouseY / windowY
  $("#tracking").css("left", `${x * 100}%`)
  $("#tracking").css("top", `${y * 100}%`)
  // Math
  const dx = mouseX - eyeCenterX
  const dy = mouseY - eyeCenterY
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI
  $("#eye").css("transform", `rotate(${angle}deg)`)
  // Drawing line in canvas
  ctx.width = windowX
  ctx.height = windowY
  const ctxX = ctx.getContext("2d")
  ctxX.beginPath()
  ctxX.moveTo(eyeCenterX, eyeCenterY)
  ctxX.lineTo(mouseX, mouseY)
  ctxX.lineWidth = 5
  ctxX.strokeStyle = "#36aaf9"
  ctxX.stroke()
}
document.addEventListener("touchmove", (event) => {
  handleMove(event)
})
document.addEventListener("mousemove", (event) => {
  handleMove(event)
})
