<?php get_header(); ?>
<?php get_sidebar(); ?>
	<?php
		if( have_posts() ): while ( have_posts() ) : the_post(); ?>
			<h1><?php the_title(); ?></h1>
		
	<?php endwhile;endif; ?>	

<?php get_footer(); ?>
