'use strict';

const _ = require('lodash');
const pluralize = require('pluralize');

const toPlural = str => pluralize(_.camelCase(str));
const toSingular = str => _.camelCase(pluralize.singular(str));

const toInputName = str => `${_.upperFirst(toSingular(str))}Input`;

const toSubscriptionAction = (action, model) => `${action}${_.upperFirst(toSingular(model))}`;

module.exports = {
  toSingular,
  toPlural,
  toInputName,
  toSubscriptionAction,
};
