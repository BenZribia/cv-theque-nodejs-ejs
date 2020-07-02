const express = require('express');
const CV = require('../models/CV');
const mongoose = require('mongoose');
const multer = require('multer');
var moment = require('moment');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-' +file.originalname );
    }
});

const fileFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.pdf$/)) {
        return cb(new Error('You can upload only pdf files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFileFilter});

const cvRouter = express.Router();

cvRouter.use(express.json());

cvRouter.route('/condidature')
.get((req, res, next)=>{
    postes = [ "Stage", "Stage PFE"];
    res.render('condidature.ejs', { postes : postes});
})
.post(upload.single('pdfFile'), (req, res, next)=>{
    cv = new CV(req.body)
    cv.cv = req.file.path;
    cv.save()
        .then((cv)=>{
            res.statusCode = 200;
            //res.setHeader('Content-Type', 'application/json');
            // We send back an array that contain the file description and the other fields
           // res.send([req.file, req.body]);
            res.redirect('/condidats');

        })
        .catch((err)=>{ console.log(err);
        });
});

cvRouter.route('/condidats')
.get((req, res, next)=>{
    CV.find({})
        .then((cvs)=>{
            res.statusCode = 200;
           // res.setHeader('Content-Type', 'application/json');
            //res.json(cvs);
            res.render('cvs', { moment: moment, cvs: cvs});
        })
        .catch((err)=>{ console.log(err);
        });
});

cvRouter.route('/condidats/:id')
.get((req, res, next)=>{
    CV.findById(req.params.id)
        .then((cv)=>{
            res.statusCode = 200;
            //res.setHeader('Content-Type', 'application/json');
            //res.json(cv);
            res.render('profilDetail', { cv: cv} );
        })
        .catch((err)=>{ console.log(err);
        });
});

cvRouter.route('/download/:id')
.get((req, res, next)=>{
    CV.findById(req.params.id)
        .then((cv)=>{
           

            var filePath = path.join(__dirname, '../public/files/'+cv.cv.replace(/^.*[\\\/]/, '')) ; 
            var fileName = cv.cv.replace(/^.*[\\\/]/, '');
            console.log(cv.cv);
            console.log(filePath);
            console.log(fileName);

            res.download(filePath, fileName);

            

            // res.redirect('/condidats');
        })
        .catch((err)=>{ console.log(err);
        });
    
});

module.exports = cvRouter;