'use strict';
$(function(){

	// Add new resource field
	$('#addField').on('click',function(e){
		e.preventDefault();
		var field = $('.field:last').clone()
		field.find('.field-data').val('');

		field.insertAfter('.field:last')
	})

	// on submit
	$('#newEndpoint').on('submit',function(e){
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

	//view resource fields
	$('.data').on('click',function(e){
		e.preventDefault();
		// $('.resources').stop().slideUp('fast');
		$(this).next().stop().slideToggle('fast');
	})


})