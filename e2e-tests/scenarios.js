describe('Test', function(){



it('should enter session Id', function(){

	browser.get("http://localhost:8000/");
	var input = element(by.model('homeVm.sessionId'));
	input.sendKeys("HJEFJK23");

});



});