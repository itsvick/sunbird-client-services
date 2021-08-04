import { inject, injectable } from 'inversify';
import { CsContentGetQuestionSetResponse, CsContentService, CsContentGetQuestionListResponse, CsContentGetQuestionSetHierarchyResponse } from '../interface';
import { CsContentServiceConfig } from '../../..';
import { Observable } from 'rxjs';
import { InjectionTokens } from '../../../injection-tokens';
import { CsHttpRequestType, CsHttpService, CsRequest } from '../../../core/http-service/interface';
import { map } from 'rxjs/operators';
import { CsContentSearchRequest, CsContentGetContentListResponse } from '../interface/cs-content-service';

@injectable()
export class ContentServiceImpl implements CsContentService {
    constructor(
        @inject(InjectionTokens.core.HTTP_SERVICE) private httpService: CsHttpService,
        @inject(InjectionTokens.services.content.CONTENT_SERVICE_HIERARCHY_API_PATH) private hierarchyApiPath: string,
        @inject(InjectionTokens.services.content.CONTENT_SERVICE_QUESTION_LIST_API_PATH) private questionListApiPath: string,
        @inject(InjectionTokens.services.content.CONTENT_SERVICE_QUESTION_LIST_API_PATH) private apiPath: string,
    ) {
    }

    getQuestionSetHierarchy(contentId: string, config?: CsContentServiceConfig): Observable<CsContentGetQuestionSetHierarchyResponse> {
        const apiRequest: CsRequest = new CsRequest.Builder()
            .withType(CsHttpRequestType.GET)
            .withPath((config ? config.hierarchyApiPath : this.hierarchyApiPath) + '/hierarchy/' + contentId)
            .withBearerToken(true)
            .withUserToken(true)
            .build();
        return this.httpService.fetch<{ result: { questionSet: { children: { identifier: string }[] } } }>(apiRequest).pipe(
            map((response) => {
                return response.body.result;
            })
        );
    }

    getQuestionSetRead(contentId: string, params?: any, config?: CsContentServiceConfig): Observable<CsContentGetQuestionSetResponse> {
        const apiRequest: CsRequest = new CsRequest.Builder()
            .withType(CsHttpRequestType.GET)
            .withPath((config ? config.hierarchyApiPath : this.hierarchyApiPath) + '/read/' + contentId)
            .withParameters(params || {})
            .withBearerToken(true)
            .withUserToken(true)
            .build();
        return this.httpService.fetch<{ result: { questionSet: { children: { identifier: string }[] } } }>(apiRequest).pipe(
            map((response) => {
                return response.body.result;
            })
        );
    }

    getQuestionList(contentIds: string[], config?: CsContentServiceConfig): Observable<CsContentGetQuestionListResponse> {
        const apiRequest: CsRequest = new CsRequest.Builder()
            .withType(CsHttpRequestType.POST)
            .withPath(`${config ? config.questionListApiPath : this.questionListApiPath}/list`)
            .withBearerToken(true)
            .withUserToken(true)
            .withBody({
                request: {
                    search: {
                        identifier: contentIds
                    },
                }
            })
            .build();
        return this.httpService.fetch<{ result: {} }>(apiRequest).pipe(
            map((r) => r.body.result)
        );
    }

    getContentList(request: CsContentSearchRequest, params = {}, config?: CsContentServiceConfig):
        Observable<CsContentGetContentListResponse> {
        const apiRequest: CsRequest = new CsRequest.Builder()
            .withType(CsHttpRequestType.POST)
            .withPath((config ? config.apiPath : this.apiPath) + '/v1/search')
            .withParameters(params)
            .withBody({ request })
            .build();
        return this.httpService.fetch<{ result: {} }>(apiRequest).pipe(
            map((r) => r.body.result)
        );
    }
}
