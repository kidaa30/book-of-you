var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/bookTest', function (req, res) {
    var bookData;

    bookData = {
        name: 'Genesis',
        chapters: [
            {
                num: 1,
                verses: [
                    'In The Beginning',
                    'There Was Light',
                    'get rid of verse num var and calc num based on coll in addVerse fn',
                ]
            },
            {
                num: 2,
                verses: [
                    'In The End',
                    'There Was Black!!'
                ]

            }
        ]
    };
    res.json(bookData);
});

module.exports = router;