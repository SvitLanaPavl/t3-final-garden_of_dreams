
//Trying to animate scrolling 
window.addEventListener('scroll', setScrollVar);
window.addEventListener('resize', setScrollVar);
function setScrollVar() {
  const htmlElem = document.documentElement;
  const percentOfScreenHeightScroll = htmlElem.scrollTop / htmlElem.clientHeight;
  console.log(Math.min(percentOfScreenHeightScroll * 100, 100));
  htmlElem.style.setProperty("--scroll", Math.min(percentOfScreenHeightScroll * 100, 100))
};
setScrollVar();