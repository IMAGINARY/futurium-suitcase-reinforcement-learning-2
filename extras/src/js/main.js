require('../sass/demo.scss');

function resize() {
  const scalables = [];
  $('.scale-fit').each((i, el) => {
    const $el = $(el);
    const $iframe = $(el).find('iframe');
    scalables.push({
      $el,
      $iframe,
      parentWidth: $el.parent().width(),
      width: $iframe.attr('width'),
      height: $iframe.attr('height'),
    });
  });

  // Find the scalable element that needs to be shrunk the most
  // to fit within its parent container
  const smallestScaleFactor = scalables.reduce((acc, scalable) => {
    const parentWidth = scalable.$el.parent().width();
    const scaleFactor = parentWidth / scalable.width;
    return Math.min(acc, scaleFactor);
  }, Number.POSITIVE_INFINITY);

  // Shrink the scalable elements by the smallest scale factor
  scalables.forEach((scalable) => {
    scalable.$el.css({
      width: `${scalable.width * smallestScaleFactor}px`,
      height: `${scalable.height * smallestScaleFactor}px`,
    });

    scalable.$iframe.css({
      transform: `scale(${smallestScaleFactor})`,
      transformOrigin: '0 0',
    });
  });
}

// Throttled resize event
let resizeTimeout;
$(window).on('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resize();
  }, 100);
});

resize();
