var SomeModel = require('../model/model')

//Insertion enregistrement ELEVE (POST)
module.exports.Postliste = function (request, res) {

    var nom = request.body.nom;
    var prenom = request.body.prenom;
    
    SomeModel.find()
        .then(notes => {
            if (notes.length == 0) { //Verifie si le tableau est vide
                id = 0;
                console.log("déjà posté id =", id);

            } else { //Verifie si le tableau n'est pas vide
                id = parseInt(notes[notes.length - 1].id) + 1;
            }


            const insertion = new SomeModel({ _id: id, nom: nom, prenom: prenom});
            (!nom || !prenom) ? console.log('données insuffisantes') : insertion.save()
                .then((notes) => {
                    
                            res.send(notes);
                        
                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "Il y a d'erreur d'insertion" })
                })
        })
}

//Affichage enregistrements ELEVES (GET)
exports.GetListe = (req, res) => {

    SomeModel.find()
                    .then(users =>{
                        res.send(users)
                    })
                    .catch(err =>{
                        res.status(500).send({
                            message: err.message || "something wrong while retrieving profils."
                        })
                    })
}

//Modification enregistrement (PUT)
exports.Putliste = (req, res) => {
    if (!req.body.id) { //Verifie si le ID est VIDE
        return res.status(400).send({
            message: "id introuvable"
        });
    }

    if(!req.body.nom || !req.body.prenom){ //Verifie si les champs sont vides
        console.log("champs vides");
    } else {
    SomeModel.findByIdAndUpdate(req.body.id, {
        nom: req.body.nom,
        prenom: req.body.prenom
    }, { new: true })
        .then(note => {
            if (!note) { //Verifie si le ID existe
                return res.status(404).send({
                    message: "id " + req.body.id + "introuvable"
                });
            }
            SomeModel.find()
                .then(notes => {
                    res.send(notes);
                })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message:  "id " + req.body.id + "introuvable"
                });
            }
            return res.status(500).send({
                message:  " impossible de modifier le id " + req.body.id
            });
        });
    }
};


//Suppression enregistrement (DELETE)
exports.Deleteliste = (req, res) => {
    SomeModel.findByIdAndRemove(req.body.id)
        .then(note => {
            console.log("NOTE", note);

            if (!note) {
                return res.status(404).send({
                    message:  "id " + req.body.id + "introuvable"
                });
            }
            SomeModel.find()
                .then(notes => {
                    res.send(notes);
                })
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message:  "id " + req.body.id + "introuvable"
                });
            }
            return res.status(500).send({
                message: " impossible de supprimer le id " + req.body.id
            });
        });
};
