        // Aukeratutako taula erakutsiko du eta besteak ezkutatu
        function erakutsiTaula(kategoria) {
            const taulak = document.querySelectorAll('.taula');
            taulak.forEach(taula => {
                taula.style.display = 'none'; 
            });
            document.getElementById(kategoria).style.display = 'block';

            datuakKargatu(kategoria);

        }

        function datuakKargatu(kategoria){
            switch (kategoria){
            case 'deskontu_kodeak':
                deskontuKodeakIkusi();
                break;
            case 'erabiltzaileak':
                erabiltzaileakIkusi();
                break;
            case 'eskaerak':
                eskaerakIkusi();
                break;
                default:
            }
        }










        
        async function eskaerakIkusi(){
            await fetch("http://localhost/ariketak/2Erronka/Controlador/EskaerakIkusi.php")
                .then(response => response.json())
                .then(data => {
                    document.getElementById('emaitzaEskaerak').innerHTML = "";
                    guztira=0;
                    data.forEach(item => {
                        prezioa=item.prezioa-(item.prezioa*item.beherapena)/100;
                        guztira+=prezioa;
                        console.log(item);
                        ilara = `
                            
                        `;
                        console.log(ilara);
                        document.getElementById('emaitzaEskaerak').innerHTML+= ilara;
                    })
                })
        }