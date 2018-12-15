import { Router } from 'express';
import * as winston from 'winston';

import { guard } from '../middleware/guard';

export abstract class BaseRoute {

    private readonly _registeredMethodEnding = 'Action';
    router: Router;
    logger: any;
    guard: any;

    constructor() {
        this.guard = guard;
        this.logger = winston;
        this.onInit();
        this.router = Router();
        this.initRoutes();
    }

    public getRoutes(): Router {
        return this.router
    }

    getRouterMethodNames(obj): Set<string> {
        let methods = new Set();
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj);
            keys.forEach((key) => {
                let keyString = key.toString(); 
                let searchString = this._registeredMethodEnding;
                let position = keyString.length - searchString.length;
                if (keyString.indexOf(searchString, position) !== -1) {
                    methods.add(key);
                }
            });
        }
        return methods;
    }

    protected onInit(): void {}

    private initRoutes(): void {
        const methods = this.getRouterMethodNames(this);
        [...methods].map((method) => {
            this[method](this.router);
        });
    }
}

