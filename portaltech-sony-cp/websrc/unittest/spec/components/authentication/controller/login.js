//login.js
describe("Unit Testing User Login", function() {
  
  var authenticationControllerLogin;

  beforeEach(function () {
        module('authentication');
        inject(function ($controller,$injector) {
            authenticationControllerLogin = $controller('authenticationControllerLogin',{
            	OAuth:$injector.get("OAuth"),
            	$state:$injector.get("$state")
            });
        });
    });

  it('should have a authenticationControllerLogin controller', function() {
    expect(authenticationControllerLogin).toBeDefined();

      // test cases - testing for success
      var validEmails = [
        'testuser1@test.co.uk',
        'testuser1@test.com',
        'test734ltylytkliytkryety9ef@jb-fe.com'
      ];

      // test cases - testing for failure
      var invalidEmails = [
        'test@testuser1@testcouk',
        'test user1@test.com',
        'testuser1@test.com.co.',
        'tes@t@test.com',
        ''
      ];

      // we loop through arrays of test cases
      for (var i in validEmails) {
        var valid = oauth2Initialisation.isValidEmail(validEmails[i]);
         expect(valid).toBe(valid);
      }
      for (var i in invalidEmails) {
        var valid = oauth2Initialisation.isValidEmail(invalidEmails[i]);
        expect(valid).not.toBe(valid);
      }

    }])
});
