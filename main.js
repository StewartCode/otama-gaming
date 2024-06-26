import "./style.css";

document.querySelector("#app").innerHTML = `
<body>
    <h1><em>Welcome to Otama Free Online Games</em></h1>
    <div>
      <iframe frameborder="0" src="https://itch.io/embed-upload/10627049?color=333333" allowfullscreen="" width="500" height="420">
        <a href="https://otama-studiosports.itch.io/otama-looks-at-the-mouse">Play Otama looks at the mouse on itch.io
        </a>
      </iframe>
    </div>
    <div>
      <h1>Play with Otama ↑</h1>
      <h2>Scroll down to view the games!</h2>

      <p><strong>Welcome to otama's free online games! <br>Here you'll find a collection of games I have made myself, hopefully they are getting better with every release. <br>I am slowly making new games, I am mostly focusing on small scale arcade games.<br> If you're interested in putting some of these on your website, head down to the bottom and go to the info page.<br> </strong></p>
      <h2 class="trigger" data-target="iframe3">Enjoy the games!</h2>
      <h1>Games Menu:</h1>
    </div>

    <div id="iframe-container">
      <iframe frameborder="0" src="https://itch.io/embed-upload/10641495?color=333333" allowfullscreen="" width="640" height="460">
        <a href="https://otama-studiosports.itch.io">Play Wack-A-Pac on itch.io</a>
      </iframe>
    </div>

    <div class="grid-container">
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10641495?color=333333">Pacman 3D</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10658301?color=333333">Wack-A-Pac</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10641495?color=333333">Pacman 3D</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10658301?color=333333">Wack-A-Pac</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10641495?color=333333">Pacman 3D</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10658301?color=333333">Wack-A-Pac</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10641495?color=333333">Pacman 3D</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10658301?color=333333">Wack-A-Pac</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10641495?color=333333">Pacman 3D</h2>
          </div>
          <div class="grid-item">
            <h2 class="trigger" src-target="https://itch.io/embed-upload/10658301?color=333333">Wack-A-Pac</h2>
          </div>
    </div>
</body> 
`;

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("trigger")) {
    const src = event.target.getAttribute("src-target");
    const iframeContainer = document.getElementById("iframe-container");
    const iframe = iframeContainer.querySelector("iframe");
    iframe.src = src;
  }
});
