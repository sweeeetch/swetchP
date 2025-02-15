import $ from "jquery";

// Initialize
$(document).ready(() => {
  const $cards = $("#video-gallery .ui-card"); // Targeting cards inside #video-gallery

  // Set active, prev, and next for initial styling
  const num = $cards.length;
  const odd = Math.ceil(num / 2);
  const even = num / 2;

  // Set active, prev, and next classes for visual purposes (optional, can be removed)
  if (num % 2 === 0) {
    $(`#video-gallery .ui-card:nth-child(${even})`).addClass("active");
    $(`#video-gallery .ui-card:nth-child(${even})`).prev().addClass("prev");
    $(`#video-gallery .ui-card:nth-child(${even})`).next().addClass("next");
  } else {
    $(`#video-gallery .ui-card:nth-child(${odd})`).addClass("active");
    $(`#video-gallery .ui-card:nth-child(${odd})`).prev().addClass("prev");
    $(`#video-gallery .ui-card:nth-child(${odd})`).next().addClass("next");
  }

  // Remove animations and autoplay logic
  // Simply display the cards, and no interactive behavior is added.
});
