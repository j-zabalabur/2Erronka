       //cSaioa itxi eta Adminaren izena, abizena eta email-a erakutsi===========
       const izenaAdmin = document.getElementById('izen-abizenak');
       const emailAdmin = document.getElementById('email');
       const saioaItxiBtn = document.getElementById('saioaItxi');

       fetch("../Controlador/ErabiltzaileakIkusi.php")
        .then(response => response.json())
        .then(erabiltzaile => {
            for (let i = 0; i <  erabiltzaile.length; i++){
                if (localStorage.getItem('id') == erabiltzaile[i].id){
                    izenaAdmin.textContent = erabiltzaile[i].izena + " " + erabiltzaile[i].abizena;
                    emailAdmin.textContent = erabiltzaile[i].email;
                }
            }
        });

        saioaItxiBtn.onclick = () =>{
            localStorage.removeItem('id');
            localStorage.removeItem('saioaHasita');
            localStorage.removeItem('admin');
        }
       
       //====================PANEL BAKOITZAREN BISTARATZEA HASI=================================
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
        //====================PANEL BAKOITZAREN BISTARATZEA AMAITU=================================



        //==================================IKUSI FUNTZIONALITATEAK HASI=====================================
        async function deskontuKodeakIkusi(){
            await fetch("../Controlador/DeskontuKodeakIkusi.php")
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
        
        // Eskaera taulako datuen xehetasunak ezkutatu/erakusteko metodoa
        function toggleProductos(idEskaera) {
            const target = $("#" + idEskaera); 

            if (target.length) {
                target.slideToggle();
            }
        }

        
        async function eskaerakIkusi(){
            await fetch("../Controlador/EskaerakIkusi.php")
                .then(response => response.json())
                .then(data => {
                    document.getElementById('emaitzaEskaerak').innerHTML = "";
                    guztira=0;
                    id_eskaera=0;
                    data.forEach(item => {
                        prezioa=item.prezioa-(item.prezioa*item.beherapena)/100;
                        guztira+=prezioa;
                        //Eskari berria, taula hasieratu
                        if(id_eskaera===0){
                            id_eskaera=item.id_eskaera;
                            //Taularen burua inprimatu
                            eskaeraTaulaBurua(item, id_eskaera);

                            //Eskaria amaitu da, taula itxi
                        } else if (id_eskaera!=item.id_eskaera){
                            //Taula amaiera inprimatu
                            eskaeraTaulaAmaiera(id_eskaera, guztira);


                            id_eskaera=item.id_eskaera;
                            //Taularen burua inprimatu
                            eskaeraTaulaBurua(item, id_eskaera);
                            } 
                        
                        //Eskariko ilarak gehitu
                            ilara=`
                            <tr>
                                        <td>${item.izena}</td>
                                        <td>${item.eragina}</td>
                                        <td>${item.prezioa}</td>
                                        <td>${item.kopurua}</td>
                                        <td>${item.beherapena}</td>
                                        <td>${prezioa*item.kopurua}</td>
                            </tr>`;
                        document.getElementById('eskaeraLerroak'+id_eskaera).innerHTML+= ilara;
                        
                    })
                    eskaeraTaulaAmaiera(id_eskaera, guztira);

                })
        }


        async function erabiltzaileakIkusi(){
            await fetch("../Controlador/ErabiltzaileakIkusi.php")
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
                                    <button type='button' class='btn btn-info' onclick=erabiltzaileaAldatu('${item.id}')>Aldatu</button>
                                    <button type='button' class='btn btn-danger' onclick=erabiltzaileaEzabatu('${item.id}')>Ezabatu</button>
                                </td>
                            </tr>
                        `;
                        console.log(ilara);
                        document.getElementById('emaitzaErabiltzaileak').innerHTML+= ilara;
                    })
                })
        }
        //==================================IKUSI FUNTZIONALITATEEN AMAIERA=====================================

        //==================================ALDATU FUNTZIONALITATEEN HASIERA=====================================





        //==================================ALDATU FUNTZIONALITATEEN AMAIERA=====================================

        //===============================ESKAERA TAULA INPRIMATZEKO METODOAK HASI===============================
        //Taula hasiera
        function eskaeraTaulaBurua(item, id_eskaera){
            burua = `
            <tr>
                <td>${item.id_eskaera}</td>
                <td>${item.erab_izena}</td>
                <td>${item.abizena}</td>
                <td>${item.data}</td>
                <td>${item.egoera}</td>
                <td>
                    <button type='button' class='btn btn-info' onclick=aldatu('${item.kodea}')>Aldatu</button>
                    <button type='button' class='btn btn-danger' onclick=ezabatu('${item.kodea}')>Ezabatu</button>
                    <button type='button' class='btn btn-secondary' onclick="toggleProductos('${id_eskaera}')">Xehetasunak</button>
                </td>

            </tr>
            <tr class="sub-table" id="${id_eskaera}" style="display: none;">                                    
                <td colspan="6">
                    <table class="table table-sm table-active">
                        <thead class="thead-light">
                            <tr>
                                <th>Produktua</th>
                                <th>Marka</th>
                                <th>Prezioa</th>
                                <th>Kopurua</th>
                                <th>Beherapena</th>
                                <th>Azken prezioa</th>
                            </tr>
                        </thead>
                        <tbody id="eskaeraLerroak${id_eskaera}">
                            
                        </tbody>
                    </table>
                </td>
            </tr>
            `;
        document.getElementById('emaitzaEskaerak').innerHTML+= burua;


        }
        //Taula amaiera
        function eskaeraTaulaAmaiera(id_eskaera, guztira){
            amaiera = `
            <tr>
                <td colspan="5" style="text-align: right;"><strong>Prezioa guztira:</strong></td>
                <td>${guztira} €</td>
            </tr>`;
        document.getElementById('eskaeraLerroak'+id_eskaera).innerHTML+= amaiera;
        }
        //===============================ESKAERA TAULA INPRIMATZEKO METODOAK AMAITU===============================
