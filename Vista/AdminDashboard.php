<?php
class AdminDashboard {

    public static function panelNagusia(){?>
        <div class="admin-panel">
        <aside class="sidebar">
            <!--TODO Los botones seran bootstrap y seguiran la estetica del global.css-->
            <button onclick="erakutsiTaula('produktuak')">Produktuak</button>
            <button onclick="erakutsiTaula('erabiltzaileak')">Erabiltzaileak</button>
            <button onclick="erakutsiTaula('eskariak')">Eskariak</button>
            <button onclick="erakutsiTaula('deskontu_kodeak')">Deskontu kodeak</button>
        </aside>

        <main class="taula_container">
            <section id="produktuak" class="taula">
                <h2>Produktuak</h2>
                <button>Erregistroa gehitu</button>
            </section>

            <section id="erabiltzaileak" class="taula">
                <h2>Kategoriak</h2>
                <p>Kategoriak kudeatzeko aukera...</p>
            </section>

            <section id="eskariak" class="taula">
                <h2>Erabiltzaileak</h2>
                <p>Erabiltzaile guztiak kudeatu...</p>
            </section>

            <section id="deskontu_kodeak" class="taula">
                <h2>Eskariak</h2>
                <p>Bezeroen eskariak kudeatu...</p>
            </section>

        </main>
    </div>
        <?php
    }

}
?>