<?php get_header(); ?>
    <div id="header">
        <div id="header-square">&nbsp;</div>
        <div id="header-title">
            <span explain="Deze titel wordt bij het wisselen van pagina telkens mooi afgebroken en weer opgebouwd." id="header-title-inn">Innouveau</span>
            <span id="header-title-section"><?php the_title(); ?></span>
        </div>
    </div>

	<div id="pagewrap">
		<div id="content">
		    <div id="content-cube-wrap" explain="De hele website is een kubus! D.m.v. Ajax worden al meteen 4 pagina's ingeladen en geplaats op elke zijde van de kubus. Javascript ism css zorgen voor de draaiingen. Druk op de menuknoppen voor het effect.<br><br>Wil je de kubus van binnen bekijken? Druk dan linksboven op het gele vlak (Als je nog een keer drukt gaat de kubus weer dicht).">
		      <div id="content-cube">
    		        <div class="content-cube-front-side content-cube-side page-<?php the_title(); ?>">
    		            <img class="loading-gif" src="<?php echo get_stylesheet_directory_uri(); ?>/img/loading.gif">
    		            <div id="new-content-front">
                    		<?php
                            if( have_posts() ): while ( have_posts() ) : the_post(); 
                            $this_link = get_permalink();
                                if ( is_page() && $post->post_parent ) {
                                    $parent_link = get_the_permalink($post->post_parent);
                                    $parent_title = get_the_title($post->post_parent);
                			        echo "<div class='back-to'>Terug naar <a class='rotate cube' href='" . $parent_link . "' target ='_self'>" . $parent_title . "</a></div>";
                			    }    
                			    $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
                			    if($image) { ?>
                				    <div id="main-image">
                				        <img src="<?php echo $image[0]; ?>" />
                				    </div>
                				 <?php } 
                				 the_content();                  				
                		         endwhile;
                		     endif; 
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
    include("php/arrayBuilder.php");
    get_footer(); 
?>
