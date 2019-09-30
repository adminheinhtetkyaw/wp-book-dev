(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 */

	jQuery(function(){
		jQuery('.wp-book-select2').select2({
			width: '100%'
		});

		load_material();

		jQuery('#generate_book').click(function(){
			var btn_val = jQuery('#generate_book').val();
			jQuery('#generate_book').addClass('disabled');
			jQuery('#generate_book').val( 'Please Wait...' );
			jQuery('.download_book').hide();
			var data = {
				action : 'generate_book',
				security: wp_book_object.ajax_nonce,
				material : jQuery('#wp-book-form').serializeArray(),
			}
			jQuery.post(wp_book_object.ajaxurl, data, function(response) {
				if( response.result == 'success' ){
					jQuery('.download_book').show();
					jQuery('.download_book').attr( 'href', response.upload_url );
				}else{
					jQuery('.download_book').hide();
				}
				show_notice( response.message, response.notice_class, true );
				jQuery('#generate_book').val( btn_val );
				jQuery('#generate_book').removeClass('disabled');
			});
		});
	});

})( jQuery );

function load_material(){
	jQuery('.wp-book-pdf-material-stage').html('Please wait...');
	jQuery('.download_book').hide();
	var data = {
		action : 'load_posts_for_print',
		security: wp_book_object.ajax_nonce,
		post_type : jQuery('.filter-post-type').val(),
		posts_per_page : jQuery('.filter-post-number').val(),
		order : jQuery('.filter-post-order').val(),
		order_by : jQuery('.filter-post-order-by').val(),
	}

	jQuery.post(wp_book_object.ajaxurl, data, function(response) {
		jQuery('.wp-book-pdf-material-stage').html('');
		jQuery(response).each(function( id, post ){
			
			var material_node = '<div class="material-node"><h2>'+post.post_title+'</h2>';
			material_node += '<input type="hidden" name="material" value="'+post.ID+'" />';
			material_node += '<div>';

			jQuery('.wp-book-pdf-material-stage').append( material_node );
		});
		jQuery('.wp-book-pdf-material-stage').sortable();
	});
}

function show_notice( message, type, dismissible ){
	if ( dismissible ){
		var dismissible_class = "is-dismissible";
	}
	var output = '<div class="notice '+type+' '+dismissible_class+'">';
	output += '<p>'+message+'</p>';
    output += '</div>';
	jQuery('.wp-book-form-wrapper').prepend( output )
}