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
  /* RSS FEED TEST SUITE*/
  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('should have a defined URL and the URL is not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).toBeGreaterThan(0);
      });
    });


    it('should have a defined name and the name is not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).toBeGreaterThan(0);
      });
    });
  });


  /* THE MENU TEST SUITE */
  describe('The Menu', function() {
    var body, menuIcon;

    beforeEach(function() {
      body = document.body;
      menuIcon = document.querySelector('.menu-icon-link');
    });

    it('should be hidden by default.', function() {
      expect(body.className).toContain('menu-hidden');
    });

    it('should change visibility on click', function() {
      /* TODO: Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      menuIcon.click();
      expect(body.className).not.toContain('menu-hidden');

      menuIcon.click();
      expect(body.className).toContain('menu-hidden');
    });
  });


  /* Initial Entries TEST SUITE */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('should contain at least a single entry.', function(done) {
      var feedItems = document.querySelector('.feed')
          .getElementsByClassName('entry');
      expect(feedItems.length).toBeGreaterThan(0);
      done();
    });
  });

  /* New Feed Selection TEST SUITE */
  describe('New Feed Selection', function() {
    var prevFeedHTML;

    beforeEach(function(done) {
      loadFeed(0, function() {
        prevFeedHTML = document.querySelector('.feed').innerHTML;
        loadFeed(1, function() {
          done();
        });
      });
    });

    it('should change it\'s content.', function(done) {
      var newFeedHTML = document.querySelector('.feed').newFeedHTML;
      expect(newFeedHTML).not.toBe(prevFeedHTML);
      done();
    });

  });

}());
