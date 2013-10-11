describe("cordovaReady", function() {

    var _cordovaReady;

    beforeEach(module('matmar10Cordova'));

    beforeEach(inject(function(cordovaReady) {
        _cordovaReady = cordovaReady;
    }));

    it('should contain a cordovaReady', function() {
        expect(_cordovaReady).not.toBe(null);
    });

    it('should fire the provided callback with the specified arguments', function() {
        var expectedArgs = [1, 2, 3, 4, 5, 'a', 'b', 'c'];
        _cordovaReady(function() {
            expect(arguments.length).toBe(expectedArgs.length);
            expect(arguments).toBe(expectedArgs );
        }, expectedArgs);
    });
});
