window.onscroll = function() {stickyHeader()};

  var header = document.querySelector(".header-main");
  var sticky = header.offsetTop;

  function stickyHeader() {
    if (window.pageYOffset > sticky) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  }