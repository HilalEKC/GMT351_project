const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const treeInput = mongoose.model('InputTree');

router.get('/', (req, res) => {
    res.render("tree/addEdit", {
        viewTitle: "Input Tree"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == ''){
        insertRecord(req, res);
    }     
    else{
        updateRecord(req, res);
    }
        
});

function insertRecord(req, res) {
    var tree = new treeInput();
    tree.name = req.body.name;
    tree.latitude = req.body.latitude;
    tree.longitude = req.body.longitude;
    tree.height = req.body.height;

    tree.save((err) => {
        if (!err)
            res.redirect('tree/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("tree/addEdit", {
                    viewTitle: "Input Tree",
                    tree: req.body
                });
            }
        }
    });
}
function updateRecord(req, res) {
    treeInput.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { 
            res.redirect('tree/list'); 
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("tree/addEdit", {
                    viewTitle: 'Update Input',
                    tree: req.body
                });
            }
        }
    });
}
router.get('/list', (req, res) => {
    treeInput.find((err, docs) => {
        res.render("tree/list", {
            list: docs
        });
    });
});
router.get('/api/data', (req, res) => {
    treeInput.find((err, docs) => {
        res.send(docs);
    });
});

router.get('/api/sortLatitude', (req, res) => {
 
    treeInput.find({}).sort({latitude: 1}).exec(function(err, docs){
        res.render("tree/list", {
            list: docs
        });
    })
})
router.get('/api/sortName', (req, res) => {
 
    treeInput.find({}).sort({name: 1}).exec(function(err, docs){
        res.render("tree/list", {
            list: docs
        });
    })
});
router.get('/api/sortLongitude', (req, res) => {
 
    treeInput.find({}).sort({longitude: 1}).exec(function(err, docs){
        res.render("tree/list", {
            list: docs
        });
    })
});
router.get('/api/sortHeight', (req, res) => {
 
    treeInput.find({}).sort({height: 1}).exec(function(err, docs){
        res.render("tree/list", {
            list: docs
        });
    })
});
router.get('/api/filterHeightLt50', (req, res) => {
 
    treeInput.find({'height' : {$lt: 50}}).exec(function(err, docs){
        res.render("tree/list", {
            list: docs
        });
    })
});
router.get('/api/filterHeightGt50', (req, res) => {
 
    treeInput.find({'height' : {$gt: 50}}).exec(function(err, docs){
        res.render("tree/list", {
            list: docs
        });
    })
});
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'latitude':
                body['latitudeError'] = err.errors[field].message;
                break;
            case 'longitude':
                body['longitudeError'] = err.errors[field].message;
                break;
            case 'height':
                body['heightError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/:id', (req, res) => {
    treeInput.findById(req.params.id, (err, doc) => {
            res.render("tree/addEdit", {
                viewTitle: "Update Input",
                tree: doc
            });
    });
});
router.get('/delete/:id', (req, res) => {
    treeInput.findByIdAndRemove(req.params.id, (err, doc) => {
        res.redirect('/tree/list'); 
    });
});
module.exports = router;