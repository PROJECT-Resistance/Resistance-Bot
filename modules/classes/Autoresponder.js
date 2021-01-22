class Autoresponder {
    constructor (name, triggers, response) {
        this.name = name;
        this.triggers = triggers;
        this.response = response;
    }

    print () {
        console.log(`This is the "${this.name}" auto-responder. It is triggered by these words: "${this.triggers.join(', ')}". It replies with "${this.response}"`);
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
