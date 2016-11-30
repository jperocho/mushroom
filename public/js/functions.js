'use strict';
$(function(){

	$('#addField').on('click',function(e){
		e.preventDefault();
		var seq = parseInt($('#fields .field:last').data('id'))
		var field = $('#fields .field:last').clone()
		field.attr('data-id',++seq);
		field.insertAfter('.field:last')
	})

	$('#newEndpoint').on('submit',function(e){

		// console.log();
		$.ajax({
		  type: 'POST',
		  data: $(this).serialize(),
		  dataType: 'json'
		})
		.done(function(res){
			console.log(res);
		})

		e.preventDefault();
	})


})