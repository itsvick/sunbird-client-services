import {Container} from 'inversify';
import {HttpClient} from './core/http-service/implementation/http-client-adapters/http-client';
import {HttpClientCordovaAdapter} from './core/http-service/implementation/http-client-adapters/http-client-cordova-adapter';
import {HttpClientBrowserAdapter} from './core/http-service/implementation/http-client-adapters/http-client-browser-adapter';
import {ScClassRoomService} from './services/class-room';
import {CsHttpService} from './core/http-service/interface/cs-http-service';
import {CsHttpServiceImpl} from './core/http-service/implementation/cs-http-service-impl';
import {ScClassRoomServiceImpl} from './services/class-room/implementation/sc-class-room-service-impl';

export const InjectionTokens = {
    CONTAINER: Symbol.for('CONTAINER'),
    core: {
        HTTP_ADAPTER: Symbol.for('HTTP_ADAPTER'),
        global: {
            headers: {
                CHANNEL_ID: Symbol.for('CHANNEL_ID'),
                PRODUCER_ID: Symbol.for('PRODUCER_ID'),
                DEVICE_ID: Symbol.for('DEVICE_ID'),
            }
        },
        api: {
            HOST: Symbol.for('HOST'),
            authentication: {
                USER_TOKEN: Symbol.for('USER_TOKEN'),
                BEARER_TOKEN: Symbol.for('BEARER_TOKEN'),
            }
        },
        HTTP_SERVICE: Symbol.for('HTTP_SERVICE'),
    },
    services: {
        CLASS_ROOM_SERVICE: Symbol.for('CLASS_ROOM_SERVICE')
    }
};

export interface CsConfig {
    core: {
        httpAdapter: 'cordova' | 'browser';
        api: {
            host: string;
            authentication: {
                userToken: string;
                bearerToken: string;
            };
        };
    };
}

class CsModule {
    private static _instance?: CsModule;

    public static get instance(): CsModule {
        if (!CsModule._instance) {
            CsModule._instance = new CsModule();
        }

        return CsModule._instance;
    }

    private _container: Container;

    private _isInitialised = false;

    get isInitialised(): boolean {
        return this._isInitialised;
    }

    get classRoomService(): ScClassRoomService {
        return this._container.get<ScClassRoomService>(InjectionTokens.services.CLASS_ROOM_SERVICE);
    }

    public async init(config: CsConfig) {
        this._container.bind<Container>(InjectionTokens.CONTAINER).toConstantValue(this._container = new Container());

        if (config.core.httpAdapter === 'cordova') {
            this._container.bind<HttpClient>(InjectionTokens.core.api.authentication.BEARER_TOKEN)
                .to(HttpClientCordovaAdapter).inRequestScope();
        } else {
            this._container.bind<HttpClient>(InjectionTokens.core.api.authentication.BEARER_TOKEN)
                .to(HttpClientBrowserAdapter).inRequestScope();
        }

        console.assert(!!config.core.api.authentication.bearerToken);
        this._container.bind<string>(InjectionTokens.core.api.authentication.BEARER_TOKEN)
            .toConstantValue(config.core.api.authentication.bearerToken);
        console.assert(!!config.core.api.authentication.userToken);
        this._container.bind<string>(InjectionTokens.core.api.authentication.USER_TOKEN)
            .toConstantValue(config.core.api.authentication.userToken);

        this._container.bind<CsHttpService>(InjectionTokens.core.HTTP_SERVICE)
            .to(CsHttpServiceImpl).inRequestScope();

        this._container.bind<ScClassRoomService>(InjectionTokens.services.CLASS_ROOM_SERVICE)
            .to(ScClassRoomServiceImpl).inRequestScope();

        this._isInitialised = true;
    }
}
