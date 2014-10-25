'use strict';

/* jasmine specs for controllers go here */
describe('PosManager HomeController', function() {

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('posManager'));

    describe('HomeController', function(){
        var scope, ctrl, $httpBackend, location;
        var items = [
            {
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
                        time: null
                    },
                    {
                        name: '属性B',
                        val: '值B',
                        time: null
                    }
                ],
                birth: null
            },
            {
                id: 'ITEM0002',
                name: '雪碧',
                unit: '瓶',
                price: 3,
                type: '饮料',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0003',
                name: '苹果',
                unit: '斤',
                price: 5.5,
                type: '水果',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0004',
                name: '荔枝',
                unit: '斤',
                price: 15,
                type: '水果',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0005',
                name: '雪碧',
                unit: '瓶',
                price: 3,
                type: '饮料',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0006',
                name: '电池',
                unit: '个',
                price: 2,
                type: '生活用品',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0007',
                name: '方便面',
                unit: '袋',
                price: 4.5,
                type: '视频',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0008',
                name: '占位符1',
                unit: '瓶',
                price: 3,
                type: '饮料',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0009',
                name: '占位符2',
                unit: '瓶',
                price: 3,
                type: '饮料',
                amount: 100,
                attrs: [],
                birth: null
            },
            {
                id: 'ITEM0010',
                name: '占位符3',
                unit: '瓶',
                price: 3,
                type: '饮料',
                amount: 100,
                attrs: [],
                birth: null
            }
        ];

        beforeEach(inject(function(_$httpBackend_, $rootScope, $location, $route, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $routeParams.page = 1;
            $httpBackend.whenGET('/api/item/page?page=1').respond(items);
            $httpBackend.whenGET('/api/item/count').respond(angular.toJson([1, 2]));
            $httpBackend.whenGET('/backend/home/home.html').respond('');
            $httpBackend.whenDELETE('/api/item/ITEM0001').respond('');


            scope = $rootScope.$new();
            location = $location;
            ctrl = $controller('HomeController', {$scope: scope});
        }));


        it('should create "items" model with 2 items fetched from xhr', function() {
            expect(scope.items).toEqualData([]);
            $httpBackend.flush();

            expect(scope.items).toEqualData(items);
        });

        it('should know the infomation of current page', function () {
            expect(scope.currentPage).toEqualData({
                isFirst: true,
                isLast: false
            })
        });

        it('should get the total pages number right', function () {
            expect(scope.pages.length).toEqualData(0);
            $httpBackend.flush();

            expect(scope.pages.length).toEqualData(2);
        });

        it('should be able to go to the creating page', function () {
            scope.goToCreate();
            expect(location.path() === '/create');
        });

        it('should be able to go to the detail page', function () {
            scope.goToDetail('ITEM0001');
            expect(location.path() === '/detail/ITEM0001');
        });

        it('should be able to load different page', function () {
            scope.loadPage(2);
            expect(location.path() === '/list/2');
        });

        it('should be able to delete item', function () {
            $httpBackend.flush();

            _(items).remove(function (item) {
                return item.id === 'ITEM0001';
            });
            $httpBackend.whenGET('/api/item/page?page=1').respond(items);

            scope.deleteIt('ITEM0001');
            $httpBackend.flush();
            expect(scope.items.length).toBe(9);
        });

        it('should be able to alter amount', function () {
            $httpBackend.flush();

            var item = _(items).find({ id: 'ITEM0002' });
            item.amount -= 1;

            scope.alterAmount('ITEM0002', null, -1);
            expect(scope.items[0].amount).toBe(99);
        });
    });


  xdescribe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzPhoneData = function() {
          return {
            name: 'phone xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData({});
      $httpBackend.flush();

      expect(scope.phone).toEqualData(xyzPhoneData());
    });
  });
});
