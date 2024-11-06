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
                default:
            }
        }









        async function deskontuKodeakIkusi(){
            await fetch("http://localhost/ariketak/2Erronka/Controlador/DeskontuKodeakIkusi.php")
                .then(response => response.json())
                .then(data => {
                    document.getElementById('emaitzaDeskontuKodeak').innerHTML = "";
                    data.forEach(item => {
                        ilara = `
                            <tr>
                                <td>${item.kodea}</td>
                                <td>${item.deskontua}</td>
                                <td>
                                    <button type='button' class='btn btn-info' onclick=aldatu('${item.kodea}')>Aldatu</button>
                                    <button type='button' class='btn btn-danger' onclick=ezabatu('${item.kodea}')>Ezabatu</button>
                                </td>
                            </tr>
                        `;
                        console.log(ilara);
                        document.getElementById('emaitzaDeskontuKodeak').innerHTML+= ilara;
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