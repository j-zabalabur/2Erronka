document.querySelector('header').addEventListener('scroll', function(){
    if(window.scrollY > 15){
        document.querySelector('header').classList.add('scroll')
    }else{
        document.querySelector('header').classList.remove('scroll')
    }
})