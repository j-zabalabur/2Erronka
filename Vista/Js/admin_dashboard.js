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
        async function erabiltzaileakIkusi(){
            await fetch("http://localhost/ariketak/2Erronka/Controlador/ErabiltzaileakIkusi.php")
                .then(response => response.json())
                .then(data => {
                    document.getElementById('emaitzaErabiltzaileak').innerHTML = "";
                    data.forEach(item => {
                        ilara = `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.email}</td>
                                <td>${item.izena}</td>
                                <td>${item.abizena}</td>
                                <td>`

                        //Administratzailea da? TinyInt-etik Bai/Ez-era
                        if (item.administratzailea==1){
                            ilara += `Bai`
                        } else {
                            ilara += `Ez`
                        }
                                
                        ilara +=`</td>
                                <td>${item.helbidea}</td>
                                <td>
                                    <button type='button' class='btn btn-info' onclick=aldatu('${item.id}')>Aldatu</button>
                                    <button type='button' class='btn btn-danger' onclick=ezabatu('${item.id}')>Ezabatu</button>
                                </td>
                            </tr>
                        `;
                        console.log(ilara);
                        document.getElementById('emaitzaErabiltzaileak').innerHTML+= ilara;
                    })
                })
        }