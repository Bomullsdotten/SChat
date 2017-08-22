/**
 * Created by Snicx on 19/08/2017.
 */
var name_list = [
    'Charlie Brown',
    'Patty',
    'Snoopy']/*,
    'Violet Gray',
    'Schroeder',
    'Lucy van Pelt',
    'Linus van Pelt',
    'Pig-Pen',
    'Sally Brown',
    'Frieda',
    'Woodstock',
    'Peppermint Patty',
    'Franklin',
    'Marcie',
    'Rerun van Pelt',
    'Eudora',
    'Peggy Jean',
    'Winnie-the-Pooh',
    'Christopher Robin',
    'Piglet',
    'Eeyore',
    'Kanga',
    'Roo',
    'Rabbit',
    'Tigger',
    'Owl',
    'Gaston Lagaffe',
    'Léon Prunelle',
    'Yves Lebrac',
    'Joseph Boulier',
    'Mademoiselle Jeanne',
    'Monsieur Dupuis',
    'Jules-de-chez-Smith-en-face',
    'Bertrand Labévue',
    'Manu',
    'Aimé De Mesmaeker',
    'Joseph Longtarin',
    'Ducran & Lapoigne',
    'Freddy-les-doigts-de-fée',
    'Asterix',
    'Obelix',
    'Dogmatix',
    'Getafix',
    'Vitalstatistix',
    'Impedimenta',
    'Cacofonix',
    'Geriatrix',
    'Mrs. Geriatrix',
    'Unhygienix',
    'Bacteria',
    'Fulliautomatix',
    'Mrs. Fulliautomatix',
    'Julius Caesar',
    'Barbe Rouge',
    'Triple Patte',
    'Baba',
    'Erix',
    'Queen Cleopatra ',
    'Brutus',
    'Pompey',
    'Lucky Luke',
    'Jolly Jumper',
    'Jack Dalton',
    'William Dalton',
    'Averelle Dalton',
    'Joe Dalton',
    'Rantanplan',
    'Billy the Kid',
    'Calamity Jane',
    'Jesse James',
    'Buffalo Bill',
    'Ma Dalton'
]*/


module.exports = {
    generateUsername: function (users) {
        // We wat to make fewer guesses if on unique usernames if the userbase is large
        var new_username = find_carton_name(users);
        if (uniqueName(new_username, users) && new_username){
            return new_username;
        }
        return uniquely_modified_name(new_username, users)
    }


};

function uniquely_modified_name(username, existing_users) {
    var name = username;
    while (true){
        name += Math.floor(Math.random()*9);
        if (uniqueName(name, existing_users)){
            return name;
        }
    }
}

function find_carton_name(users) {
    var guess_counter = name_list.length - Object.keys(users).length;
    var name = name_list[Math.floor(Math.random() * name_list.length)];
    while (guess_counter > 0){
        if (uniqueName(name, users)){
            return name;
        }
        else {
            name = name_list[Math.floor(Math.random() * name_list.length)];
        }
        guess_counter --;
    }
    return false
}

function uniqueName(name, list_of_names){
    // if index undefined
    if (list_of_names[name] == null){
        return true;
    }
    else {
        return false;
    }
}