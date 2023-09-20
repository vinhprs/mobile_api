import { Observable } from 'rxjs';

export interface HelloReply {
  message?: string;
}

export interface ISampleInterface {
  sayHello(request?: any): Observable<HelloReply>;
}
