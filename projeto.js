
function ativaletra(elemento){
    const arrTexto = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    arrTexto.forEach((Letra, i)=>{
        setTimeout(()=>{
            elemento.innerHTML += Letra;
        }, 75 * i);        
    });
}

const titulo = document.querySelector('.digitando');

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (titulo && !reduzMovimento) {
    ativaletra(titulo);
}

if (!reduzMovimento && 'IntersectionObserver' in window) {
    document.body.classList.add('animacoes-ativas');

    const elementos = document.querySelectorAll(
        '.sobre_titulo, .sobre > img, .sobre_texto, .sobre_info, .titulo-secao, .habilidade, .projeto, .principio-conteudo, .contatos'
    );

    elementos.forEach((elemento, indice) => {
        elemento.classList.add('revelar');

        if (elemento.matches('.sobre > img, .sobre_texto')) {
            elemento.classList.add('revelar-lateral');
        }

        if (elemento.matches('.habilidade, .projeto')) {
            elemento.style.setProperty('--atraso', `${(indice % 3) * 80}ms`);
        }
    });

    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });

    elementos.forEach((elemento) => observador.observe(elemento));
}
