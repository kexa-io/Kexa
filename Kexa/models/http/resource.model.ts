import { HttpRequest } from "./request.models";

export interface HttpResources {
    request: Array<HttpRequest>|null;
}