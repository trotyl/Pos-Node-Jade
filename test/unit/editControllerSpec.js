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

    describe('EditController of Editing', function(){
        var scope, ctrl, $httpBackend, location;
        var item = {
            id: 'ITEM0001',
            name: '可乐',
            unit: '瓶',
            price: 3,
            type: '饮料',
            amount: 100,
            attrs: [
                {
                    name: '属性A',
                    val: '值A',
                    birth: null
                },
                {
                    name: '属性B',
                    val: '值B',
                    birth: null
                }
            ],
            birth: new Date
        }

        beforeEach(inject(function(_$httpBackend_, $rootScope, $location, $route, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;

            $httpBackend.whenGET('/backend/edit/edit.html').respond('');
            $httpBackend.expectGET('/api/item/ITEM0001').respond(item);

            scope = $rootScope.$new();
            location = $location;
            location.path('/detail/ITEM0001');
            ctrl = $controller('EditController', {$scope: scope, $routeParams: { itemId: 'ITEM0001'}});
        }));


        it('should know is now in editing mode', function() {
            $httpBackend.flush();
            expect(scope.item.id).toBe('ITEM0001');
        });

        it('should be able to save item', function () {
            $httpBackend.expectPOST('/api/item/ITEM0001');
            scope.saveIt();
        });

        it('should be able to add attribute', function () {
            $httpBackend.flush();
            scope.addAttr();
            expect(location.path()).toBe('/add_attribute/ITEM0001');
        });

        it('should be able to remove attribute', function () {
            $httpBackend.flush();
            scope.removeAttr();
            expect(location.path()).toBe('/remove_attribute/ITEM0001');
        });

        it('should be able to go back', function () {
            $httpBackend.flush();
            scope.cancel();
            expect(location.path()).toBe('/edit/ITEM0001');
        });

    });
});
