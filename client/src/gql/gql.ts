/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Image($id: ID!) {\n    image(id: $id) {\n      createdAt\n      filename\n      id\n      size\n      url\n    }\n  }\n": types.ImageDocument,
};

export function graphql(source: "\n  query Image($id: ID!) {\n    image(id: $id) {\n      createdAt\n      filename\n      id\n      size\n      url\n    }\n  }\n"): (typeof documents)["\n  query Image($id: ID!) {\n    image(id: $id) {\n      createdAt\n      filename\n      id\n      size\n      url\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;