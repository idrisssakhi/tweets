import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const api = {
    consumerKey: 'EqM50UQ7FRSIyLlK6PfcaoLSP',
    consumerSecret: 'QCZjv1b6IbT3muYxctYudu4zLgP7zdLnBg304oPcWer1lRndOA',
    accessToken: '1037403707317600258-LqqLI6FqOQo9a6vBm46xVEJ7wzRici',
    tokenSecret: 'l5A8dioo02sSbPItM09uzKJzxCO7BcJd2e3mrxTyxyeZO'
  };

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!/^(http|https):/i.test(request.url)) {
            // add credentials headers
            let allHeaders = request.headers
                .append('header', api.consumerKey)
                .append('hey', api.consumerSecret)
                .append('no', api.accessToken)
                .append('yes', api.tokenSecret);
            request = request.clone({ url: environment.serverUrl + request.url, headers: allHeaders });
        }
        return next.handle(request);
    }
}
