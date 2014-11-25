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

    describe('AddAttributeController of Creating', function(){
        var scope, ctrl, $httpBackend, location;


        beforeEach(inject(function(_$httpBackend_, $rootScope, $location, $route, $routeParams, $controller) {

            localStorage.tmp = JSON.stringify({ id: 'ITEM0000', attrs: []});

            $httpBackend = _$httpBackend_;

//            $httpBackend.whenPOST('/api/item/ITEM0002').respond('');

            scope = $rootScope.$new();
            location = $location;
            location.path('/add_attribute/ITEM0000');
            ctrl = $controller('AddAttributeController', {$scope: scope, $routeParams: { itemId: 'ITEM0000'}});
        }));

        it('should know is now in creating mode', function() {
            expect(scope.isNew).toBe(true);
        });

        it('should be able to go home', function () {
            scope.goHome();
            expect(location.path()).toBe('/');
        });

        it('should be able to go back', function () {
            scope.goBack();
            expect(location.path()).toBe('/create');
        });

        it('should be able to save attribute', function () {
            scope.attr = {
                name: 'Trotyl',
                val: 'HeHe'
            };
            scope.saveIt();
            expect(JSON.parse(localStorage.tmp).attrs.length).toBe(1);
        });

    });

    describe('AddAttributeController of Editing', function(){
        var scope, ctrl, $httpBackend, location;


        beforeEach(inject(function(_$httpBackend_, $rootScope, $location, $route, $routeParams, $controller) {

            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET('/api/item/ITEM0001').respond({
                id: 'ITEM0001',
                attrs: []
            });
            $httpBackend.whenGET('/backend/addAttribute/addAttribute.html').respond('');

            scope = $rootScope.$new();
            location = $location;
            location.path('/add_attribute/ITEM0001');
            ctrl = $controller('AddAttributeController', {$scope: scope, $routeParams: { itemId: 'ITEM0001'}});
        }));

        it('should know is now in creating mode', function() {
            expect(scope.isNew).toBe(false);
        });

        it('should be able to go home', function () {
            scope.goHome();
            expect(location.path()).toBe('/');
        });

        it('should be able to go back', function () {
            $httpBackend.flush();
            scope.goBack();
            expect(location.path()).toBe('/detail/ITEM0001');
        });

        it('should be able to save attribute', function () {
            $httpBackend.flush();
            $httpBackend.expectPOST('/api/item/ITEM0001');
            scope.attr = {
                name: 'Trotyl',
                val: 'HeHe'
            };
            scope.saveIt();
        });

    });
});
