(function () {
  const levelTap = document.querySelectorAll('.tapname');

  levelTap.forEach(function(el) {
    el.addEventListener('click', function() {
      const selectedTap = document.querySelector('.selected-tap');
      const selectedContent = document.querySelectorAll('.selected-content');
      const content = document.querySelectorAll('.content');

      selectedTap.classList.remove('selected-tap');
      selectedContent.forEach(function(content) {
        content.classList.remove('selected-content');
      });

      el.classList.add('selected-tap');

      const selectedLevel = el.getAttribute('value');
      content.forEach(function(node) {
        if(node.getAttribute('value') === selectedLevel) {
          node.classList.add('selected-content');
        } else if (selectedLevel === 'all') {
          node.classList.add('selected-content');
        }
      });
    });
  });
})();

