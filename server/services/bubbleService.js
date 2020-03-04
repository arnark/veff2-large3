const resource = require('../resources/products.json');
const common = require('./common');

const bubbleService = () => {
    return {
        getAbout: (predicate) => common.fetchWithPredicate(predicate, resource, 'about'),
        getProducts: (predicate) => common.fetchWithPredicate(predicate, resource, 'products'),
        getBundles: (predicate) => common.fetchWithPredicate(predicate, resource, 'bundles')
    };
};

module.exports = bubbleService();
