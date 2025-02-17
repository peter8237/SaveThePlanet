function moveBg() {
    let pos = 0;
    function animate() {
        pos += bgSpeed;
        bgEl.style.backgroundPosition = pos + "px 0px";
        requestAnimationFrame(animate);
    }
    animate();
}