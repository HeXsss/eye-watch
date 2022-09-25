// Canvas
const ctx = document.getElementById("ctx")
// Handle entering mouse on screen and going out of app window
const drawAxis = () => {
  // Draw OX and OY
  ctx.width = windowX
  ctx.height = windowY
  const ctxX = ctx.getContext("2d")
  ctxX.beginPath()
  ctxX.moveTo(0, eyeCenterY)
  ctxX.lineTo(windowX, eyeCenterY)
  ctxX.lineWidth = 1
  ctxX.strokeStyle = "#aaa"
  ctxX.stroke()
  ctxX.beginPath()
  ctxX.moveTo(eyeCenterX, 0)
  ctxX.lineTo(eyeCenterX, windowY)
  ctxX.lineWidth = 1
  ctxX.strokeStyle = "#aaa"
  ctxX.stroke()
}
const handleEnter = (event) => {
  $("#tracking").stop(event)
  $("#tracking").fadeIn(100)
  handleMove(event)
  drawAxis()
}
const handleExit = (event) => {
  $("#tracking").stop()
  $("#tracking").fadeOut(100, () => {
    const context = ctx.getContext("2d")
    context.clearRect(0, 0, ctx.width, ctx.height)
    $("#tracking").css("left", "50%")
    $("#tracking").css("top", "50%")
  })
}
document.addEventListener("mouseenter", (event) => {
  handleEnter(event)
})
document.addEventListener("mouseleave", (event) => {
  handleExit(event)
})
document.addEventListener("touchstart", (event) => {
  event.preventDefault()
  handleEnter(event)
})
document.addEventListener("touchend", (event) => {
  event.preventDefault()
  handleExit(event)
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
$("#data-eye").text(`eye = [${eyeCenterX}, ${eyeCenterY}]`)
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
  $("#data-a").text(`a = tan = ${Math.tan(angle).toFixed(2)}`)
  $("#data-deg").text(`deg = ${angle.toFixed(2)}°`)
  $("#data-cursor").text(`cursor = [${mouseX}, ${mouseY}]`)
  $("#eye").css("transform", `rotate(${angle}deg)`)
  // Drawing line in canvas
  ctx.width = windowX
  ctx.height = windowY
  const ctxX = ctx.getContext("2d")
  drawAxis()
  // Straight line
  ctxX.beginPath()
  ctxX.moveTo(eyeCenterX, eyeCenterY)
  ctxX.lineTo(mouseX, mouseY)
  ctxX.lineWidth = 5
  ctxX.strokeStyle = "#36aaf9"
  ctxX.stroke()
}
document.addEventListener("touchmove", (event) => {
  event.preventDefault()
  handleMove(event)
})
document.addEventListener("mousemove", (event) => {
  event.preventDefault()
  handleMove(event)
})
