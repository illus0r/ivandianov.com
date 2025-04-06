"use strict";

document.querySelectorAll(".dance-dance").forEach((header) => {
  // toggle class of a child element on mouse over
  let letters = header.querySelectorAll("span");

  // Init
  letters.forEach((letter) => {
    letter.style.fontStyle = Math.random() < 0.5 ? "normal" : "italic";
  });

  // Update
  letters.forEach((letter) => {
    letter.addEventListener("mouseover", () => {
      letter.style.fontStyle =
        letter.style.fontStyle == "italic" ? "normal" : "italic";
    });
  });
});
