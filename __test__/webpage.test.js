const request = require('supertest');
const app = require('../src/webpage');
const data = require('../src/webpage');

describe('homepage test', () => {
    test('should show index.html', () => {
        return request(app)
        .get("/")
        .set('content-type', 'text/html');
    });

    test('should contain "An Unordered HTML List"', () => {
        return request(app)
        .get("/")
        expect(/An Unordered HTML List/);
    });
});

describe('contact page test', () => {
    test('the correct page should be shown', () => {
        return request(app)
        .get("/contact")
        .expect(200);
    });
    
    test('should display "This is the contact page"', () => {
        return request(app)
        .get("/contact")
        expect(/This is the contact page/);
    });

    test('should throw an error message', () => {
        return request(app)
        .get("/contact/name")
        expect(/Error/);
    });
});

describe('profile/name test', () => {
    test('should be able to access', () => {
        return request(app)
        .get('/profile/name')
        .expect(200)
        .then(res => { 
            expect(res.statusCode).toEqual(200);
        });
    });

    test('should return error', () => {
        request(app)
        .get('/profile/name/error')
        .expect(404)
        .end(function(err,res) {
            if (err) throw err;
        });
    });
});

describe('status/name test', () => {
    test('should be able to access', () => {
        return request(app)
        .get('/status/name')
        .expect(200)
        .then(res => {
            expect(res.statusCode).toEqual(200);
        });
    });

    test('should be invalid URL', () => {
        return request(app)
        .get('/status/kate/id')
        .expect(404);
    });

    test('personal data should appear', () => {
        return request(app)
        .get("/status/name")
        expect.objectContaining({data});
    });
});
