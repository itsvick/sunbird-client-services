export interface Content {
    identifier: string;
    name: string;
    appIcon: string;
    description: string;
    pkgVersion: string;
    status: string;
    size: string;
    owner: string;
    creator: string;
    subject: string | string[];
    board: string;
    medium: string | string[];
    publisher: string;
    me_totalRatingsCount: number;
    me_averageRating: string;
    me_totalDownloads: string;
    copyright: string;
    copyrightYear: string;
    license: string;
    licenseDetails: LicenseDetails;
    expires: string;
    downloadUrl: string;
    variants: { [key: string]: any };
    artifactUrl: string;
    language: string[];
    gradeLevel: string[];
    osId: string;
    contentType: string;
    resourceType: string;
    mimeType: ContentMimeType;
    artifactMimeType: string;
    versionKey: string;
    contentEncoding: string;
    contentDisposition: string;
    contentTypesCount: string;
    lastPublishedOn: string;
    createdOn: string;
    createdBy: string;
    channel: string;
    screenshots: string[];
    audience: any;
    pragma: string[];
    attributions: string[];
    dialcodes: string[];
    childNodes: string[];
    previewUrl: string;
    framework: string;
    creators: string;
    contributors: string;
    streamingUrl: string;
    totalScore: any;
    children?: any[];
    altMsg?: AltMsg [];
    organisation?: string;
    author?: string;
    collaborators?: string;
    originData?: OriginData;
    origin?: string;
    totalQuestions?: number;
    itemSetPreviewUrl?: string;
    leafNodes?: string[];
    leafNodesCount?: number;
    primaryCategory?: string;
    trackable?: Trackable;
    userConsent?: UserConsent;
    additionalCategories?: string[];
    forumId?: string;
    se_boards?: string;
    se_mediums?: string | string[];
    se_gradeLevels?: string[];
    se_subjects?: string | string[];
}

export interface LicenseDetails {
    description: string;
    name: string;
    url: string;
}

export interface AltMsg {
    key: string;
    value: string;
    translations?: string;
}

export interface OriginData {
    name?: string;
    author?: string;
    license?: string;
    organisation?: string;
}

export enum TrackingEnabled {
    YES = 'Yes',
    NO = 'No'
}

export enum AutoBatch {
    YES = 'Yes',
    NO = 'No'
}

export enum UserConsent {
    YES = 'Yes',
    NO = 'No'
}

export interface Trackable {
    enabled: TrackingEnabled;
    autoBatch: AutoBatch;
}

export type ContentMimeType =
    'application/vnd.ekstep.ecml-archive' |
    'application/vnd.ekstep.html-archive' |
    'application/vnd.android.package-archive' |
    'application/vnd.ekstep.content-archive' |
    'application/vnd.ekstep.content-collection' |
    'application/vnd.ekstep.plugin-archive' |
    'application/vnd.ekstep.h5p-archive' |
    'application/vnd.sunbird.question' |
    'application/vnd.sunbird.questionset' |
    'application/epub' |
    'text/x-url' |
    'video/x-youtube' |
    'application/octet-stream' |
    'application/msword' |
    'application/pdf' |
    'image/jpeg' |
    'image/jpg' |
    'image/png' |
    'image/tiff' |
    'image/bmp' |
    'image/gif' |
    'image/svg+xml' |
    'video/avi' |
    'video/mpeg' |
    'video/quicktime' |
    'video/3gpp' |
    'video/mp4' |
    'video/ogg' |
    'video/webm' |
    'audio/mp3' |
    'audio/mp4' |
    'audio/mpeg' |
    'audio/ogg' |
    'audio/webm' |
    'audio/x-wav' |
    'audio/wav';

export enum MimeTypeCategory {
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
    INTERACTION = 'INTERACTION',
    DOC = 'DOC',
    ALL = 'ALL'
}

export class MimeTypeCategoryMapping {
    public static readonly [MimeTypeCategory.VIDEO]: ContentMimeType[] = [
        'video/avi',
        'video/mpeg',
        'video/quicktime',
        'video/3gpp',
        'video/mpeg',
        'video/mp4',
        'video/ogg',
        'video/webm',
        'video/x-youtube'
    ];
    public static readonly [MimeTypeCategory.AUDIO]: ContentMimeType[] = [
        'audio/mp3',
        'audio/mp4',
        'audio/mpeg',
        'audio/ogg',
        'audio/webm',
        'audio/x-wav',
        'audio/wav'
    ];
    public static readonly [MimeTypeCategory.INTERACTION]: ContentMimeType[] = [
        'application/vnd.ekstep.ecml-archive',
        'application/vnd.ekstep.html-archive',
        'application/vnd.ekstep.content-archive',
        'application/vnd.ekstep.h5p-archive'
    ];
    public static readonly [MimeTypeCategory.DOC]: ContentMimeType[] = [
        'application/pdf',
        'application/epub',
        'application/msword'
    ];
    public static readonly [MimeTypeCategory.ALL]: ContentMimeType[] = [
        'application/vnd.ekstep.ecml-archive',
        'application/vnd.ekstep.html-archive',
        'application/vnd.android.package-archive',
        'application/vnd.ekstep.content-archive',
        'application/vnd.ekstep.content-collection',
        'application/vnd.ekstep.plugin-archive',
        'application/vnd.ekstep.h5p-archive',
        'application/epub',
        'text/x-url',
        'video/x-youtube',
        'application/octet-stream',
        'application/msword',
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/tiff',
        'image/bmp',
        'image/gif',
        'image/svg+xml',
        'video/avi',
        'video/mpeg',
        'video/quicktime',
        'video/3gpp',
        'video/mpeg',
        'video/mp4',
        'video/ogg',
        'video/webm',
        'audio/mp3',
        'audio/mp4',
        'audio/mpeg',
        'audio/ogg',
        'audio/webm',
        'audio/x-wav',
        'audio/wav'
    ];
}
