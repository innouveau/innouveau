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
                                <div class="panel">
                                    <h1 explain="Onze portfolio is een jukebox. Door stijlvolle CSS animaties gecoordineerd door javascript schuiven de afbeeldingen 1 voor 1 op hun plek.">Portfolio jukebox</h1>
                                    <div id="jukebox">
                                        <?php
                                        $counter = 0;
                                        
                                        if( have_posts() ): while ( have_posts() ) : the_post(); 
										
											$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
                                            $technieken = get_post_meta($post->ID, 'Gebruikte technieken', true);
											$opdrachtgever = get_post_meta($post->ID, 'Opdrachtgever', true);
                                            $vraag = get_post_meta($post->ID, 'Vraag', true);
                                            $antwoord = get_post_meta($post->ID, 'Antwoord', true);
                                            $link = get_post_meta($post->ID, 'Link', true);
											$extra_classes = '';
											$coverstory = false;
                                             
											if (has_category('coverstory')) {
												$coverstory = true;
												$extra_classes .= ' coverstory';
												$coverstory_link = get_post_meta($post->ID, 'Coverstory', true);
												if ($coverstory_link == '_self') {
													$coverstory_link = get_the_permalink();
												}
											}
                                             ?>
                                            <div class="jukebox-item jukebox-raster<?php echo $extra_classes; ?>" id="jukebox-item-<?php echo $counter; ?>" item="<?php echo $counter; ?>">
                                                <?php
                                                if ($image) { ?>
                                                <img class="jukebox-main-image" src="<?php echo $image[0]; ?>" />
                                                <?php 
                                            	}
												?>
                                                <div class="jukebox-text">
                                                   <div class="jukebox-text-header"><?php the_title(); ?></div>
                                                   <div class="jukebox-text-content"><?php the_excerpt(); ?></div>
                                                   <?php
                                                   		if ($coverstory) { ?>
                                                   			<a href="<?php echo $coverstory_link; ?>" target="_blank" class="coverstory-box">
                                                   				Dit is een coverstory, lees meer.
                                                   			</a>
                                                   		<?php }
                                                   ?>
                                                   <?php if ($link != "") { echo "
                                                   		<div class='jukebox-text-link'>
                                                   			<div class='jukebox-extra-semi'>
                                                   				<b>Bekijk website</b>
                                                   			</div>
                                                   			<div class='jukebox-extra-semi'>
                                                   				<a href='http://" . $link . "' target='_blank'>" . $link . "</a>
                                                   			</div>
                                                   		</div>"; } 
                                                   	?>
                                                   	<?php if ($opdrachtgever != "") { echo "
                                                   		<div class='jukebox-text-technieken'>
                                                   			<div class='jukebox-extra-semi'>
                                                   				<b>Opdrachtgever</b>
                                                   			</div>
                                                   			<div class='jukebox-extra-semi'>
                                                   				" . $opdrachtgever . "
                                                   			</div>
                                                   		</div>"; } 
                                                   	?>
                                                   	<?php if ($technieken != "") { echo "
                                                   		<div class='jukebox-text-technieken'>
                                                   			<div class='jukebox-extra-semi'>
                                                   				<b>Gebruikte technieken</b>
                                                   			</div>
                                                   			<div class='jukebox-extra-semi'>
                                                   				" . $technieken . "
                                                   			</div>
                                                   		</div>"; } 
                                                   	?>
                                                   <?php if ($vraag != "") { echo "
                                                   		<div class='jukebox-text-vraag'>
                                                   			<div class='jukebox-text-triangle'>
                                                   				<img src='" . get_stylesheet_directory_uri() . "/img/triangle.png'>
                                                   			</div>
                                                   			<b>Vraag</b><br><br>" . $vraag . "</div>"; } ?>
                                                   <?php if ($antwoord != "") { echo "
                                                   		<div class='jukebox-text-antwoord'>
                                                   			<div class='jukebox-text-triangle'>
                                                   				<img src='" . get_stylesheet_directory_uri() . "/img/triangle.png'>
                                                   			</div>
                                                   			<b>Vraag</b><br><br>" . $antwoord . "</div>"; } ?>
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
                    <?php include include("php/sides.php"); ?>
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




