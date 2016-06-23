<?php get_header(); ?>
    <div id="header">
        <div id="header-square">&nbsp;</div>
        <div id="header-title">
            <span explain="Deze titel wordt bij het wisselen van pagina telkens mooi afgebroken en weer opgebouwd." id="header-title-inn">Innouveau</span>
            <span id="header-title-section">404</span>
        </div>
    </div>

    <div id="pagewrap">
        <div id="content">
            <div id="content-cube-wrap" explain="De hele website is een kubus! D.m.v. Ajax worden al meteen 4 pagina's ingeladen en geplaats op elke zijde van de kubus. Javascript ism css zorgen voor de draaiingen. Druk op de menuknoppen voor het effect.<br><br>Wil je de kubus van binnen bekijken? Druk dan linksboven op het gele vlak (Als je nog een keer drukt gaat de kubus weer dicht).">
              <div id="content-cube">
                    <div class="content-cube-front-side content-cube-side">
                        <div id="new-content-front" class="panel">
                           Looks like you lost your way...<br>
                           Go <a href='<?php echo home_url() ?>' target ='_self'>home</a>.

                        </div>  
                    </div>
                </div>
            </div>
        </div>
        <!-- end of content -->
        
            
    </div>
    <!-- end of pagewrap --->




<?php 
    get_footer(); 
?>
