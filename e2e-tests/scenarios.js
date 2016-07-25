describe('Test', function () {

	beforeEach(function () {
		browser.get('/');
	});

	it('should open the user page', function () {

		//browser.get("/");
		browser.sleep(3000);
		var button = element(by.id('createSession'));
		button.click().then(function () {
			browser.sleep(3000);
			expect(browser.getLocationAbsUrl()).toEqual("/user");
		});
	});

	it('should create a session and add a user', function () {

		//browser.get("/");
		browser.sleep(3000);
		var button = element(by.id('createSession'));
		button.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('Simona');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(3000);
		expect(element(by.id('addStart')).isPresent()).toBe(true);

	});

	it('should join an existing session', function () {

		//browser.get("/");
		browser.sleep(3000);
		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('Simona1');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(3000);
		expect(element(by.id('addStart')).isPresent()).toBe(true);

	});

	it('should add user to active users', function () {

		//browser.get("/");
		browser.sleep(3000);
		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('Simona');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(3000);
		var user = element(by.id('Simona'));
		expect(user.isPresent()).toBe(true);

	});

	it('should not join a non-existing session', function () {

		//browser.get("http://localhost:8000/");
		browser.sleep(3000);
		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('simonovaSesija');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var warning = element(by.id('warningSession')).isDisplayed();
		expect(warning).toBe(true);

	});


	it('should add an anonymous user on empty username input', function () {

		//browser.get("http://localhost:8000/");
		browser.sleep(3000);
		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(4000);
		var user = element(by.id('Anonymous'));
		expect(user.isPresent()).toBe(true);

	});

	it('should add a start message', function(){

		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(4000);
		var startButton = element(by.id('addStart'));
		startButton.click();
		browser.sleep(3000);
		var msgInput = element(by.id('msgTextStart'));
		msgInput.sendKeys('Hello');
		var sendBtn = element(by.id('saveStart'));
		sendBtn.click();
		browser.sleep(4000);
		var elm = element.all(by.repeater('startMessage in sessionVm.startMessages')).last().getText();
		expect(elm).toEqual('Hello - (Anonymous)');
	});

	it('should edit a start message', function(){

		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(4000);
		var startButton = element(by.id('addStart'));
		startButton.click();
		browser.sleep(3000);
		var msgInput = element(by.id('msgTextStart'));
		msgInput.sendKeys('Hello');
		var sendBtn = element(by.id('saveStart'));
		sendBtn.click();
		browser.sleep(4000);
		element.all(by.repeater('startMessage in sessionVm.startMessages')).last().click();
		browser.sleep(2000);
		var text = element(by.id('textModify'));
		text.clear();
		text.sendKeys('Hello test edited');
		var saveChanges = element(by.id('saveModify'));
		saveChanges.click();
		browser.sleep(4000);
		var elm = element.all(by.repeater('startMessage in sessionVm.startMessages')).last().getText();
		expect(elm).toEqual('Hello test edited - (Anonymous)');
	});

	it('should add a stop message', function(){

		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(4000);
		var startButton = element(by.id('addStop'));
		startButton.click();
		browser.sleep(3000);
		var msgInput = element(by.id('msgTextStop'));
		msgInput.sendKeys('Hello');
		var sendBtn = element(by.id('saveStop'));
		sendBtn.click();
		browser.sleep(4000);
		var elm = element.all(by.repeater('stopMessage in sessionVm.stopMessages')).last().getText();
		expect(elm).toEqual('Hello - (Anonymous)');
	});

	it('should edit a stop message', function(){

		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(4000);
		var startButton = element(by.id('addStop'));
		startButton.click();
		browser.sleep(3000);
		var msgInput = element(by.id('msgTextStop'));
		msgInput.sendKeys('Hello');
		var sendBtn = element(by.id('saveStop'));
		sendBtn.click();
		browser.sleep(4000);
		element.all(by.repeater('stopMessage in sessionVm.stopMessages')).last().click();
		browser.sleep(2000);
		var text = element(by.id('textModify'));
		text.clear();
		text.sendKeys('Hello test edited');
		var saveChanges = element(by.id('saveModify'));
		saveChanges.click();
		browser.sleep(4000);
		var elm = element.all(by.repeater('stopMessage in sessionVm.stopMessages')).last().getText();
		expect(elm).toEqual('Hello test edited - (Anonymous)');
	});

	it('should add a continue message', function(){

		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(4000);
		var startButton = element(by.id('addContinue'));
		startButton.click();
		browser.sleep(3000);
		var msgInput = element(by.id('msgTextContinue'));
		msgInput.sendKeys('Hello');
		var sendBtn = element(by.id('saveContinue'));
		sendBtn.click();
		browser.sleep(4000);
		var elm = element.all(by.repeater('continueMessage in sessionVm.continueMessages')).last().getText();
		expect(elm).toEqual('Hello - (Anonymous)');
	});

	it('should edit a continue message', function(){

		var inputSession = element(by.id('sessionId'));
		inputSession.sendKeys('testing123');
		var joinSessionBtn = element(by.id('enterSession'));
		joinSessionBtn.click();
		browser.sleep(3000);
		var input = element(by.id('username'));
		input.sendKeys('');
		var joinButton = element(by.id('joinSession'));
		joinButton.click();
		browser.sleep(4000);
		var startButton = element(by.id('addContinue'));
		startButton.click();
		browser.sleep(3000);
		var msgInput = element(by.id('msgTextContinue'));
		msgInput.sendKeys('Hello');
		var sendBtn = element(by.id('saveContinue'));
		sendBtn.click();
		browser.sleep(4000);
		element.all(by.repeater('continueMessage in sessionVm.continueMessages')).last().click();
		browser.sleep(2000);
		var text = element(by.id('textModify'));
		text.clear();
		text.sendKeys('Hello test edited');
		var saveChanges = element(by.id('saveModify'));
		saveChanges.click();
		browser.sleep(4000);
		var elm = element.all(by.repeater('continueMessage in sessionVm.continueMessages')).last().getText();
		expect(elm).toEqual('Hello test edited - (Anonymous)');
	});

});