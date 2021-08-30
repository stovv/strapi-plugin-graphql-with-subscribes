# Strapi GraphQL with Subscriptions

Thanks [@fakedob](https://github.com/fakedo) and [@flaki](https://github.com/flaki) !

> Based on [this pull request](https://github.com/strapi/strapi/pull/6789/) by [@fakedob](https://github.com/fakedob),
> ported to Strapi 3.6.8.

This plugin will add GraphQL functionality to your app.
By default it will provide you with most of the CRUD methods exposed in the Strapi REST API.

To learn more about GraphQL in Strapi [visit documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html)

# Subscribers configuration

Create `/extensions/graphql/config/schema.graphql.js` file
And add Subscribers as example
```js
module.exports = {
    subscription: `
    onProjectUpdated(id: ID!): Post
  `,
    resolver: {
        Subscription: {
            onPostUpdated: {
                //Resolver is used to get access policy. Failing to provide one, will end with 401 Forbiden
                resolverOf: 'application::post.post.findOne',
                subscribe: async (obj, options, { context } ) => {
                    return await strapi.graphql.pubsub.asyncIterator(options.id);
                }
            }
        }
    }
};
```

Also add update code in AfterUpdate lifecycle
/api/post/models/post.js
```js

'use strict';

module.exports = {
    lifecycles: {
        afterUpdate: (result, params, data) =>{
            strapi.graphql.pubsub.publish(result.id, {
                onProjectUpdated: result
            });
        }
    }
};
```
