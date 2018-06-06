let Mock = require('mockjs');

var Random = Mock.Random;

module.exports = function () {
    var data = Mock.mock({
        user: {
            'name': Random.cname(),
            'intro': Random.word(20)
        },
        'list|20': [{
            'id|+1': 1,
            'email': '@EMAIL'
        }]
    })
    return data;
};