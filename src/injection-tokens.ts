export const InjectionTokens = {
    CONTAINER: Symbol.for('CONTAINER'),
    core: {
        HTTP_ADAPTER: Symbol.for('HTTP_ADAPTER'),
        global: {
            CHANNEL_ID: Symbol.for('CHANNEL_ID'),
            PRODUCER_ID: Symbol.for('PRODUCER_ID'),
            DEVICE_ID: Symbol.for('DEVICE_ID'),
            SESSION_ID: Symbol.for('SESSION_ID'),
            APP_VERSION: Symbol.for('APP_VERSION'),
        },
        api: {
            HOST: Symbol.for('HOST'),
            authentication: {
                USER_TOKEN: Symbol.for('USER_TOKEN'),
                MANAGED_USER_TOKEN: Symbol.for('MANAGED_USER_TOKEN'),
                BEARER_TOKEN: Symbol.for('BEARER_TOKEN'),
            }
        },
        HTTP_SERVICE: Symbol.for('HTTP_SERVICE'),
        CLIENT_STORAGE: Symbol.for('CLIENT_STORAGE'),
    },
    services: {
        user: {
            USER_SERVICE_API_PATH: Symbol.for('USER_SERVICE_API_PATH'),
            USER_SERVICE: Symbol.for('USER_SERVICE')
        },
        content: {
            CONTENT_SERVICE_HIERARCHY_API_PATH: Symbol.for('CONTENT_SERVICE_HIERARCHY_API_PATH'),
            CONTENT_SERVICE_QUESTION_LIST_API_PATH: Symbol.for('CONTENT_SERVICE_QUESTION_LIST_API_PATH'),
            CONTENT_SERVICE: Symbol.for('CONTENT_SERVICE'),
            CONTENT_SERVICE_SEARCH: Symbol.for('CONTENT_SERVICE_SEARCH_API_PATH')
        },
        group: {
            GROUP_SERVICE_API_PATH: Symbol.for('GROUP_SERVICE_API_PATH'),
            GROUP_SERVICE_DATA_API_PATH: Symbol.for('GROUP_SERVICE_DATA_API_PATH'),
            GROUP_SERVICE: Symbol.for('GROUP_SERVICE'),
            GROUP_ACTIVITY_SERVICE: Symbol.for('GROUP_ACTIVITY_SERVICE'),
            GROUP_SERVICE_UPDATE_GUIDELINES_API_PATH: Symbol.for('GROUP_SERVICE_UPDATE_GUIDELINES_API_PATH'),
        },
        framework: {
            FRAMEWORK_SERVICE_API_PATH: Symbol.for('FRAMEWORK_SERVICE_API_PATH'),
            FRAMEWORK_SERVICE: Symbol.for('FRAMEWORK_SERVICE')
        },
        location: {
            LOCATION_SERVICE_API_PATH: Symbol.for('LOCATION_SERVICE_API_PATH'),
            LOCATION_SERVICE: Symbol.for('LOCATION_SERVICE')
        },
        course: {
            COURSE_SERVICE_API_PATH: Symbol.for('COURSE_SERVICE_API_PATH'),
            COURSE_SERVICE_CERT_REGISTRATION_API_PATH: Symbol.for('COURSE_SERVICE_CERT_REGISTRATION_API_PATH'),
            COURSE_SERVICE: Symbol.for('COURSE_SERVICE')
        },
        form: {
            FORM_SERVICE_API_PATH: Symbol.for('FORM_SERVICE_API_PATH'),
            FORM_SERVICE: Symbol.for('FORM_SERVICE')
        },
        systemSettings: {
            SYSTEM_SETTINGS_SERVICE_API_PATH: Symbol.for('SYSTEM_SETTINGS_SERVICE_API_PATH'),
            SYSTEM_SETTINGS_SERVICE: Symbol.for('SYSTEM_SETTINGS_SERVICE')
        },
        discussion: {
            DISCUSSION_SERVICE_API_PATH: Symbol.for('DISCUSSION_SERVICE_API_PATH'),
            DISCUSSION_SERVICE: Symbol.for('DISCUSSION_SERVICE')
        }
    }
};
