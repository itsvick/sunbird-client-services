import {Container} from 'inversify';
import {HttpClient} from './core/http-service/implementation/http-client-adapters/http-client';
import {HttpClientCordovaAdapter} from './core/http-service/implementation/http-client-adapters/http-client-cordova-adapter';
import {HttpClientBrowserAdapter} from './core/http-service/implementation/http-client-adapters/http-client-browser-adapter';
import {CsHttpService} from './core/http-service/interface';
import {HttpServiceImpl} from './core/http-service/implementation/http-service-impl';
import {GroupServiceImpl} from './services/group/implementation/group-service-impl';
import {CsGroupService} from './services/group/interface';
import {CsContentService} from './services/content/interface';
import {ContentServiceImpl} from './services/content/implementation/content-service-impl';
import {InjectionTokens} from './injection-tokens';
import {CsFrameworkService} from './services/framework/interface';
import {FrameworkServiceImpl} from './services/framework/implementation/framework-service-impl';
import {CsLocationService} from './services/location/interface';
import {LocationServiceImpl} from './services/location/implementation/location-service-impl';
import {CsCourseService} from './services/course/interface';
import {CourseServiceImpl} from './services/course/implementation/course-service-impl';
import {CsUserService} from './services/user/interface';
import {UserServiceImpl} from './services/user/implementation/user-service-impl';
import {CsGroupActivityService} from './services/group/activity/interface';
import {GroupActivityServiceImpl} from './services/group/activity/implementation/group-activity-service-impl';
import {CsFormService} from './services/form/interface/cs-form-service';
import {FormServiceImpl} from './services/form/implementation/form-service-impl';
import {CsSystemSettingsService} from './services/system-settings/interface';
import {SystemSettingsServiceImpl} from './services/system-settings/implementation/system-settings-service-impl';
import {CsClientStorage} from './core/cs-client-storage';
import { CsDiscussionService } from './services/discussion';
import { DiscussionServiceImpl } from './services/discussion/implementation/discussion-service-impl';

export interface CsDiscussionServiceConfig {
    apiPath: string;
}

export interface CsSystemSettingsServiceConfig {
    apiPath: string;
}

export interface CsUserServiceConfig {
    apiPath: string;
}

export interface CsGroupServiceConfig {
    apiPath: string;
    dataApiPath: string;
    updateGroupGuidelinesApiPath?: string;
}

export interface CsContentServiceConfig {
    hierarchyApiPath: string;
    questionListApiPath: string;
    apiPath: string;
}

// export interface CsContentSearchServiceConfig {
//     apiPath: string;
// }

export interface CsFrameworkServiceConfig {
    apiPath: string;
}

export interface CsLocationServiceConfig {
    apiPath: string;
}

export interface CsCourseServiceConfig {
    apiPath: string;
    certRegistrationApiPath?: string;
}

export interface CsFormServiceConfig {
    apiPath: string;
}

export interface CsConfig {
    core: {
        httpAdapter?: 'HttpClientBrowserAdapter' | 'HttpClientCordovaAdapter';
        global: {
            channelId?: string;
            producerId?: string;
            deviceId?: string;
            sessionId?: string;
            appVersion?: string;
        },
        api: {
            host: string;
            authentication: {
                userToken?: string;
                managedUserToken?: string;
                bearerToken?: string;
            };
        };
    };
    services: {
        userServiceConfig?: CsUserServiceConfig,
        groupServiceConfig?: CsGroupServiceConfig,
        frameworkServiceConfig?: CsFrameworkServiceConfig,
        locationServiceConfig?: CsLocationServiceConfig,
        courseServiceConfig?: CsCourseServiceConfig,
        formServiceConfig?: CsFormServiceConfig,
        systemSettingsServiceConfig?: CsSystemSettingsServiceConfig,
        discussionServiceConfig?: CsDiscussionServiceConfig,
        contentServiceConfig?: CsContentServiceConfig,
        // contentSearchServiceConfig?: CsContentSearchServiceConfig
    };
}

export class CsModule {
    private _container: Container;
    private onUpdateConfigCallback?: () => void;

    // tslint:disable-next-line:member-ordering
    static _instance?: CsModule;

    public static get instance(): CsModule {
        if (!CsModule._instance) {
            CsModule._instance = new CsModule();
        }

        return CsModule._instance;
    }

    private _isInitialised = false;

    get isInitialised(): boolean {
        return this._isInitialised;
    }

    private _config: CsConfig;

    get config(): CsConfig {
        return this._config;
    }

    get httpService(): CsHttpService {
        return this._container.get<CsHttpService>(InjectionTokens.core.HTTP_SERVICE);
    }

    get groupService(): CsGroupService {
        return this._container.get<CsGroupService>(InjectionTokens.services.group.GROUP_SERVICE);
    }

    get contentService(): CsContentService {
        return this._container.get<CsContentService>(InjectionTokens.services.content.CONTENT_SERVICE);
    }

    get frameworkService(): CsFrameworkService {
        return this._container.get<CsFrameworkService>(InjectionTokens.services.framework.FRAMEWORK_SERVICE);
    }

    get locationService(): CsLocationService {
        return this._container.get<CsLocationService>(InjectionTokens.services.location.LOCATION_SERVICE);
    }

    get courseService(): CsCourseService {
        return this._container.get<CsCourseService>(InjectionTokens.services.course.COURSE_SERVICE);
    }

    get userService(): CsUserService {
        return this._container.get<CsUserService>(InjectionTokens.services.user.USER_SERVICE);
    }

    get formService(): CsFormService {
        return this._container.get<CsFormService>(InjectionTokens.services.form.FORM_SERVICE);
    }

    get systemSettingsService(): CsSystemSettingsService {
        return this._container.get<CsSystemSettingsService>(InjectionTokens.services.systemSettings.SYSTEM_SETTINGS_SERVICE);
    }

    get discussionService(): CsDiscussionService {
        return this._container.get<CsDiscussionService>(InjectionTokens.services.discussion.DISCUSSION_SERVICE);
    }

    public async init(config: CsConfig, onConfigUpdate?: () => void, clientStorage?: CsClientStorage) {
        if (onConfigUpdate) {
            this.onUpdateConfigCallback = onConfigUpdate;
        }

        this._config = config;

        this._container = new Container();

        this._container.bind<Container>(InjectionTokens.CONTAINER).toConstantValue(this._container);

        this.updateConfig(config);

        this._isInitialised = true;

        if (clientStorage) {
            this._container.bind<CsClientStorage>(InjectionTokens.core.CLIENT_STORAGE).toConstantValue(clientStorage);
        }

        this.httpService.init();
    }

    updateConfig(config: CsConfig) {
        this._config = config;

        const mode: 'rebind' | 'bind' = this._isInitialised ? 'rebind' : 'bind';

        if (config.core.httpAdapter === 'HttpClientCordovaAdapter') {
            this._container[mode]<HttpClient>(InjectionTokens.core.HTTP_ADAPTER)
                .to(HttpClientCordovaAdapter).inSingletonScope();
        } else {
            this._container[mode]<HttpClient>(InjectionTokens.core.HTTP_ADAPTER)
                .to(HttpClientBrowserAdapter).inSingletonScope();
        }

        this._container[mode]<string>(InjectionTokens.core.api.HOST)
            .toConstantValue(config.core.api.host);
        this._container[mode]<string | undefined>(InjectionTokens.core.global.CHANNEL_ID)
            .toConstantValue(config.core.global.channelId);
        this._container[mode]<string | undefined>(InjectionTokens.core.global.PRODUCER_ID)
            .toConstantValue(config.core.global.producerId);
        this._container[mode]<string | undefined>(InjectionTokens.core.global.DEVICE_ID)
            .toConstantValue(config.core.global.deviceId);
        this._container[mode]<string | undefined>(InjectionTokens.core.global.SESSION_ID)
            .toConstantValue(config.core.global.sessionId);
        this._container[mode]<string | undefined>(InjectionTokens.core.global.APP_VERSION)
            .toConstantValue(config.core.global.appVersion);
        this._container[mode]<string | undefined>(InjectionTokens.core.api.authentication.BEARER_TOKEN)
            .toConstantValue(config.core.api.authentication.bearerToken);
        this._container[mode]<string | undefined>(InjectionTokens.core.api.authentication.USER_TOKEN)
            .toConstantValue(config.core.api.authentication.userToken);
        this._container[mode]<string | undefined>(InjectionTokens.core.api.authentication.MANAGED_USER_TOKEN)
            .toConstantValue(config.core.api.authentication.managedUserToken);

        // httpService
        this._container[mode]<CsHttpService>(InjectionTokens.core.HTTP_SERVICE)
            .to(HttpServiceImpl).inSingletonScope();

        // groupService
        this._container[mode]<CsGroupService>(InjectionTokens.services.group.GROUP_SERVICE)
            .to(GroupServiceImpl).inSingletonScope();
        this._container[mode]<CsGroupActivityService>(InjectionTokens.services.group.GROUP_ACTIVITY_SERVICE)
            .to(GroupActivityServiceImpl).inSingletonScope();
        if (config.services.groupServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.group.GROUP_SERVICE_API_PATH)
                .toConstantValue(config.services.groupServiceConfig.apiPath);
            this._container[mode]<string>(InjectionTokens.services.group.GROUP_SERVICE_DATA_API_PATH)
                .toConstantValue(config.services.groupServiceConfig.dataApiPath);
            if (config.services.groupServiceConfig.updateGroupGuidelinesApiPath) {
                this._container[mode]<string>(InjectionTokens.services.group.GROUP_SERVICE_UPDATE_GUIDELINES_API_PATH)
                    .toConstantValue(config.services.groupServiceConfig.updateGroupGuidelinesApiPath);
            }
        }

        // frameworkService
        this._container[mode]<CsFrameworkService>(InjectionTokens.services.framework.FRAMEWORK_SERVICE)
            .to(FrameworkServiceImpl).inSingletonScope();
        if (config.services.frameworkServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.framework.FRAMEWORK_SERVICE_API_PATH)
                .toConstantValue(config.services.frameworkServiceConfig.apiPath);
        }

        // locationService
        this._container[mode]<CsLocationService>(InjectionTokens.services.location.LOCATION_SERVICE)
            .to(LocationServiceImpl).inSingletonScope();
        if (config.services.locationServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.location.LOCATION_SERVICE_API_PATH)
                .toConstantValue(config.services.locationServiceConfig.apiPath);
        }

        // courseService
        this._container[mode]<CsCourseService>(InjectionTokens.services.course.COURSE_SERVICE)
            .to(CourseServiceImpl).inSingletonScope();
        if (config.services.courseServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.course.COURSE_SERVICE_API_PATH)
                .toConstantValue(config.services.courseServiceConfig.apiPath);
            if (config.services.courseServiceConfig.certRegistrationApiPath) {
                this._container[mode]<string>(InjectionTokens.services.course.COURSE_SERVICE_CERT_REGISTRATION_API_PATH)
                    .toConstantValue(config.services.courseServiceConfig.certRegistrationApiPath);
            }
        }

        // contentService
        this._container[mode]<CsContentService>(InjectionTokens.services.content.CONTENT_SERVICE)
            .to(ContentServiceImpl).inSingletonScope();
        if (config.services.contentServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.content.CONTENT_SERVICE_HIERARCHY_API_PATH)
                .toConstantValue(config.services.contentServiceConfig.hierarchyApiPath);
                this._container[mode]<string>(InjectionTokens.services.content.CONTENT_SERVICE_QUESTION_LIST_API_PATH)
                .toConstantValue(config.services.contentServiceConfig.questionListApiPath);
                this._container[mode]<string>(InjectionTokens.services.content.CONTENT_SERVICE_SEARCH)
                    .toConstantValue(config.services.contentServiceConfig.apiPath);
        }

        // userService
        this._container[mode]<CsUserService>(InjectionTokens.services.user.USER_SERVICE)
            .to(UserServiceImpl).inSingletonScope();
        if (config.services.userServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.user.USER_SERVICE_API_PATH)
                .toConstantValue(config.services.userServiceConfig.apiPath);
        }

        // formService
        this._container[mode]<CsFormService>(InjectionTokens.services.form.FORM_SERVICE)
            .to(FormServiceImpl).inSingletonScope();
        if (config.services.formServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.form.FORM_SERVICE_API_PATH)
                .toConstantValue(config.services.formServiceConfig.apiPath);
        }

        // systemSettings
        this._container[mode]<CsSystemSettingsService>(InjectionTokens.services.systemSettings.SYSTEM_SETTINGS_SERVICE)
          .to(SystemSettingsServiceImpl).inSingletonScope();
        if (config.services.systemSettingsServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.systemSettings.SYSTEM_SETTINGS_SERVICE_API_PATH)
              .toConstantValue(config.services.systemSettingsServiceConfig.apiPath);
        }

        if (mode === 'rebind' && this.onUpdateConfigCallback) {
            this.onUpdateConfigCallback();
        }

        // discussion service
        this._container[mode]<CsDiscussionService>(InjectionTokens.services.discussion.DISCUSSION_SERVICE)
            .to(DiscussionServiceImpl).inSingletonScope();
        if (config.services.discussionServiceConfig) {
            this._container[mode]<string>(InjectionTokens.services.discussion.DISCUSSION_SERVICE_API_PATH)
                .toConstantValue(config.services.discussionServiceConfig.apiPath);
        }
    }
}
