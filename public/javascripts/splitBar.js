/* eslint-disable no-undef */

let curXposForHorizontalSplitbar;

$('.horizontal-split-bar').mousedown(function (e) {
  e.preventDefault();

  $(document).mousemove(function (e) {
    e.preventDefault();
    curXposForHorizontalSplitbar = e.pageX;

    $('.info-section').css("width", curXposForHorizontalSplitbar);
    $('.run-section').css("width", $(document).width() - curXposForHorizontalSplitbar);
  });
});

$(document).mouseup(function (e) {
  $(document).unbind('mousemove');
});
