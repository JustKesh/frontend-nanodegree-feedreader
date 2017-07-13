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

    describe('RSS Feeds', function() {
        // Check if the allFeeds variable has been defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loop through allFeeds to make sure the URLs are valid, defined, and not empty
        it('have a defined URL and the URL is not empty', function() {
            allFeeds.forEach(function(i) {
                expect(i.url).toMatch(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
                expect(i.url).toBeDefined();
                expect(i.url).not.toBe('');
            });
        });

        // Loop through allFeeds to make sure the names are defined and not empty
        it('have a defined name and the name is not empty', function() {
            allFeeds.forEach(function(i) {
                expect(i.name).toBeDefined();
                expect(i.name).not.toBe('');
            });
        });
    });

    //New test suite named "The menu"
    describe('The menu', function() {

        // The menu element should be hidden by default
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // When the menu icon is clicked, the menu should toggle visibility
        it('changes visibility when the menu icon is clicked', function() {
            //Click the menu-icon and it should be visible
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            //Click the menu-icon again and the menu should no longer be visible
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    
    // New test suite named "Initial Entries"
    describe('Initial Entries', function() {

        // Call loadFeed() asynchronously, check if there is at least one entry in the .feed container
        beforeEach(function(done) {
            // wait for the asynchronous function to be complete before running the test
            loadFeed(0, function(){
                done();
            });
        });
    
        it('at least a single .entry element within the .feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
        
    });
    
    // New test suite named "New Feed Selection" 
    describe('New Feed Selection', function() {
        
        // Check if the content changes when you load a new feed
        var feedList1,
            feedList2;
        
        beforeEach(function(done) {
            // wait for the asynchronous function to be complete before running the test, nested call
            loadFeed(0, function(){
                feedList1 = $('.feed .entry').html();
                loadFeed(1, function(){
                    feedList2 = $('.feed .entry').html();
                    done();
                });
            });
            
            
        });
        
        it('when a new feed is loaded, the content changes', function(done){
            expect(feedList1).not.toEqual(feedList2);
            done();
        });
    });
}());
