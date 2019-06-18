var controller =require( '../controler/controler.js')


module.exports.route=function (app){

    app.route('/profil')
        .post(controller.Postliste)
        .get(controller.GetListe)
        .put(controller.Putliste)
        .delete(controller.Deleteliste)

    // app.route('/prof')
    //     .post(controller.PostProf)
    //     .get(controller.GetProf)
}
