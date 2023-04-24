
import express, { Router } from 'express';
import supertest from 'supertest';


import * as eventsController from './events.controller';
jest.mock('./events.controller')

import eventsRouter from './events.routes';


function ok() {
    
}

describe('Events Routes', () => {

    const app = express();
    app.use( express.json() )
    app.use( express.urlencoded({ extended: true }))

    const router = Router()
    router.use(eventsRouter)


    afterEach(() => {
        // (eventsController as any).getEvent = getEvent;
        // (eventsController as any).getEvents = getEvents;
        // (eventsController as any).modifyEvent = modifyEvent;
        // (eventsController as any).newEvent = newEvent;
        // (eventsController as any).removeEvent = removeEvent;
    })

    describe('get /events', () => {
        it('should return status 200', () => {

            supertest(app)
                .get('/api/events')
                .expect('Content-Type', /json/)
                .expect(200)
                .end( (error, res) => { if (error) throw error } )
        })
        it('should call getEvents', () => {

            supertest(app)
                .get('/api/events')
                .end( (error, res) => { if (error) throw error } )
            expect(eventsController.getEvents).toHaveBeenCalled()
        })
        it('should return a list of events', () => {

        })
    })

    describe('post /events', () => {
        it('should return status 201', () => {

        })
        it('should validate with joi schema', () => {

        })
        it('should through a 400 BadRequest error', () => {

        })
        it('should call newEvent', () => {

        })
        it('should return the newly created record id', () => {

        })
    })

    describe('delete /events/:id', () => {
        it('should return status 204', () => {

        })
        it('should call removeEvent', () => {

        })
        it('should return undefined', () => {

        })
    })

    describe('put /events/:id', () => {
        it('should return status 200', () => {

        })
        it('should validate with joi schema', () => {

        })
        it('should throw a 400 BadRequest error', () => {

        })
        it('should call modifyEvent', () => {

        })
        it('should return undefined', () => {

        })
    })

    describe('get /events/:id', () => {
        it('should return status 200', () => {

        })
        it('should call getEvent', () => {

        })
        it('should return the event', () => {

        })
    })

})