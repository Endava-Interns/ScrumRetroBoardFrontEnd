describe('Test', function(){

beforeEach(function() {
	browser.get('/');
})

it('should open the user page', function(){

	//browser.get("/");
	browser.sleep(3000);

	browser.waitForAngular();
	var button = element(by.id('createSession'));
	button.click();
	browser.sleep(3000);
	browser.waitForAngular();
	expect(browser.getLocationAbsUrl()).toEqual("/user");

});

it('should create a session and add a user', function(){

	//browser.get("/");
	browser.sleep(3000);
	
	browser.waitForAngular();
	var button = element(by.id('createSession'));
	button.click();
	browser.sleep(3000);
	browser.waitForAngular();
	var input = element(by.id('username'));
	input.sendKeys('Simona');
	var joinButton = element(by.id('joinSession'));
	joinButton.click();
	browser.sleep(3000);
	browser.waitForAngular();
	expect(element(by.id('addStart')).isPresent()).toBe(true);

});

it('should join an existing session', function(){

	//browser.get("/");
	browser.sleep(3000);
	
	browser.waitForAngular();
	var inputSession = element(by.id('sessionId'));
	inputSession.sendKeys('testing123');
	var joinSessionBtn = element(by.id('enterSession'));
	joinSessionBtn.click();
	browser.sleep(3000);
	browser.waitForAngular();
	var input = element(by.id('username'));
	input.sendKeys('Simona1');
	var joinButton = element(by.id('joinSession'));
	joinButton.click();
	browser.sleep(3000);
	browser.waitForAngular();
	expect(element(by.id('addStart')).isPresent()).toBe(true);

});

it('should add user to active users', function(){

	//browser.get("/");
	browser.sleep(3000);
	
	browser.waitForAngular();
	var inputSession = element(by.id('sessionId'));
	inputSession.sendKeys('testing123');
	var joinSessionBtn = element(by.id('enterSession'));
	joinSessionBtn.click();
	browser.sleep(3000);
	browser.waitForAngular();
	var input = element(by.id('username'));
	input.sendKeys('Simona');
	var joinButton = element(by.id('joinSession'));
	joinButton.click();
	browser.sleep(3000);
	browser.waitForAngular();
	var user = element(by.id('Simona'));
	expect(user.isPresent()).toBe(true);

});

it('should not join a non-existing session', function(){

	//browser.get("http://localhost:8000/");
	browser.sleep(3000);
	
	browser.waitForAngular();
	var inputSession = element(by.id('sessionId'));
	inputSession.sendKeys('simonovaSesija');
	var joinSessionBtn = element(by.id('enterSession'));
	joinSessionBtn.click();
	browser.sleep(3000);
	browser.waitForAngular();
	var warning = element(by.id('warningSession')).isDisplayed();
	expect(warning).toBe(true);

});


it('should add an anonymous user on empty username input', function(){

	//browser.get("http://localhost:8000/");
	browser.sleep(3000);
	
	browser.waitForAngular();
	var inputSession = element(by.id('sessionId'));
	inputSession.sendKeys('testing123');
	var joinSessionBtn = element(by.id('enterSession'));
	joinSessionBtn.click();
	browser.sleep(3000);
	browser.waitForAngular();
	var input = element(by.id('username'));
	input.sendKeys('');
	var joinButton = element(by.id('joinSession'));
	joinButton.click();
	browser.sleep(3000);
	browser.waitForAngular();
	browser.sleep(4000);
	var user = element(by.id('Anonymous'));
	expect(user.isPresent()).toBe(true);

});

});