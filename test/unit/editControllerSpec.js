'use strict';

/* jasmine specs for controllers go here */
describe('PosManager ', function() {

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('posManager'));

    describe('EditController of Create', function(){
        var scope, ctrl, $httpBackend, location;


        beforeEach(inject(function(_$httpBackend_, $rootScope, $location, $route, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;

//            $httpBackend.whenPOST('/api/item/ITEM0002').respond('');

            scope = $rootScope.$new();
            location = $location;
            location.path('/create');
            ctrl = $controller('EditController', {$scope: scope});
        }));


        it('should know is now in creating mode', function() {
            expect(scope.item.id).toBe('ITEM0000');
        });

        it('should be able to save item', function () {
            $httpBackend.expectPOST('/api/item/ITEM0000');
            scope.saveIt();
        });

        it('should be able to add attribute', function () {
            scope.addAttr();
            expect(location.path()).toBe('/add_attribute/ITEM0000');
        });

        it('should be able to remove attribute', function () {
            scope.removeAttr();
            expect(location.path()).toBe('/remove_attribute/ITEM0000');
        });

        it('should be able to go back', function () {
            scope.cancel();
            expect(location.path()).toBe('/create');
        });

    });
});
