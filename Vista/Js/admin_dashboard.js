        // Aukeratutako taula erakutsiko du eta besteak ezkutatu
        function erakutsiTaula(kategoria) {
            const taulak = document.querySelectorAll('.taula');
            taulak.forEach(taula => {
                taula.style.display = 'none'; 
            });
            document.getElementById(kategoria).style.display = 'block';
        }

        // Hasieran "Produktuak" taula erakutsiko du
        document.addEventListener('DOMContentLoaded', function() {
            erakutsiTaula('produktuak');
        });