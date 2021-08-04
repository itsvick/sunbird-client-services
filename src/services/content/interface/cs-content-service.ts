import { Observable } from 'rxjs';
import { CsContentServiceConfig } from '../../../index';

export interface CsContentGetQuestionSetResponse {
}

export interface CsContentGetQuestionListResponse {
}

export interface CsContentGetQuestionSetHierarchyResponse {

}

export interface CsContentGetContentListResponse {

}

interface IFilters {
    channel: string;
    primaryCategory: string[];
    visibility: string[];
}

interface ISoftConstraints {
    badgeAssertions?: number;
    channel?: number;
}

export interface CsContentSearchRequest {
    filters: IFilters;
    query?: string;
    fields: string[];
    softConstraints: ISoftConstraints;
    mode: string;
    facets: string[];
}
export interface CsContentService {
    getQuestionSetHierarchy(contentId: string, config?: CsContentServiceConfig): Observable<CsContentGetQuestionSetHierarchyResponse>;
    getQuestionSetRead(contentId: string, params?: any, config?: CsContentServiceConfig): Observable<CsContentGetQuestionSetResponse>;
    getQuestionList(contentIds: string[], config?: CsContentServiceConfig): Observable<CsContentGetQuestionListResponse>;
    getContentList(request: CsContentSearchRequest, params?: { [key: string]: string }, config?: CsContentServiceConfig): Observable<CsContentGetContentListResponse>;
}
