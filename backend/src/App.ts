import express, { Application } from 'express'
import morgan from 'morgan'
// Routes
import { indexRoute } from './apis/index.route'
import session from 'express-session'
import { createClient,  RedisClientType } from 'redis'
import {RedisStore} from 'connect-redis'
import {signUpRoute} from "./apis/sign-up/sign-up.route";
import {signInRoute} from "./apis/sign-in/sign-in.route";
import {gameRoute} from "./apis/game/game.route";
import {messageRoute} from "./apis/message/message.route";
import {meetUpRoute} from "./apis/meet-up/meet-up.route";
import {profileRoute} from "./apis/profile/profile.route";
import {favoriteRouter} from "./apis/favorite/favorite.route";
import {rsvpRoute} from "./apis/rsvp/rsvp.route";
import helmet from 'helmet'
import {imageRoute} from "./apis/image/image.route";

// The following class creates the app and instantiates the server
export class App {
    app: Application

    redisStore : RedisStore

    constructor ( private readonly redisClient: RedisClientType,
                  private readonly port?: number | string,
    ) {
        this.redisStore = new RedisStore({client: this.redisClient})
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    // private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
    public settings (): void {
        this.app.set('port', this.port)
    }

    // private method to setting up the middleware to handle json responses, one for dev and one for prod
    private middlewares (): void {

        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(session( {
            store: this.redisStore,
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET as string,
            resave: false
        }))
        this.app.use(helmet())
    }
    // private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
    private routes (): void {
        this.app.use(indexRoute.basePath, indexRoute.router)
        this.app.use(signUpRoute.basePath, signUpRoute.router)
        this.app.use(signInRoute.basePath, signInRoute.router)
        this.app.use(gameRoute.basePath, gameRoute.router)
        this.app.use(messageRoute.basePath, messageRoute.router)
        this.app.use(meetUpRoute.basePath, meetUpRoute.router)
        this.app.use(profileRoute.basePath, profileRoute.router)
        this.app.use(favoriteRouter.basePath, favoriteRouter.router)
        this.app.use (rsvpRoute.basePath, rsvpRoute.router)
        this.app.use (imageRoute.basePath, imageRoute.router)
    }

    // starts the server and tells the terminal to post a message that the server is running and on what port
    public async listen (): Promise<void> {
        await this.app.listen(4200)
        console.log('Express application built successfully')
    }
}