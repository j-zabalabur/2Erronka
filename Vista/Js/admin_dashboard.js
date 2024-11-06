        // Aukeratutako taula erakutsiko du eta besteak ezkutatu
        function erakutsiTaula(kategoria) {
            const taulak = document.querySelectorAll('.taula');
            taulak.forEach(taula => {
                taula.style.display = 'none'; 
            });
            document.getElementById(kategoria).style.display = 'block';

            deskontuKodeakIkusi();

        }

        async function deskontuKodeakIkusi(){
            await fetch("http://localhost/2Erronka/Controlador/DeskontuKodeakIkusi.php")
                .then(response => response.json())
                .then(data => {
                    document.getElementById('emaitzaDeskontuKodeak').innerHTML = "";
                    data.forEach(item => {
                        ilara = `
                            <tr>
                                <td>${data.kodea}</td>
                                <td>${data.deskontua}</td>
                                <td>
                                    <button type='button' class='btn btn-success' onclick=aldatu('${data.kodea}')>Aldatu</button>
                                    <button type='button' class='btn btn-danger' onclick=ezabatu('${data.kodea}')>Ezabatu</button>
                                </td>
                            </tr>
                        `;
                        console.log(ilara);
                        document.getElementById('emaitzaDeskontuKodeak').innerHTML+= ilara;
                    })
                })
        }