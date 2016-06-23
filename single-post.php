<?php get_header(); ?>
	<div id="pagewrap" class="single-post">
		<?php
		if( have_posts() ): while ( have_posts() ) : the_post(); 
			$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
		?>
		
		
	    <div class="intro">
	        <h1>Innouveau Coverstory</h1>
	        <h2><?php the_title(); ?></h2>
	        <img src="<?php echo $image[0]; ?>">
	    </div>
	
	    <div class="article">
	        <h3></h3>
	        <div class="content">
	            <?php the_content(); ?>
	        </div>
	    </div>
    </div>

    <a id="header-square" href="http://innouveau.nl/" target="_self"></a>
    
    <?php endwhile;endif; ?> 
    


<?php get_footer(); ?>
