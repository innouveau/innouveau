<?php get_header(); ?>
    <div id="header">
        <div id="header-square">&nbsp;</div>
        <div id="header-title">
            <span explain="Deze titel wordt bij het wisselen van pagina telkens mooi afgebroken en weer opgebouwd." id="header-title-inn">Innouveau</span>
            <span id="header-title-section">Portfolio</span>
        </div>
    </div>

    <div id="pagewrap">
        <div id="content">
            <div id="content-cube-wrap" explain="De hele website is een kubus! D.m.v. Ajax worden al meteen 4 pagina's ingeladen en geplaats op elke zijde van de kubus. Javascript ism css zorgen voor de draaiingen. Druk op de menuknoppen voor het effect.<br><br>Wil je de kubus van binnen bekijken? Druk dan linksboven op het gele vlak (Als je nog een keer drukt gaat de kubus weer dicht).">
              <div id="content-cube">
                    <div class="content-cube-front-side content-cube-side">
                        <img class="loading-gif" src="<?php echo get_stylesheet_directory_uri(); ?>/img/loading.gif">
                        <div id="new-content-front">
                        <?php
                            if(is_category("Portfolio")) { ?>
                                <div id="portfolio-container">
                                    <div id="portfolio-wrapper">
                                            <?php
                                            $counter = 0;
                                            
                                            if( have_posts() ): while ( have_posts() ) : the_post(); 
                                                $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
                                                $technieken = get_post_meta($post->ID, 'Gebruikte technieken', true);
                                                $vraag = get_post_meta($post->ID, 'Vraag', true);
                                                $antwoord = get_post_meta($post->ID, 'Antwoord', true);
                                                $link = get_post_meta($post->ID, 'Link', true);
                                                
                                                ?>
                                                <div id="portfolio-item-<?php echo $counter; ?>" item="<?php echo $counter; ?>" class="portfolio-item" style="background-image: url('<?php echo image; ?>');">
                                                    <div class="portfolio-image"></div>
                                                    <div class="portfolio-item-label">
                                                        <div class="portfolio-item-label-sticker">
                                                            MLV Castor
                                                        </div>
                                                    </div>
                                                    <div class="portfolio-item-right-side"></div>
                                                    <div class="portfolio-shadow"></div>
                                                    <div class="portfolio-text">
                                                       <?php if ($link != "") { echo "<div class='jukebox-text-link'><b>Bekijk website</b><br><a href='http://" . $link . "' target='_blank'>" . $link . "</a></div>"; } ?>
                                                       <?php if ($technieken != "") { echo "<div class='jukebox-text-technieken'><b>Gebruikte technieken</b><br>" . $technieken . "</div>"; } ?>
                                                       <?php if ($vraag != "") { echo "<div class='jukebox-text-vraag'><div class='jukebox-text-triangle'><img src='" . get_stylesheet_directory_uri() . "/img/triangle.png'></div><b>Vraag</b><br><br>" . $vraag . "</div>"; } ?>
                                                       <?php if ($antwoord != "") { echo "<div class='jukebox-text-antwoord'><div class='jukebox-text-triangle'><img src='" . get_stylesheet_directory_uri() . "/img/triangle.png'></div><b>Vraag</b><br><br>" . $antwoord . "</div>"; } ?>
                                                    </div>
                                                </div>
                                                <!-- end of case / item -->
                                            <?php 
                                            $counter++;
                                            endwhile;
                                            endif; ?>

                                    </div>
                                </div>
                                <!-- end of container -->
                            <?php
                            } 
                            
                            ?>    

                        </div>  
                    </div>
                    <?php include 'php/sides.php'; ?>
                </div>
            </div>
        </div>
        <!-- end of content -->
        
        <div id="menu">
            <?php get_sidebar(); ?>
        </div>
            
    </div>
    <!-- end of pagewrap --->

<?php 
    $pageType = "Portfolio"; 
    include("php/arrayBuilder.php");
    get_footer(); 
?>
<script src='js/jukebox2.js'></script>




