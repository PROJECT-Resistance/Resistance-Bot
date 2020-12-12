class Autoresponder {

    constructor (name, triggers, response) {
        this.name = name;
        this.triggers = triggers;
        this.response = response;
    }

    print () {
        console.log(this.triggers);
        console.log(this.response);
    }

    getTriggers () {
        return this.triggers;
    }

    getResponse () {
        return this.response;
    }

    getName () {
        return this.name;
    }
}
module.exports = Autoresponder;