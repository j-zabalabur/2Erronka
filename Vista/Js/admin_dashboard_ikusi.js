
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
        case 'produktuak':
            produktuakIkusi();
            break;
            default:
        }
    }
    //====================PANEL BAKOITZAREN BISTARATZEA AMAITU=================================
//==================================IKUSI FUNTZIONALITATEAK HASI=====================================
async function produktuakIkusi(){
    await fetch("../Controlador/ProduktuakIkusi.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById('emaitzaProduktuak').innerHTML = "";
            data.forEach(item => {
                ilara = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.izena}</td>
                        <td>${item.prezioa} €</td>
                        <td>${item.eragina}</td>
                        <td>${item.beherapena} %</td>
                        <td>`
                        if(item.aktibo==1){
                            ilara +=`<button type='button' class='btn btn-warning' onclick="produktuEgoeraAldatu(${item.id}, ${item.aktibo})">Desaktibatu</button>`
                        } else {
                            ilara +=`<button type='button' class='btn btn-success' onclick="produktuEgoeraAldatu(${item.id}, '${item.egoera}')">Aktibatu</button>`
                        }
                        ilara+=`
                            <button type='button' class='btn btn-info' onclick=produktuakAldatu('${encodeURIComponent(JSON.stringify(item))}')>Aldatu</button>
                            <button type='button' class='btn btn-danger' onclick=produktuaEzabatu('${item.id}')>Ezabatu</button>
                            <button type='button' class='btn btn-secondary' onclick="toggleXehetasunak('${item.id}')">Xehetasunak</button>

                        </td>
                    </tr>

                    <tr class="sub-table" id="${item.id}" style="display: none;">                                    
                        <td colspan="6">
                            <table class="table table-sm table-active">
                                <thead class="thead-light">
                                    <tr>
                                        <td>${item.deskripzioa}</td>
                                    </tr>
                                </thead>
                            </table>
                        </td>
                    </tr>
                `;
                document.getElementById('emaitzaProduktuak').innerHTML+= ilara;
            })
        })
}





async function deskontuKodeakIkusi(){
    await fetch("../Controlador/DeskontuKodeakIkusi.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById('emaitzaDeskontuKodeak').innerHTML = "";
            data.forEach(item => {
                ilara = `
                    <tr>
                        <td>${item.kodea}</td>
                        <td>${item.deskontua} %</td>
                        <td>
                            <button type='button' class='btn btn-info' onclick=deskontuKodeaAldatu('${encodeURIComponent(JSON.stringify(item))}')>Aldatu</button>
                            <button type='button' class='btn btn-danger' onclick=deskontuKodeaEzabatu('${item.kodea}')>Ezabatu</button>
                        </td>
                    </tr>
                `;
                document.getElementById('emaitzaDeskontuKodeak').innerHTML+= ilara;
            })
        })
}

// Taulako datuen xehetasunak ezkutatu/erakusteko metodoa
function toggleXehetasunak(id) {
    const target = $("#" + id); 

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
                
                //Eskari berria, taula hasieratu
                if(id_eskaera===0){
                    id_eskaera=item.id_eskaera;
                    //Taularen burua inprimatu
                    eskaeraTaulaBurua(item, id_eskaera);

                    
                    //Eskaria amaitu da, taula itxi
                } else if (id_eskaera!=item.id_eskaera){
                    //Taula amaiera inprimatu
                    eskaeraTaulaAmaiera(id_eskaera, guztira);
                    prezioa=0;
                    guztira=0;
                    id_eskaera=item.id_eskaera;
                    //Taularen burua inprimatu
                    eskaeraTaulaBurua(item, id_eskaera);
                    } 
                    prezioa=(item.prezioa-(item.prezioa*item.beherapena)/100)*item.kopurua;
                    guztira+=prezioa;
                //Eskariko ilarak gehitu
                    ilara=`
                    <tr>
                                <td>${item.izena}</td>
                                <td>${item.eragina}</td>
                                <td>${item.prezioa} €</td>
                                <td>${item.kopurua}</td>
                                <td>${item.beherapena} %</td>
                                <td>${prezioa.toFixed(2)} €</td>
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
                if(localStorage.getItem('id') == item.id) {
                    
                    ilara +=`</td>
                    <td>${item.helbidea}</td>
                    <td>
                        <button type='button' class='btn btn-info' onclick=erabiltzaileakAldatu('${encodeURIComponent(JSON.stringify(item))}')>Aldatu</button>
                    </td>
                </tr>
            `;
            
                } else {        
                ilara +=`</td>
                        <td>${item.helbidea}</td>
                        <td>
                            <button type='button' class='btn btn-info' onclick=erabiltzaileakAldatu('${encodeURIComponent(JSON.stringify(item))}')>Aldatu</button>
                            <button type='button' class='btn btn-danger' onclick=erabiltzaileakEzabatu('${item.id}')>Ezabatu</button>
                        </td>
                    </tr>
                `;
                }
                document.getElementById('emaitzaErabiltzaileak').innerHTML+= ilara;
            })
        })
}
//==================================IKUSI FUNTZIONALITATEEN AMAIERA=====================================


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
            <button type='button' class='btn btn-info' onclick="eskaeraEgoeraAldatu(${item.id_eskaera}, '${item.egoera}')">Aldatu</button>
            <button type='button' class='btn btn-danger' onclick=eskaerakEzabatu('${item.id_eskaera}')>Ezabatu</button>
            <button type='button' class='btn btn-secondary' onclick="toggleXehetasunak('eskaera${id_eskaera}')">Xehetasunak</button>
        </td>

    </tr>
    <tr class="sub-table" id="eskaera${id_eskaera}" style="display: none;">                                    
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
        <td>${guztira.toFixed(2)} €</td>
    </tr>`;
document.getElementById('eskaeraLerroak'+id_eskaera).innerHTML+= amaiera;
}
//===============================ESKAERA TAULA INPRIMATZEKO METODOAK AMAITU===============================
