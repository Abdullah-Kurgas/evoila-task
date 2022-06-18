import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ALL_NODES } from '../shared/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  executeAllNodes() {
    return this.apollo.query({query: ALL_NODES });
  }
}
