<script type="text/javascript">
<?php
$parent_link = get_the_permalink($post->post_parent);
$parent_title = get_the_title($post->post_parent);
$args = array(
    'sort_order' => 'ASC',
    'sort_column' => 'post_title',
    'hierarchical' => 1,
    'exclude' => '',
    'include' => '',
    'meta_key' => '',
    'meta_value' => '',
    'authors' => '',
    'child_of' => 0,
    'parent' => -1,
    'exclude_tree' => '',
    'number' => '',
    'offset' => 0,
    'post_type' => 'page',
    'post_status' => 'publish'
); 
?>
// pages [parentUrl, url, title]
<?php
$js_pages = "var pages = [";
$pages = get_pages($args);
foreach ( $pages as $page ) {
    if ($js_pages != "var pages = [") {
        $js_pages .= ",";
    }
    if ($page->post_parent != 0) {
        $parent = get_page_link( $page->post_parent );
    } else {
        $parent = get_page_link( $page->ID ); 
    }
    $js_pages .= "{parent: '" . $parent . "', url: '" . get_page_link( $page->ID ) . "', title: '" .$page->post_title . "'}";
}
$js_pages .= ",{parent: 'http://innouveau.nl/category/portfolio/', url: 'http://innouveau.nl/category/portfolio/', title: 'Portfolio'}";
$js_pages .= "];";
echo $js_pages;

if ($pageType == "Portfolio") {
   $this_link = "http://innouveau.nl/category/portfolio/";
   $parent_link = "http://innouveau.nl/category/portfolio/";
   $parent_title = "Portfolio";
}


?>
var p = 0,
	sides = [{
				name: "right", 
				rotation: -90
			}, {
				name: "back", 
				rotation: -180
			}, {
				name: "left", 
				rotation: 90
			}],
	menuPages = [{
				parent: '<?php echo $parent_link; ?>', 
				side: 'front', 
				title: '<?php echo $parent_title; ?>', 
				rotation: 0, 
				url: '<?php echo $this_link; ?>'
				}];

$("#menu .menu-item a").each(function() {
    var link = $(this).attr("href");
    if (link != '<?php echo $parent_link ?>') {
        var side = sides[p].name,
         	title = $(this).find('.href-title').html(),
        	rotation = sides[p].rotation,
        	page = {
	        	parent: link, 
	        	side: side, 
	        	title: title, 
	        	rotation: rotation, 
	        	url: link
	        };
        menuPages.push(page);
        p++;
    }
});
</script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/animations.js" type="text/javascript"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/titleBuilder.js" type="text/javascript"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/loader.js" type="text/javascript"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/jukebox.js" type="text/javascript"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/scrambleSlider.js" type="text/javascript"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/scrollfinder.js" type="text/javascript"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/js/main.js" type="text/javascript"></script>
