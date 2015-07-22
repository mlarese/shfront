var ServiceMixin =function(resource) {
    this.mixin = {
        items:null,
        loadAll: function () {
            return resource.query().$promise.then(
                function (response) {
                    items = response.toJSON();
                    return items;
                },
                function (error) {
                    items = null;
                    return error;
                }
            )
        },
        load: function (id) {
            return this.loadAll().then(
                function (response) {
                    var item = response[id];
                    return item;
                },
                function (error) {
                    return error;
                }
            )
        },
        assignToScope: function (id, scope, attribute, subId) {
            return this.loadAll()
                .then(function (storage) {
                    var elem = storage[id];
                    if (subId && elem[subId])
                        elem = elem[subId]

                    if (attribute == '.')
                        angular.extend(scope, elem);
                    else
                        scope[attribute] = elem;


                    return elem;
                })
        }
    }
};
