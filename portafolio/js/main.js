const flecha = document.querySelector('.scroll');
const main = document.querySelector('body');


flecha.addEventListener('click',mouseScroll);

const mouseScroll = ()=> {
    let scrolear = window.scroll({
        top:100,
        left:800,
    behavior:"smooth"
})
return scrolear;
}
