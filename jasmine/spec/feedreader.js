/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		 it('all urls defined', function() {
			 //for each element in allFeeds
			 for(i=0;i<allFeeds.length;i++) {
				 //check that url is defined and exists
				 expect(allFeeds[i].url).toBeDefined();
				 expect(allFeeds[i].url.length).not.toBe(0);
			 }	
		});

		 it('all names defined', function() {
			 //for each element in allFeeds
			 for(i=0;i<allFeeds.length;i++) {
				 //check that name is defined and exists.
				 expect(allFeeds[i].name).toBeDefined();
				 expect(allFeeds[i].name.length).not.toBe(0);
			 }
		 });
    });

	describe('The Menu', function() {
		//grab the body element to test if has class later on
		var menuHidden = document.querySelector('body');
		//grab the menu-icon element to trigger clicks on later.
		var iconToggle = document.querySelector('.icon-list');

		it('hidden by default', function() {
			//check if the class menu-hidden is on the body element, 
			//and therefore if the menu is hidden on load.
			expect(menuHidden.classList.contains('menu-hidden')).toBe(true);
		});
		  
		it('menu changes on click', function() {
			//define the event to trigger on the icon that opens the menu
			var clickEvent = new MouseEvent("click", { "bubbles": true });
			//dispatch the event once and check if menu is visible
			iconToggle.dispatchEvent(clickEvent);
			expect(menuHidden.classList.contains('menu-hidden')).toBe(false);
			//dispatch the event a second time and check if menu is invisible
			iconToggle.dispatchEvent(clickEvent);
			expect(menuHidden.classList.contains('menu-hidden')).toBe(true);
		});
	});

	describe('Initial Entries', function() {
		//get the first element with class entry within the first container with the class feed
		var entry = document.querySelector('.feed .entry');
		
		//set up asynchronous checking
		 	beforeEach(function(done) {
				loadFeed(0, done);
			});
			
			it('check for at least one entry', function(done) {
				//check that the entry is defined
				expect(entry).toBeDefined();
				done(); //call done for asynchronous
			});
	});

	describe('New Feed Selection', function() {
		//to determine changes we have to have the initial state
		//we store it when the function loads.
		var beforeContainer = document.querySelector('.feed').innerHTML;
		var afterContainer;
		
		//set up asynchronous checking
		afterEach(function(done) {
			loadFeed(0, done);
		});

		 it('check for content change', function(done) {
			 //after the function loads we store the new state in a new variable
			 afterContainer = document.querySelector('.feed').innerHTML;
			 //by comparing the before and after state we can determine if there was a change.
			 expect(afterContainer).not.toBe(beforeContainer);
			 done(); //call done for asynchronous
		 });
	});
}());
