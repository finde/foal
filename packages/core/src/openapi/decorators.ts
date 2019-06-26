// 3p
import 'reflect-metadata';

// FoalTS
import {
  IApiCallback, IApiExample, IApiExternalDocumentation, IApiHeader,
  IApiInfo, IApiLink, IApiOperation, IApiParameter, IApiReference,
  IApiRequestBody, IApiResponse, IApiSchema, IApiSecurityRequirement,
  IApiSecurityScheme, IApiServer, IApiTag
} from './interfaces';

function AddMetadataItem<T>(metadataKey: string, item: T) {
  return (target: any, propertyKey?: string) => {
    // Note that propertyKey can be undefined as it's an optional parameter in getMetadata.
    const items: T[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey as string) || [];
    items.unshift(item);
    Reflect.defineMetadata(metadataKey, items, target, propertyKey as string);
  };
}

function AddMetadataProperty(metadataKey: string, key: string, property: any) {
  return (target: any, propertyKey?: string) => {
    // Note that propertyKey can be undefined as it's an optional parameter in getMetadata.
    const o = Reflect.getOwnMetadata(metadataKey, target, propertyKey as string) || {};
    o[key] = property;
    Reflect.defineMetadata(metadataKey, o, target, propertyKey as string);
  };
}

export function ApiInfo(info: IApiInfo | ((controller: any) => IApiInfo)) {
  return Reflect.metadata('api:document:info', info);
}

export function ApiOperationDescription(description: string | ((controller: any) => string)) {
  return Reflect.metadata('api:operation:description', description);
}

export function ApiOperationId(operationId: string | ((controller: any) => string)) {
  return Reflect.metadata('api:operation:operationId', operationId);
}

export function ApiOperationSummary(summary: string | ((controller: any) => string)) {
  return Reflect.metadata('api:operation:summary', summary);
}

export function ApiServer(server: IApiServer | ((controller: any) => IApiServer)) {
  return AddMetadataItem('api:documentOrOperation:servers', server);
}

export function ApiSecurityRequirement(
  securityRequirement: IApiSecurityRequirement | ((controller: any) => IApiSecurityRequirement)
) {
  return AddMetadataItem('api:documentOrOperation:security', securityRequirement);
}

export function ApiDefineTag(tag: IApiTag | ((controller: any) => IApiTag)) {
  return AddMetadataItem('api:document:tags', tag);
}

export function ApiExternalDoc(
  externalDoc: IApiExternalDocumentation | ((controller: any) => IApiExternalDocumentation)
) {
  return Reflect.metadata('api:documentOrOperation:externalDocs', externalDoc);
}

export function ApiOperation(operation: IApiOperation | ((controller: any) => IApiOperation)) {
  return Reflect.metadata('api:operation', operation);
}

export function ApiUseTag(tag: string | ((controller: any) => string)) {
  return AddMetadataItem('api:operation:tags', tag);
}

export function ApiParameter(
  parameter: IApiParameter | IApiReference | ((controller: any) => IApiParameter | IApiReference)
) {
  return AddMetadataItem('api:operation:parameters', parameter);
}

export function ApiRequestBody(
  requestBody: IApiRequestBody | IApiReference | ((controller: any) => IApiRequestBody | IApiReference)
) {
  return Reflect.metadata('api:operation:requestBody', requestBody);
}

export function ApiResponse(
  key: 'default'|'1XX'|'2XX'|'3XX'|'4XX'|'5XX'|number,
  response: IApiResponse | IApiReference | ((controller: any) => IApiResponse | IApiReference)
) {
  return AddMetadataProperty('api:operation:responses', key.toString(), response);
}

export function ApiCallback(
  key: string, callback: IApiCallback | IApiReference | ((controller: any) => IApiCallback | IApiReference)
) {
  return AddMetadataProperty('api:operation:callbacks', key, callback);
}

export function ApiDeprecated(deprecated: boolean | ((controller: any) => boolean) = true) {
  return Reflect.metadata('api:operation:deprecated', deprecated);
}

export function ApiDefineSchema(
  key: string, schema: IApiSchema | IApiReference | ((controller: any) => IApiSchema | IApiReference)
) {
  return AddMetadataProperty('api:components:schemas', key, schema);
}

export function ApiDefineResponse(
  key: string, response: IApiResponse | IApiReference | ((controller: any) => IApiResponse | IApiReference)
) {
  return AddMetadataProperty('api:components:responses', key, response);
}

export function ApiDefineParameter(
  key: string, parameter: IApiParameter | IApiReference | ((controller: any) => IApiParameter | IApiReference)
) {
  return AddMetadataProperty('api:components:parameters', key, parameter);
}

export function ApiDefineExample(
  key: string, example: IApiExample | IApiReference | ((controller: any) => IApiExample | IApiReference)
) {
  return AddMetadataProperty('api:components:examples', key, example);
}

export function ApiDefineRequestBody(
  key: string, requestBody: IApiRequestBody | IApiReference | ((controller: any) => IApiRequestBody | IApiReference)
) {
  return AddMetadataProperty('api:components:requestBodies', key, requestBody);
}

export function ApiDefineHeader(
  key: string, header: IApiHeader | IApiReference | ((controller: any) => IApiHeader | IApiReference)
) {
  return AddMetadataProperty('api:components:headers', key, header);
}

export function ApiDefineSecurityScheme(
  key: string,
  securityScheme: IApiSecurityScheme | IApiReference | ((controller: any) => IApiSecurityScheme | IApiReference)
) {
  return AddMetadataProperty('api:components:securitySchemes', key, securityScheme);
}

export function ApiDefineLink(
  key: string, link: IApiLink | IApiReference | ((controller: any) => IApiLink | IApiReference)
) {
  return AddMetadataProperty('api:components:links', key, link);
}

export function ApiDefineCallback(
  key: string, callback: IApiCallback | IApiReference | ((controller: any) => IApiCallback | IApiReference)
) {
  return AddMetadataProperty('api:components:callbacks', key, callback);
}
