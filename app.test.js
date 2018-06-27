const request = require('supertest');
const app = require('./src/app');
const data = require('./src/app');


//testing homepage
describe('homepage works', () => {
    test('should show index.html', () => {
        return request(app)
        .get("/")
        .set('content-type', 'text/html');
    });

    test('should contain "An Unordered HTML List"', async () => {
        const response = await request(app)
        .get("/")
        expect(/An Unordered HTML List/);
    });
});

//testing contact page
describe('contact page works', () => {
    test('the correct page should be working', async () => {
        const response = await request(app)
        .get("/contact")
        .expect(200);
    });
    
    test('should display "This is the contact page"', async () => {
        const response = await request(app)
        .get("/contact")
        expect(/This is the contact page/);
    });
});

//testing profile/name page
describe('profile/name page works', () => {
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

//testing status/name page
describe('/status/name page works', () => {
    test('should be able to access', () => {
        return request(app)
        .get('/status/name')
        .expect(200)
        .then(res => {
            expect(res.statusCode).toEqual(200);
        });
    });

    test('should direct to URL with appropriate name', async () => {
        await request(app)
        .get('/status/kate')
        .expect(200)
    });

    test('should not direct to invalid URL', async () => {
        await request(app)
        .get('/status/kate/id')
        .expect(404)
    });

    test('data should appear', async () => {
        await request(app)
        .get("/status/name")
        expect.objectContaining({data});
    });
});
