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
    var scope, ctrl, $httpBackend;
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
        }
    ];

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $routeParams.page = 1;
      $httpBackend.expectGET('/api/item/page?page=1').respond(items);
        $httpBackend.expectGET('/api/item/count').respond(8);
      $httpBackend.expectGET('/backend/home/home.html').respond(null);


      scope = $rootScope.$new();
      ctrl = $controller('HomeController', {$scope: scope});
    }));


    it('should create "items" model with 2 items fetched from xhr', function() {
      expect(scope.items).toEqualData([]);
      $httpBackend.flush();

      expect(scope.items).toEqualData(items);
    });


    xit('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
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
